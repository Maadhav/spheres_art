import smartpy as sp

class Contract(sp.Contract):
  def __init__(self):
    self.init_type(sp.TRecord(counter = sp.TNat, spheres = sp.TMap(sp.TNat, sp.TRecord(creator = sp.TAddress, isNew = sp.TBool, owner = sp.TAddress, price = sp.TMutez, timestamp = sp.TTimestamp, tokenUrl = sp.TString, token_id = sp.TNat).layout((("creator", ("isNew", "owner")), (("price", "timestamp"), ("tokenUrl", "token_id")))))).layout(("counter", "spheres")))
    self.init(counter = 0,
              spheres = {})

  @sp.entry_point
  def createItem(self, params):
    sp.set_type(params.sphere.tokenUrl, sp.TString)
    sp.set_type(params.sphere.price, sp.TNat)
    sp.set_type(params.sphere.timestamp, sp.TTimestamp)
    sp.set_type(params.creator, sp.TAddress)
    sp.verify(params.sphere.price >= 0)
    sp.trace(params.sphere)
    sp.transfer(sp.record(address = params.creator, admin = sp.sender, metadata = {'tokenUrl' : sp.bytes('0x28617474722028617474722028706172616d73202822537068657265417274436f6e74726163742e7079222035392929202273706865726522202822537068657265417274436f6e74726163742e70792220363029292022746f6b656e55726c22202822537068657265417274436f6e74726163742e7079222036302929')}, token_id = self.data.counter), sp.tez(0), sp.contract(sp.TRecord(address = sp.TAddress, admin = sp.TAddress, metadata = sp.TMap(sp.TString, sp.TBytes), token_id = sp.TNat).layout((("address", "admin"), ("metadata", "token_id"))), params.address, entry_point='mint').open_some())
    self.data.spheres[self.data.counter] = sp.record(creator = params.creator, isNew = True, owner = params.creator, price = sp.mul(params.sphere.price, sp.mutez(1)), timestamp = params.sphere.timestamp, tokenUrl = params.sphere.tokenUrl, token_id = self.data.counter)
    self.data.counter += 1

  @sp.entry_point
  def createSale(self, params):
    sp.verify(sp.amount == self.data.spheres[params.token_id].price)
    sp.send(self.data.spheres[params.token_id].owner, sp.amount)
    self.data.spheres[params.token_id].owner = sp.sender
    sp.transfer(sp.record(from_ = self.data.spheres[params.token_id].creator, to_ = sp.sender, token_id = 0), sp.tez(0), sp.contract(sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, token_id = sp.TNat).layout(("from_", ("to_", "token_id"))), params.address, entry_point='buy').open_some())
    sp.if self.data.spheres[params.token_id].isNew:
      self.data.spheres[params.token_id].isNew = False