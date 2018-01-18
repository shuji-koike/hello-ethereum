# hello-ethereum
Hello, Ethereum!

# circleci

```
# https://circleci.com/docs/2.0/local-jobs/#installing-the-cli-locally
curl -o /usr/local/bin/circleci https://circle-downloads.s3.amazonaws.com/releases/build_agent_wrapper/circleci
chmod +x /usr/local/bin/circleci

circleci update

circleci config validate -c .circleci/config.yml

circleci build
```

# testrpc

```
npx testrpc --port 7545 --deterministic
```

# ganache

* https://github.com/trufflesuite/ganache
* http://truffleframework.com/ganache/

```
cd ganache
yarn install
yarn start
```
