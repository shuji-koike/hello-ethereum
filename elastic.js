global.VERBOSE = false;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({host: 'localhost:9200'});
const log = e => {
  console.info(e);
  return e;
}
const indexBlock = async blockNumber => {
  if (VERBOSE || !(blockNumber % 100))
    console.info(`blockNumber: ${blockNumber}`);
  const block = await web3.eth.getBlock(blockNumber);
  if (VERBOSE || blockNumber == 1)
    console.debug(block);
  if (block.number != blockNumber) {
    throw(new Error("blockNumber miss match"));
  }
  await client.index({
    index: "blocks",
    type: "meta",
    id: block.number,
    body: {
      difficulty: block.difficulty,
      extraData: block.extraData,
      gasLimit: block.gasLimit,
      gasUsed: block.gasUsed,
      hash: block.hash,
      logsBloom: null,
      miner: block.miner,
      mixHash: block.mixHash,
      nonce: block.nonce,
      number: block.number,
      parentHash: block.parentHash,
      receiptsRoot: block.receiptsRoot,
      sha3Uncles: block.sha3Uncles,
      size: block.size,
      stateRoot: block.stateRoot,
      timestamp: block.timestamp,
      timestamp_ms: block.timestamp * 1000,
      totalDifficulty: block.totalDifficulty,
      transactions: [],
      transactionsRoot: block.transactionsRoot,
      uncles: []
    }
  });
}
const tick = async (blockNumber, limit = 10000) => {
  if (blockNumber > limit - 1) return;
  await indexBlock(blockNumber)
    .then(e => setTimeout(tick.bind(this, blockNumber + 1, limit), 1))
    .catch(e => setTimeout(tick.bind(this, blockNumber + 0, limit), 1));
}

// http://127.0.0.1:9200/_cat/indices?v
const init = async (indicesDelete) => {
  if (indicesDelete) {
    await client.indices.delete({index: "blocks"});
  }
  if (!await client.indices.exists({index: "blocks"})) {
    await client.indices.create({
      index: "blocks"
    });
  }
  if (true) {
    await client.indices.putMapping({
      index: "blocks",
      type: "meta",
      body: {
        "meta": {
          properties: {
            "difficulty": {type: "long"},
            "timestamp_ms": {type: "date"},
            "totalDifficulty": {type: "long"}
          }
        }
      }
    });
  }
}

init(indicesDelete = false).then(tick.bind(this, 200000, 200000 + 100000));
