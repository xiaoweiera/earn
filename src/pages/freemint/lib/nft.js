import { ABI } from "./nft_contract_abi.js"
import { ethers } from 'ethers'

export class Nft {
  constructor(Web3) {
    this.ALCHEMY_KEY = "poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.api_alchemy_url = "https://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.ws_alchemy_url = "wss://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.Web3 = Web3
    this.api_web3 = this.Web3.createAlchemyWeb3(this.api_alchemy_url)
    this.ws_web =  this.Web3.createAlchemyWeb3(this.ws_alchemy_url)
  }


  async get_lastest_mint_tx() {
    // thi
  }

  /*
    // const rpc_list = [
    //   "https://mainnet-eth.compound.finance/",
    //   "https://mainnet-eth.compound.finance/",
    //   "https://geth.mytokenpocket.vip",
    //   "https://cloudflare-eth.com",
    //   "https://api.mycryptoapi.com/eth",
    //   "https://rpc.ankr.com/eth",
    //   "https://mainnet-eth.compound.finance/"
    // ]
    return [{url: "", speed: 344 }, {url: "", speed: 344 }]
  */
  async test_rpc_list(rpc_list) {
    let rpc_list_with_speed =rpc_list.map(url => {
      return  this._testSpeed(url)
    })
    return Promise.all(rpc_list_with_speed).then(values => {
      // 确保第一条是最优记录
      return values.sort((a, b) => {
        return a.speed - b.speed
      })
    });
  }

  async _testSpeed(url){
    let reg = new RegExp(/^(https):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*|(http):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*|(wss):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,)
    if (!reg.test(url)) {
      return { url: url, speed: "PRC Format Error!"}
    }

    let startTime = new Date().getTime()
    const provider = new ethers.providers.JsonRpcProvider(url)
    const network = await provider.send('eth_chainId', []).catch(e => {
        return { url: url, speed: 'Failed !'}
    })
    if (network) {
        return { url: url, speed: new Date().getTime() - startTime}
    } else {
        return { url: url, speed: 'Failed !'}
    }
  }

  async read_contract(mycontract, method_name) {
    return await mycontract.methods[method_name]().call({ from: "0x67d9417c9c3c250f61a83c7e8658dac487b56b09", gasPrice: "0" })
  }



  /*
    mint_prams = {
      from: '',
      to: ''.
      gasLimit: '',
      value: '',
      data: '',

      baseFeePerGas: 10
      maxPriorityFeePerGas: 20,
      maxFeePerGas: 30,

    }
  */

  async mint_nft(mint_params, privateKeys, logs){
    logs.push({ state: 'true', msg: '参数解析中...'})

    privateKeys.map(async privateKey => {
      let address = await this.api_web3.eth.accounts.privateKeyToAccount(privateKey).address
      let balance = await this.getBalance(address)
      let values = await Number(web3.utils.fromWei(balance ? balance : '')).toFixed(3)

      let txParams = {
          data: inputStr,
          value: web3.utils.toWei(tx.value.toString(), 'ether'),
          maxFeePerGas: web3.utils.toHex(tx.maxFeePerGas * 10 ** 9), //wei
          maxPriorityFeePerGas: web3.utils.toHex(tx.maxPriorityFeePerGas * 10 ** 9), //wei
      }
      console.log('txParams: ', txParams)

      let mySignTransaction = await this.api_web3.eth.accounts.signTransaction(txParams, privateKey)
      console.log('mySignTransaction: ', mySignTransaction)

      let sendSignedTransaction = this.api_web3.eth.sendSignedTransaction(mySignTransaction, function (err, address) {
          console.log('err, address: ', err, address)
          if (!err) console.log(address) // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
      })
      console.log('sendSignedTransaction: ', sendSignedTransaction)
      logs.push({ state: 'true', msg: sendSignedTransaction})
    })
  }


  //获取余额
  async getBalance(address) {
    return await web3.eth.getBalance(address, 'latest')
  }

  // 根据 tx hash 或者 合约地址去识别 mint 相关参数
  async auto_parse_mint(hash) {
    let mint_params =  {
      input_data: '0xefef39a10000000000000000000000000000000000000000000000000000000000000032',
      mint_number: 1,
      value: 0
    }
    //
    // switch parse_hash_type(hash) {
    //   case 'NFT_CONTRACT_HASH' {
    //
    //   }
    //   case "NFT_MINT_TX_HASH" {
    //
    //   } final {
    //     return alert("输入的 hash 既不是 NFT Min Hash 也不是 NFT 合约地址 Hash, 请重新输入 !")
    //   }
    // }
    return mint_params;
  }

  async _parse_hash_type(hash) {
    return 'NFT_MINT_TX_HASH';
  }

  group_by_block(nft_events) {
    // TODO
  }

  group_by_collection(nft_events) {
    // TODO
  }

  async get_lastest_mint_tx() {
    const lastBlock = this.api_web3.eth.getBlockNumber()
    const txs = await his.fetch_nft_mint_transactions(lastBlock - 10000000, lastBlock)
    return txs.map(tx => {
      return formate_nft(tx)
    })
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
