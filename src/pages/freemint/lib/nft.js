import { ABI } from "./nft_contract_abi.js"
import { ethers } from 'ethers'

export class Nft {
  constructor(Web3) {
    this.ALCHEMY_KEY = "poUoilj7yipTDB122OglCDp6_K3ddU7o"
    // this.api_alchemy_url = "https://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.api_alchemy_url = "https://eth-goerli.alchemyapi.io/v2/QbsWpdaiHPxNiBHB297Zq4d9SfSF4Mnu"

    this.ws_alchemy_url = "wss://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.Web3 = Web3
    this.api_web3 = this.Web3.createAlchemyWeb3(this.api_alchemy_url)
    this.ws_web =  this.Web3.createAlchemyWeb3(this.ws_alchemy_url)
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
    const result = await Promise.all(rpc_list_with_speed)
    console.log(result)
    // 确保第一条是最优记录
    return result.sort((a, b) => {
      return a.speed - b.speed
    })
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

  // TODO 结束 mint 状态
  // mint 个数计数，前端需要显示
  async mint_nft(mint_params, privateKeys, logs){
    logs.push({ color: 'rgb(62 79 103)', msg: '✅ 参数解析中...'})
    const _this = this;

    if (!privateKeys.length) {
      logs.push({ color: 'rgb(62 79 103)', msg: '❌ privateKey cannot be empty！'})
      return;
    }

    if (mint_params.mintAmount < 1) {
      logs.push({ color: 'rgb(62 79 103)', msg: '❌ Mint number must be greater than 1 !'})
      return;
    }

    if (!this.api_web3.utils.isAddress(mint_params.contract)) {
      logs.push({ color: 'rgb(62 79 103)', msg: '❌ NFT contracts are not properly recognized !'})
      return;
    }

    if (!mint_params.inputData) {
      logs.push({ color: 'rgb(62 79 103)', msg: '❌ InputData cannot be empty !'})
      return;
    }    

    privateKeys.map(async privateKey => {      
      let address = ''

      try {
        address = await this.api_web3.eth.accounts.privateKeyToAccount(privateKey).address
        const balance = await this.getBalance(address)

        let values = await Number(this.api_web3.utils.fromWei(balance ? balance : '')).toFixed(3)

        if (values < 0) {
          throw `❌ ${this._formate_hash(address)} balance is 0 ETH !`
        }

        const nonce = await this.api_web3.eth.getTransactionCount(address, 'latest'); // nonce starts counting from 0

        let txParams = {
            from: address,
            to: mint_params.contract,
            nonce,
            data: mint_params.inputData,
            value: this.api_web3.utils.toWei(mint_params.mintValue.toString(), 'ether'),
            maxFeePerGas: this.api_web3.utils.toHex(mint_params.maxFeePerGas * 10 ** 9), //wei
            maxPriorityFeePerGas: this.api_web3.utils.toHex(mint_params.maxPriorityFeePerGas * 10 ** 9), //wei

            // TODO 设置 gaslimt
            gasLimit: this.api_web3.utils.toHex( 53000 ),
        }
        console.log('txParams: ', txParams)
      
        // TODO 要 gas 预估一下，然后看 余额是否交手续费
        let signedTx = await this.api_web3.eth.accounts.signTransaction(txParams, privateKey)
        console.log('mySignTransaction: ', signedTx)
      
        let sendSignedTransaction = this.api_web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err) {
          if (!err) {
            logs.push({ color: "green", msg: `✅ ${_this._formate_hash(address)} mint ${_this._formate_hash(mint_params.contract)} Success!! TX is:  ${_this._formate_hash(signedTx.transactionHash)}`})
          } else {
            logs.push({ color: "red", msg: `❌ ${_this._formate_hash(address)} mint ${err}`})
          }
        })

      } catch(e) {
        logs.push({ color: 'red', msg: `❌ ${privateKey}: ${e.message}` })
      }
    })
  }


  //获取余额
  async getBalance(address) {
    return await this.api_web3.eth.getBalance(address, 'latest')
  }

  // 根据 tx hash 或者 合约地址去识别 mint 相关参数
  /* return {
      input_data: '0xefef39a10000000000000000000000000000000000000000000000000000000000000032',
      value: 0
    }  
  */  
  async auto_parse_mint(hash) {
    const hash_obj = this._parse_hash_type(hash)
    const error_msg = "输入的 hash 既不是 NFT Min Hash 也不是 NFT 合约地址 Hash, 请重新输入 !"

    switch(hash_obj.type) {
      case 'NFT_CONTRACT_HASH': {
        // 获取合约的最新一条 mint 记录
        const lastBlock = await this.api_web3.eth.getBlockNumber()
        // 获取 alchemy nft 的交易记录
        const last_mint_tx = await this.fetch_nft_mint_transactions(0, lastBlock, 1, [hash])
        console.log("last_mint_tx: ", last_mint_tx)

        if (last_mint_tx.transfers.length == 0) {
          alert(error_msg)
          console.log(error_msg)
          return false
          break;
        }
        // 再拉取真正的 链上 tx, 获取 input data
        const tx = await this.api_web3.eth.getTransaction(last_mint_tx.transfers[0].hash)
        console.log("the lastest tx: ", tx)

        return {
          input_data: tx.input,
          value: tx.value,
          contract_address: hash
        }          
      }
      case "NFT_MINT_TX_HASH": {
        // 再拉取真正的 链上 tx, 获取 input data
        const tx = await this.api_web3.eth.getTransaction(hash)
        console.log("get tx: ", tx)

        return {
          input_data: tx.input,
          value: tx.value,
          contract_address: tx.to
        }
      } 
      default: {
          // console.log(error_msg)        
         // alert("输入的 hash 既不是 NFT Min Hash 也不是 NFT 合约地址 Hash, 请重新输入 !")
         return false
      }
    }
  }

  _formate_hash(hash) {
    // return `<span style='color: #0096de'>${hash.slice(0, 5)}...${hash.slice(hash.length - 5, hash.length)}></span>`
    return hash
  }

  _parse_hash_type(hash = "") {
    if ([42, 66].includes(hash.length) && this.api_web3.utils.isHex(hash)) {
      return { status: true, type: hash.length == 42 ? "NFT_CONTRACT_HASH" : "NFT_MINT_TX_HASH" }
    } else {
      return { status: false }      
    }
  }


  // Feed 流
  group_by_block(nft_events) {
    // TODO

  }

  group_by_collection(nft_events) {
    // TODO
  }


  async getLasetBlock() {
    return await this.api_web3.eth.getBlockNumber();
  }

  // 拿最近 number 的区块 NFT 数据
  async get_lastest_mint_tx(blockNumbers) {
    const lastBlock = this.getLasetBlock()
    const txs = await his.fetch_nft_mint_transactions(lastBlock - blockNumbers, lastBlock)
    return txs.map(tx => {
      return formate_nft(tx)
    })
  }

  async fetch_nft_mint_transactions(from_block, to_block, maxCount = 1000, contract = null) {
    return await this.api_web3.alchemy.getAssetTransfers({
      fromBlock: from_block,
      fromAddress: "0x0000000000000000000000000000000000000000",

      toBlock: to_block,
      // toAddress: "0xf7996b18ef0fd8838b577021a54e49f276fd5789",

      contractAddresses: contract,
      excludeZeroValue:false,
      category: ["erc721","erc1155"],
      maxCount
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
