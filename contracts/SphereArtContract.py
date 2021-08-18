import smartpy as sp

class SphereArt(sp.Contract):
    def __init__(self):
        self.init(spheres = {}, counter = 0)

    @sp.entry_point
    def mint(self, params):
        sp.set_type(params.sphere.tokenUrl, sp.TString)
        sp.verify(sp.mutez(0) <= params.sphere.price)
        self.data.counter+=1
        self.data.spheres[self.data.counter] = sp.record(sphereId = self.data.counter, owner = sp.sender, price = params.sphere.price, tokenUrl = params.sphere.tokenUrl, isNew = True)

   
    @sp.entry_point
    def buy(self, params):
        sphere = self.data.spheres[params.sphereId]
        sp.verify(sp.mutez(0) < sphere.price)
        sp.verify(sp.amount == sphere.price)
        sp.send(sphere.owner, sp.amount)
        sphere.owner = sp.sender
        sp.if sphere.isNew:
            sphere.isNew = False

    @sp.entry_point
    def get(self):
        self.data.spheres
    

@sp.add_test(name = "SphereArt")
def test():
    c1 = SphereArt()
    scenario  = sp.test_scenario()
    scenario.h1("Spheres Art")
    scenario += c1
    creator = sp.test_account("Creator")
    def newSphere(price, tokenUrl):
        return sp.record(price = sp.mutez(price), tokenUrl = tokenUrl)
    c1.mint(sphere = newSphere(10, "test.com")).run(sender = creator)
    c1.mint(sphere = newSphere(10, "test.com")).run(sender = creator)

sp.add_compilation_target("sphereArt", SphereArt())