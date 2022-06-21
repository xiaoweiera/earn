import { ABI } from "./abi.js"
import { ethers } from 'ethers'

class Nft {
  constructor(Web3) {
    this.ALCHEMY_KEY = "poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.api_alchemy_url = "https://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.ws_alchemy_url = "wss://eth-mainnet.alchemyapi.io/v2/poUoilj7yipTDB122OglCDp6_K3ddU7o"
    this.Web3 = Web3
    this.api_web3 = this.Web3.createAlchemyWeb3(this.api_alchemy_url)
    this.ws_web =  this.Web3.createAlchemyWeb3(this.ws_alchemy_url)
  }

  ayync get_lastest_mint_tx() {
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
    rpc_list_with_speed = rpc_list.map(async url => {
      return this._testSpeed(url)
    })

    // 确保第一条是最优记录
    return rpc_list_with_speed.sort((a, b) => {
      return a.speed - b.speed
    })
  }

  async _testSpeed(url){
    let reg = new RegExp(/^(https):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*|(http):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*|(wss):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,)
    if (!reg.test(url)) {
      return { url: url, speed: "PRC Format Error!"}
    }

    let startTime = new Date().getTime()
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
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

  /*
    mint_prams = {

    }
  */

  async mint_nft(mint_params) {
    // Constructing the raw transaction
    // To 'Speed Up' a transaction like Metamask just send a new transaction with the same nonce but with higher gas
    // const rawTx = {
    //     "from"                  :   web3.utils.toHex( sendingAddress ),
    //     "to"                    :   web3.utils.toHex( receivingAddress ),
    //     "gasLimit"              :   web3.utils.toHex( 210000 ),
    //     "maxFeePerGas"          :   web3.utils.toHex( web3.utils.toWei( '1.5' , 'gwei' ) ),
    //     "maxPriorityFeePerGas"  :   web3.utils.toHex( web3.utils.toWei( '1.5' , 'gwei' ) ),
    //     "value"                 :   web3.utils.toHex( web3.utils.toWei( '0.1' , 'ether' ) ),
    //     "data"                  :   web3.utils.toHex( 'This is my example' ),
    //     "nonce"                 :   web3.utils.toHex( await web3.eth.getTransactionCount( sendingAddress , 'pending' ) ),
    //     "chainId"               :   "0x04",
    //     "accessList"            :   [],
    //     "type"                  :   "0x02"
    // };
    // baseFeePerGas (base fee)
    // maxPriorityFeePerGas (priority fee) –
    // maxFeePerGas (max fee)

    // // Creating a new transaction
    //  const tx = FeeMarketEIP1559Transaction.fromTxData( rawTx , { chain } );
    //
    //  // Signing the transaction
    //  const signedTransaction = tx.sign( privateKey );
    //
    //  // Generating transaction Hash
    //  const txHash = await web3.utils.sha3( '0x' + signedTransaction.serialize().toString( 'hex' ) );
    //  console.log( "Tx Hash: " + txHash );
    //
    //  // Sending transaction
    //  await web3.eth.sendSignedTransaction( '0x' + signedTransaction.serialize().toString( 'hex' ) )
    //  .on( 'error' , function( error ) {
    //      console.error( error )
    //  } );
    //
    //  console.log( 'After Transaction' );
    //  sendingAddressBalance = await web3.eth.getBalance( sendingAddress );
    //  console.log( "Address: " + sendingAddress );
    //  console.log( "Balance: " + sendingAddressBalance );
    //  console.log( Array( 75 ).join( "=" ) );
    //  console.log( " " );

  }
  // 根据 tx hash 或者 合约地址去识别 mint 相关参数
  async auto_recognition_mint(hash) {
    let mint_params =  {
      input_data: '',
      gas_price: '',
      gas_limit: '',
      mint_num: 4,
      value: 3
    }

    switch parse_hash_type(hash) {
      case 'NFT_CONTRACT_HASH' {

      }
      case "NFT_MINT_TX_HASH" {

      } final {
        return alert("输入的 hash 既不是 NFT Min Hash 也不是 NFT 合约地址 Hash, 请重新输入 !")
      }
    }
    return mint_params;
  }

  async parse_hash_type(hash) {

  }

  formate_nft(nft_event) {
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
