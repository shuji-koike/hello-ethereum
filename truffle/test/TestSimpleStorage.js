contract("SimpleStorage", function(accounts) {
  var SimpleStorage = artifacts.require("./SimpleStorage.sol");

  it("should init and change value", function() {
    SimpleStorage.deployed().then(function(storage) {
      storage.get.call().then(function(value) {
        assert.equal(value, 0, "Should get zero value");
      }).then(function() {
        return storage.set(4);
      }).then(function() {
        return storage.get.call();
      }).then(function(value) {
        assert.equal(value, 4, "Should get four value after set");
      })
    });
  });
});
