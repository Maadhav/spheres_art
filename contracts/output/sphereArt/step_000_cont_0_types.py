import smartpy as sp

tstorage = sp.TRecord(counter = sp.TNat, spheres = sp.TMap(sp.TNat, sp.TRecord(creator = sp.TAddress, isNew = sp.TBool, owner = sp.TAddress, price = sp.TMutez, timestamp = sp.TTimestamp, tokenUrl = sp.TString, token_id = sp.TNat).layout((("creator", ("isNew", "owner")), (("price", "timestamp"), ("tokenUrl", "token_id")))))).layout(("counter", "spheres"))
tparameter = sp.TVariant(createItem = sp.TRecord(address = sp.TAddress, creator = sp.TAddress, sphere = sp.TRecord(price = sp.TNat, timestamp = sp.TTimestamp, tokenUrl = sp.TString).layout(("price", ("timestamp", "tokenUrl")))).layout(("address", ("creator", "sphere"))), createSale = sp.TRecord(address = sp.TAddress, token_id = sp.TNat).layout(("address", "token_id"))).layout(("createItem", "createSale"))
tglobals = { }
tviews = { }
