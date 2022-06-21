import { ABI } from "./abi.js"

class Nft {
  constructor(Web3) {
    this.ALCHEMY_KEY = "poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.api_alchemy_url = "https://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.ws_alchemy_url = "wss://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.Web3 = Web3
    this.api_web3 = this.Web3.createAlchemyWeb3(this.api_alchemy_url)
    this.ws_web =  this.Web3.createAlchemyWeb3(this.ws_alchemy_url)    
  }

  async read_contract(mycontract, method_name) {
    return await mycontract.methods[method_name]().call({ from: "0x67d9417c9c3c250f61a83c7e8658dac487b56b09", gasPrice: "0" })
  }

  group_by_block(nft_events) {
    // TODO
  }

  group_by_collection(nft_events) {
    // TODO
  }

  async fetch_nft_mint_transactions(from_block, to_block) {
    return await this.api_web3.alchemy.getAssetTransfers({
      fromBlock: from_block,
      fromAddress: "0x0000000000000000000000000000000000000000",

      toBlock: to_block,
      // toAddress: "0xf7996b18ef0fd8838b577021a54e49f276fd5789",

      // contractAddresses: ["0x67d9417c9c3c250f61a83c7e8658dac487b56b09"],

      excludeZeroValue:false,
      category: ["erc721","erc1155"]
    })
  }

  async formate_nft(nft_event) {
    const tx = await this.api_web3.eth.getTransaction(nft_event.hash)
    const receipt = await this.api_web3.alchemy.getTransactionReceipts({ blockNumber: nft_event.blockNum })
    const mycontract = new this.api_web3.eth.Contract(ABI, nft_event.rawContract.address)
    const metadata = await this.api_web3.alchemy.getNftMetadata({ contractAddress: nft_event.rawContract.address, tokenId: nft_event.tokenId })

    return {
      // 集合相关的信息
      symbol: event.asset,
      name: await this.read_contract(mycontract, "name"),
      // totalSupply: await read_contract(mycontract, "totalSupply"),
      // owner: await read_contract(mycontract, "owner"),
      // maxTotalSupply: await read_contract(mycontract, "maxTotalSupply"),
      contract_address: event.rawContract.address,

      // 单个NFT 相关的信息
      minter: event.to,
      token_id: event.tokenId,
      tx_id: event.hash,
      category: event.category,
      value: tx.value,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
      maxFeePerGas: tx.maxFeePerGas,
      input_data: tx.input,
      hash: event.hash,
      gas: tx.gas,
      gas_price: tx.gasPrice,
      metadata: metadata,

      // 区块相关的信息
      blockNumber: event.blockNum
      // blocktime: ???
    }
    console.log(nft)
  }
}