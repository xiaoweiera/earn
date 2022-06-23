import { ABI } from "./nft_contract_abi.js"
import { ethers } from 'ethers'
import safeGet from "@fengqiaogang/safe-get";
import { uniq,values,sumBy, groupBy, forEach } from 'lodash'

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

  async auto_mint(mint_params, privateKeys, logs) {
    if(!mint_params.start_running){
      mint_params.start_running = true
    }else{
      mint_params.start_running = false
      return
    }

    logs.push({ color: 'rgb(62 79 103)', msg: '✅ 参数解析中...'})

    const _this = this;

    if (!privateKeys.length) {
      logs.push({color: 'rgb(62 79 103)',state:'fail', msg: '❌ privateKey cannot be empty！'})
      return;
    }

    if (mint_params.baseInfo.mintTotal < 1) {
      logs.push({color: 'rgb(62 79 103)',state:'fail', msg: '❌ MintTotal number must be greater than 1 !'})
      return;
    }

    if (mint_params.baseInfo.singleContractMintAmount < 1) {
      logs.push({color: 'rgb(62 79 103)',state:'fail', msg: '❌ Single NFT Contract Mint number must be greater than 1 !'})
      return;
    }


    let lastest_block = await this.getLasetBlock()
    let from_block = lastest_block

    while (mint_params.start_running) {
      let lastest_block = await this.getLasetBlock()

      if (lastest_block == from_block - 1) {
        logs.push({color: 'rgb(62 79 103)',state:'success', msg: `✅ 暂无新块产生，等待3s 后继续检测`})
        await this._sleep(3000)
      } else {
        logs.push({color: 'rgb(62 79 103)',state:'success', msg: `✅ 本次检测最新区块区间：${from_block} ～ ${lastest_block}, 开始解析`})

        let nft_origin_events = await this.fetch_nft_mint_transactions(from_block, lastest_block)
        let collections = await this.format_collect(nft_origin_events.transfers)
        console.log(collections)

        logs.push({
          color: 'rgb(62 79 103)',
          state:'success',
          msg: `✅ 一共发现 ${Object.values(collections).length} 条记录，涉及 ${Object.keys(collections).length} 个 NFT 合约`
        })

        forEach(collections, (nfts, contract) => {
          if(!nfts || !contract) return
          // 关键词的屏蔽
          let shieldWord = mint_params.shieldWord
          if (shieldWord) {
            shieldWord = shieldWord.split(',')
            let includes = false
            shieldWord.map(key => {
              if (nfts[0].metadata.title.includes(key)) {
                includes = true
              }
            })

            if (includes) {
              logs.push({ color: 'rgb(62 79 103)',state:'noShow', msg: `❌ ${contract}(${nfts[0].metadata.title}) 已经屏蔽，因为 包含屏蔽关键词 ${shieldWord.join(', ')} `})
              return
            }
          }

          // 关键词筛选
          let keyWord = mint_params.keyWord
          if (keyWord) {
            keyWord = keyWord.split(',')
            let includes = false
            keyWord.map(key => {
              if (nfts[0].metadata.title.includes(key)) {
                includes = true
              }
            })

            if (!includes) {
              logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: `❌ ${contract}(${nfts[0].metadata.title}) 已经忽略，因为 不包含关键词 ${shieldWord.join(', ')} `})
              return
            }
          }

          // 地址筛选
          const smartMintList = mint_params.smartMintList
          if (smartMintList.length) {
            if (!smartMintList.includes(nfts[0].to)) {
              logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: `❌ ${contract}(${nfts[0].metadata.title}) 已经忽略，因为不是聪明钱在Mint! ${smartMintList.join(', ')} `})
              return
            }
          }

          // 基本信息的筛选
          //// TODO 对过滤条件的筛选，忽略
          if (mint_params.value && nfts[0]?.value > mint_params.value) {
            logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: `❌ ${contract}(${nfts[0].metadata.title}) 已经忽略，因为超过预设的单价，预设为： ${mint_params.value}，实际为: ${nfts[0].value} `})
            return            
          }

          // 挖矿总量
          if (mint_params.baseInfo.mintTotal && Object.values(mint_params.minted).length > mint_params.baseInfo.mintTotal) {
            logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: `❌ ${contract}(${nfts[0].metadata.title}) 已经忽略，因为超过预设 Mint 总量。预设为： ${mint_params.baseInfo.mintTotal}，实际为: ${Object.values(mint_params.minted).length} `})
            return            
          }

          // MINT
          if (mint_params.minted[nfts[0]?.contract_address]) {
            logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: `❌ ${contract}(${nfts[0]?.metadata.title}) 已经忽略，因为该 NFT 已经 MINT 了足够数据。单个 NFT 合约最多可Mint： ${mint_params.baseInfo.singleContractMintAmount}，实际 MINT为: ${mint_params.minted[nfts[0].contract_address].length} `})
            return
          }
          
          mint_params.minted[nfts[0]?.contract_address] = []

          privateKeys.map(async privateKey => { 
            for (let i = 0; i <= mint_params.baseInfo.singleContractMintAmount; i++) {
              const new_nft = await this._mint_nft({
                to: nfts[0].contract_address,
                inputData: nfts[0].input_data,
                value: nfts[0].value,
                maxFeePerGas: nfts[0].maxFeePerGas,
                maxPriorityFeePerGas: nfts[0].maxPriorityFeePerGas,
              }, privateKey, logs)
              if (new_nft) {
                mint_params.minted[nfts[0]?.contract_address].push(new_nft)
              }
            }
          })          
        })
      }
      logs.push({ color: 'rgb(62 79 103)',state:'success', msg: `✅ 解析完毕，进行下一次链上检测...`})
      from_block = lastest_block + 1
    }
    logs.push({ color: 'rgb(62 79 103)',state:'success', msg: `✅ 自动 Mint 程序已停止 !`})
    mint_params.start_running=false
  }

  async format_collect(events) {
    let formated_nft = await Promise.all(events.map(this.formate_nft.bind(this)))
    return groupBy(formated_nft, "contract_address")
  }

  async _sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  // 单个地址，mint 单个 NFT
  /*  
    mint_params = {
      to: String,
      inputData: String,
      value: number,
      maxFeePerGas: number,
      maxPriorityFeePerGas: number
    }
  */
  async _mint_nft(mint_params, privateKey, logs) {
    let address = ''
    const _this = this

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
          to: mint_params.to,
          // nonce: Math.floor(Date.now() / 1000000),
          nonce,
          data: mint_params.inputData,
          value: this.api_web3.utils.toWei(mint_params.value.toString(), 'ether'),
          // maxFeePerGas: this.api_web3.utils.toHex(mint_params.maxFeePerGas * 10 ** 9), //wei
          maxPriorityFeePerGas: this.api_web3.utils.toHex(mint_params.maxPriorityFeePerGas * 10 ** 9), //wei

          // TODO 设置 gaslimt
          gasLimit: this.api_web3.utils.toHex( 53000 ),
      }
      console.log('txParams: ', txParams)
    
      // TODO 要 gas 预估一下，然后看 余额是否交手续费
      let signedTx = await this.api_web3.eth.accounts.signTransaction(txParams, privateKey)
      console.log('mySignTransaction: ', signedTx)
    
      let sendSignedTransaction = this.api_web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      .on('receipt', function(receipt){
          console.log(receipt)
          logs.push({ color: "green",state:'success', msg: `✅ ${_this._formate_hash(address)} MINT ${_this._formate_hash(mint_params.to)} Success!! TX is:  ${_this._formate_hash(signedTx.transactionHash)}`})
          return receipt;  })
      .on('error', function(err){
          logs.push({ color: "red",state:'fail', msg: `❌ ${_this._formate_hash(address)} MINT ${err}`})
          return false })
    } catch(e) {
      logs.push({ color: 'red', state:'fail',msg: `❌ ${privateKey}: ${e.message}` })
      return false
    }
  }

  // TODO 结束 mint 状态
  // mint 个数计数，前端需要显示
  // 如果 mint number 是3个，还得做个重复计算
  // node 节点配置，目前没有生效
  async manual_mint_nft(mint_params, privateKeys, logs){
    if(!mint_params.start_running){
      mint_params.start_running = true
    }else{
      mint_params.start_running = false
      return
    }
    logs.push({ color: 'rgb(62 79 103)', msg: '参数解析中...'})
    const _this = this;

    if (!privateKeys.length) {
      logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: '❌ privateKey cannot be empty！'})
      return;
    }

    if (mint_params.mintAmount < 1) {
      logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: '❌ Mint number must be greater than 1 !'})
      return;
    }

    if (!this.api_web3.utils.isAddress(mint_params.contract)) {
      logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: '❌ NFT contracts are not properly recognized !'})
      return;
    }

    if (!mint_params.inputData) {
      logs.push({ color: 'rgb(62 79 103)',state:'fail', msg: '❌ InputData cannot be empty !'})
      return;
    }    

    const new_nfts = privateKeys.map(async privateKey => {      
      return this._mint_nft({
        to: mint_params.contract,
        inputData: mint_params.inputData,
        value: mint_params.mintValue,
        maxFeePerGas: mint_params.maxFeePerGas,
        maxPriorityFeePerGas: mint_params.maxPriorityFeePerGas
      }, privateKey, logs)
    })

    await Promise.all(new_nfts)
    mint_params.start_running = false
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
  group_by_block(data) {
    const result=[]
    //根据block分组
    const blockList=values(groupBy(data,'blockNumber'))
    blockList.map(item=>{
      //根据address分组分组
      const addressList=values(groupBy(item,'contract_address'))
      addressList.map(itemTwo=>{
        //插入聚合数据
        result.push({
          blockNumber:itemTwo[0].blockNumber,
          name:itemTwo[0].name?itemTwo[0].name:itemTwo[0].metadata.title,
          image:safeGet(itemTwo[0],'metadata.metadata.image'),
          sumNumber:itemTwo.length, //出现次数
          value:sumBy(itemTwo,'value'),
          gas:sumBy(itemTwo,'gas'),
        })
      })
    })
    //再根据聚合数据分组 block
    return values(groupBy(result,'blockNumber'))
  }

  group_by_collection(data) {
    const result=[]
    //根据address分组分组
    const addressList=values(groupBy(data,'contract_address'))
    console.log(addressList,'lll')
    addressList.map(itemTwo=>{
      //插入聚合数据
      result.push({
        blockNumber:itemTwo[0].blockNumber,
        contract_address:itemTwo[0].contract_address,
        image:safeGet(itemTwo[0],'metadata.metadata.image'),
        name:itemTwo[0].name?itemTwo[0].name:itemTwo[0].metadata.title,
        sumNumber:itemTwo.length,//出现次数
        owner:values(groupBy(data,'owner')).length,
        value:sumBy(itemTwo,'value'),
        gas:sumBy(itemTwo,'gas'),
      })
    })
    return result
  }


  async getLasetBlock() {
    return await this.api_web3.eth.getBlockNumber();
  }

  // 拿最近 number 的区块 NFT 数据
  async get_lastest_mint_tx(blockNumbers) {
    const lastBlock =await this.getLasetBlock()
    const txs = await this.fetch_nft_mint_transactions(lastBlock - blockNumbers, lastBlock)
    const txsWait=txs.transfers.map(tx => {
      return this.formate_nft(tx).bind(this)
    })
   return await Promise.all(txsWait)
  }


  async fetch_nft_mint_transactions(from_block, to_block, maxCount = 1000, contracts = null) {
    const params = {
      fromBlock: from_block,
      fromAddress: "0x0000000000000000000000000000000000000000",

      toBlock: to_block,
      // toAddress: "0xf7996b18ef0fd8838b577021a54e49f276fd5789",
      excludeZeroValue:false,
      category: ["erc721","erc1155"],
      maxCount
    }
    if (contracts) {
      params.contractAddresses = contracts
    }
    return await this.api_web3.alchemy.getAssetTransfers(params)
  }

  async formate_nft(nft_event) {
    try {
      const tx = await this.api_web3.eth.getTransaction(nft_event.hash)
      const receipt = await this.api_web3.alchemy.getTransactionReceipts({ blockNumber: nft_event.blockNum })
      const mycontract = new this.api_web3.eth.Contract(ABI, nft_event.rawContract.address)
      const metadata = await this.api_web3.alchemy.getNftMetadata({ contractAddress: nft_event.rawContract.address, tokenId: nft_event.tokenId })

      return {
        // 集合相关的信息
        symbol: nft_event.asset,
        name: await this.read_contract(mycontract, "name"),
        // totalSupply: await read_contract(mycontract, "totalSupply"),
        owner: nft_event.to,
        // maxTotalSupply: await read_contract(mycontract, "maxTotalSupply"),
        contract_address: nft_event.rawContract.address,

        // 单个NFT 相关的信息
        minter: nft_event.to,
        token_id: nft_event.tokenId,
        tx_id: nft_event.hash,
        category: nft_event.category,
        value: Number(tx.value),
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
        maxFeePerGas: tx.maxFeePerGas,
        hash: nft_event.hash,
        gas: tx.gas,
        gas_price: Number(tx.gasPrice),
        metadata: metadata,

        // 区块相关的信息
        blockNumber: nft_event.blockNum,
        input_data: tx.input
        // blocktime: ???
      }
      console.log(nft)
    } catch (e) {
       console.log(nft_event)
       console.log(e)
    }
  }
}
