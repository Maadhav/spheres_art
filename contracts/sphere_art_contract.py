# Sphere.ART contract audited by APRIORIT
import smartpy as sp

FA2 = sp.io.import_template("FA2.py")


class Token(FA2.FA2):
    pass


class SphereArt(sp.Contract):
    def __init__(self, token, admin):
        self.init(
            token=token,
            admin=admin,
            pending_admin_address=admin,
            spheres=sp.big_map(tkey=sp.TNat, tvalue=sp.TRecord(token_id=sp.TNat, owner=sp.TAddress, creator=sp.TAddress,
                               price=sp.TNat, isNew=sp.TBool, token_url=sp.TString, timestamp=sp.TTimestamp, title=sp.TString)),
            token_id=0,
            reward_collection=7
        )

    @sp.entry_point
    def mint(self, params):
        sp.verify((params.sphere.price > 0))
        c = sp.contract(
            sp.TRecord(
                address=sp.TAddress,
                amount=sp.TNat,
                token_id=sp.TNat,
                metadata=sp.TMap(sp.TString, sp.TBytes)
            ),
            self.data.token,
            entry_point="mint").open_some()
        metadata = self.make_metadata(params.sphere.price, params.sphere.token_url)

        sp.transfer(
            sp.record(
                address=sp.self_address,
                amount=1,
                token_id=self.data.token_id,
                metadata=metadata,
            ),
            sp.mutez(0),
            c)

        self.data.spheres[self.data.token_id] = sp.record(token_id=self.data.token_id, owner=sp.sender, creator=sp.sender, price=params.sphere.price,
                                                          token_url=params.sphere.token_url, isNew=True, timestamp=sp.now, title=params.sphere.title)
        self.data.token_id += 1

    @sp.entry_point
    def collect_management_rewards(self, params):
        sp.verify(sp.sender == self.data.admin)
        sp.send(params.address, params.amount)

    @sp.entry_point
    def collect(self, params):
        sp.verify(((sp.amount == sp.utils.nat_to_mutez(self.data.spheres[params.token_id].price)) & (self.data.spheres[params.token_id].price != 0) & (
            self.data.spheres[params.token_id].isNew == True) & (self.data.spheres[params.token_id].creator != sp.sender)))
        self.data.spheres[params.token_id].isNew = False
        self.data.spheres[params.token_id].owner = sp.sender

        total = 100
        creator_split = sp.as_nat(total - self.data.reward_collection)

        # sending rewards
        sp.send(self.data.spheres[params.token_id].creator,
                sp.split_tokens(sp.amount, creator_split, 100))

        self.fa2_transfer(self.data.token, sp.self_address,
                          sp.sender, params.token_id, 1)

    @sp.entry_point
    def update(self, params):
        sphere = self.data.spheres[params.token_id]
        sp.verify((sp.sender == sphere.creator) & (sphere.isNew))
        sphere.price = params.price

    @sp.entry_point
    def delete(self, params):
        sphere = self.data.spheres[params.token_id]
        sp.verify((sp.sender == self.data.admin) & (sphere.isNew))
        del self.data.spheres[params.token_id]

    @sp.entry_point
    def set_pending_admin(self, address):
        sp.verify(sp.sender == self.data.admin, "NotAdmin")
        self.data.pending_admin_address = address

    @sp.entry_point
    def update_admin(self):
        sp.verify(sp.sender == self.data.pending_admin_address, "INVALID_ACCESS")
        self.data.admin = self.data.pending_admin_address

    @sp.entry_point
    def update_reward_collection(self, params):
        sp.verify(sp.sender == self.data.admin)
        self.data.reward_collection = params

    def make_metadata(self, price, token_url):
        return sp.map(
            l={
                "price": sp.pack(price),
                "token_url": sp.pack(token_url),
            }
        )
    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        transfer_record = sp.TRecord(amount=sp.TNat, to_=sp.TAddress,
                                     token_id=sp.TNat).layout(("to_", ("token_id", "amount")))
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress,
                                            txs=sp.TList(transfer_record))), fa2, entry_point='transfer').open_some()
        sp.transfer(sp.list([sp.record(from_=from_, txs=sp.list(
            [sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)


@sp.add_test(name="Non Fungible Token")
def test():
    scenario = sp.test_scenario()

    admin = sp.test_account("admin")
    mark = sp.test_account("user1")
    elon = sp.test_account("user2")

    def new_sphere(price, token_url, title):
        return sp.record(price=sp.nat(price), token_url=token_url, title=title)

    token_contract = Token(FA2.FA2_config(non_fungible=True), admin=admin.address, metadata=sp.big_map({"": sp.utils.bytes_of_string(
        "tezos-storage:content"), "content": sp.utils.bytes_of_string("""{"name" : "Sphere.ART FA2 Contract", "author": "CodeDecoders", "status": "In Development"}""")}))

    scenario += token_contract

    scenario.h1("MarketPlace")
    marketplace = SphereArt(token_contract.address, admin.address)
    scenario += marketplace
    scenario.h1("Mint")
    scenario += token_contract.set_administrator(
        marketplace.address).run(sender=admin)
    scenario += marketplace.mint(sphere=new_sphere(10000,
                                 "test2.com", 'Testing')).run(sender=admin)
    scenario += marketplace.mint(sphere=new_sphere(30000,
                                 "test.com", 'Testing2')).run(sender=mark)
    scenario.h1("Collect")
    scenario += marketplace.collect(sp.record(token_id=0)
                                    ).run(sender=elon, amount=sp.mutez(10000))
    scenario.h1("Update")
    scenario += marketplace.update(token_id=1, price=40000).run(sender=mark)
    scenario.h1("Delete")
    scenario += marketplace.delete(token_id=1).run(sender=admin)

    scenario += marketplace.collect_management_rewards(
        sp.record(amount=sp.mutez(700), address=admin.address)).run(sender=admin)

    scenario += marketplace.update_reward_collection(96).run(sender=admin)

    scenario += marketplace.set_pending_admin(mark.address).run(sender=admin)

    scenario += marketplace.update_admin().run(mark.address)
