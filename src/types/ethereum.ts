interface Request {
  method: string;
  params: Array<object>;
}

class Ethereum {
  selectedAddress = ""; // 钱包地址
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async request(req: Request): Promise<Array<object>> {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(name: string, callBack: () => void) {
    // todo
  }

  async enable(): Promise<void> {
    // todo
  }
}

export { Ethereum };
