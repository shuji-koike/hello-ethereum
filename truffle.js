module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  // this is a workaround to make `truffle test --network test` to connect to the network started by it self.
  // @ref https://github.com/trufflesuite/truffle/issues/643
  test: {}
};
