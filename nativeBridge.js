class NativeBridge {
  constructor(bridgeAdapter) {
    try {
      this.bridgeAdapter = bridgeAdapter;
    }catch (e){
      alert(e)
    }
  }

  async webViewClick(params) {
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler(params.action, JSON.stringify(params), (invoiceResponse) => {
          resolve(invoiceResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async Jscall(params,callback) {
      let bridgeAdapter = await this.bridgeAdapter;
        try {
            bridgeAdapter.registerHandler(params.action,(data,responseCallback) => {
                responseCallback(callback(data))
            });
        } catch (e) {
          alert(e)
        }
  }
}

export default NativeBridge;
