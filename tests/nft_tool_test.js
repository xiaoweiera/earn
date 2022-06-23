jest.useFakeTimers()
import { Nft } from "../src/pages/freemint/lib/nft";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

describe('测试 #auto parse hash', () => {
  const nft_tool = new Nft({ createAlchemyWeb3 })

  // test('如果 hash 不是 42位或者 66位长度，或者不是 0x 开头的都得报错', () => {
  //   nft_tool.auto_parse_mint("afsafsf").then(status => {
  //     expect(status).toBe(false)
  //   })
  // })

  // test('给一个 不是 NFT 的合约地址', () => {
  //   nft_tool.auto_parse_mint("0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45").then( status => {
  //     expect(status).toBe(false)
  //   })
  // })

  // test("给一个 NFT 合约地址", async () => {
  //   const t = await nft_tool.auto_parse_mint("0xcf7c0ec7c2cb5bb7392be55953ed14064ff2a4c2")
  //   console.log("test: ", t)



    // .then( async (status) => {
    //   console.log(status)
    //   expect(status).toBe({
    //     input_data: "0xa0712d680000000000000000000000000000000000000000000000000000000000000014",
    //     value: 0
    //   })
    // })
  })

  // test("给一个不是 NFT 的 hash 合约", () => {
  //   nft_tool.auto_parse_mint("0x6185c11edbf8e118a5466934a9d6c29ff92122e6f6b2168b8235dcec496db2c3").then( status => {
  //     expect(status).toBe({
  //       input_data: "0xa0712d680000000000000000000000000000000000000000000000000000000000000014",
  //       value: 0
  //     })
  //   })
  // })

  // test("给一个正确的NFT hash 合约", () => {
  //   nft_tool.auto_parse_mint("0x0c0892171efbc10460606965de341bba4053ceb8d9df29c380fc5a6005460e12").then( status => {
  //     expect(status).toBe({
  //       input_data: "0xa0712d680000000000000000000000000000000000000000000000000000000000000014",
  //       value: 0
  //     })
  //   })
  // })
// })