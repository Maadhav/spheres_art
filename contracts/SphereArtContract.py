import smartpy as sp

FA2 = sp.io.import_template("FA2.py")

class NFT(FA2.FA2):

    @sp.entry_point
    def mint(self, params):
        if self.config.non_fungible:
            sp.verify(
                ~ self.token_id_set.contains(self.data.all_tokens, params.token_id),
                message = "NFT-asset: cannot mint twice same token"
            )
        user = self.ledger_key.make(params.creator, params.token_id)
        self.token_id_set.add(self.data.all_tokens, params.token_id)
        sp.if self.data.ledger.contains(user):
            self.data.ledger[user].balance += 1
        sp.else:
            self.data.ledger[user] = FA2.Ledger_value.make(1)
        sp.if self.data.token_metadata.contains(params.token_id):
            if self.config.store_total_supply:
                self.data.total_supply[params.token_id] = 1
        sp.else:
            self.data.token_metadata[params.token_id] = sp.record(
                token_id    = params.token_id,
                token_info  = params.metadata
            )
            if self.config.store_total_supply:
                self.data.total_supply[params.token_id] = 1

    @sp.entry_point
    def buy(self, params):
        current_from = params.from_
        if self.config.single_asset:
            sp.verify(params.token_id == 0, message = "single-asset: token-id <> 0")
        sp.verify(
            self.data.token_metadata.contains(params.token_id),
            message = self.error_message.token_undefined()
        )
        # If amount is 0 we do nothing now:
        from_user = self.ledger_key.make(current_from, params.token_id)
        sp.verify(
            (self.data.ledger[from_user].balance >= 1),
            message = self.error_message.insufficient_balance())
        to_user = self.ledger_key.make(params.to_, params.token_id)
        self.data.ledger[from_user].balance = sp.as_nat(
            self.data.ledger[from_user].balance - 1)
        sp.if self.data.ledger.contains(to_user):
            self.data.ledger[to_user].balance += 1
        sp.else:
                self.data.ledger[to_user] = FA2.Ledger_value.make(1)

class SphereArt(sp.Contract):
    def __init__(self, contract_address):
        self.init(spheres = {},counter = 0, contract_address = contract_address)

    @sp.entry_point
    def createItem(self, params):
        sp.set_type(params.sphere.tokenUrl, sp.TString)
        sp.set_type(params.sphere.price, sp.TNat)
        sp.set_type(params.sphere.timestamp, sp.TTimestamp)
        sp.verify(0 <= params.sphere.price)
        sp.trace(params.sphere)
        token_contract = sp.contract(sp.TRecord(creator = sp.TAddress, metadata = sp.TMap(sp.TString, sp.TBytes),token_id = sp.TNat ), self.data.contract_address, entry_point = "mint").open_some()
        sp.transfer(sp.record(creator = sp.sender, token_id = self.data.counter, metadata = FA2.FA2_token_metadata.make_metadata(
        decimals = 0,
        name = 'Sphere.ART Token',
        symbol = 'SPHERE'
        )), sp.mutez(0), token_contract)


        self.data.spheres[self.data.counter] = sp.record(token_id = self.data.counter, owner = sp.sender, creator = sp.sender, price = sp.utils.nat_to_mutez(params.sphere.price), tokenUrl = params.sphere.tokenUrl, isNew = True, timestamp = params.sphere.timestamp)
        self.data.counter+=1
   
    @sp.entry_point
    def createSale(self, params):
        sphere = self.data.spheres[params.token_id]
        sp.verify(sp.amount == sphere.price)
        sp.send(sphere.owner, sp.amount)
        sphere.owner = sp.sender
        token_contract = sp.contract(sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, token_id = sp.TNat), self.data.contract_address, entry_point = "buy").open_some()
        sp.transfer(sp.record(from_ = sphere.creator, to_ = sp.sender, token_id = sp.nat(0)), sp.mutez(0), token_contract)
        sp.if sphere.isNew:
            sphere.isNew = False

@sp.add_test(name = "a")
def test():
    admin = sp.address("tz1bm9dFuBnSzTzgZKuHjJsFfrPfdkVgj1PW")
    mark = sp.test_account("Mark")
    elon = sp.test_account("Elon")
    scenario  = sp.test_scenario()
    scenario.h1("Spheres Art")
    nft = NFT(FA2.FA2_config(non_fungible = True), admin = admin, metadata = sp.big_map({"": sp.utils.bytes_of_string("tezos-storage:content"),"content": sp.utils.bytes_of_string("""{"name" : "Sphere.ART FA2 Contract", "author": "CodeDecoders", "status": "In Development"}""")}))
    scenario += nft
    c1 = SphereArt(nft.address)
    scenario += c1  

    def newSphere(price, tokenUrl):
        return sp.record(price = sp.nat(price), tokenUrl = tokenUrl,  timestamp = sp.timestamp_from_utc_now())
    c1.createItem(sphere = newSphere(1000, "test.com")).run(sender = mark)

    c1.createSale(token_id = 0).run(sender = elon, amount = sp.mutez(1000))
# sp.add_compilation_target("sphereArt", SphereArt())