class NativeBridge {
  constructor(bridgeAdapter) {
    try {
      this.bridgeAdapter = bridgeAdapter;
    }catch (e){
      alert(e)
    }
  }

  async getToken() {
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("getToken", null ,(tokenResponse) => {
          resolve(tokenResponse);
        });
      } catch (e) {

        reject(e);
      }
    });

  }
  async openLogin () {
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("openLogin", null, (tokenResponse) => {
          resolve(tokenResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async clickTime (startTime,endTime,adress) {
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("clickTime", JSON.stringify({startTime,endTime,adress}),(tokenResponse) => {
          resolve(tokenResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async clickAdress (startTime,endTime,adress) {
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("clickAdress", JSON.stringify({startTime,endTime,adress}), (tokenResponse) => {
          resolve(tokenResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async invoice(){
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.registerHandler("invoice", (data,invoiceResponse) => {
          let nativeReq = JSON.parse(data);
          resolve(nativeReq);
        });
      } catch (e) {
        reject(e);
      }
    });
  }


  async goBack(){
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("goBack", null, (invoiceResponse) => {
          resolve(invoiceResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async submitFromWeb(packageArray){
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("submitFromWeb", JSON.stringify(packageArray), (invoiceResponse) => {
          resolve(invoiceResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async webViewClick(params) {
    let bridgeAdapter = await this.bridgeAdapter;
    return new Promise((resolve, reject) => {
      try {
        bridgeAdapter.callHandler("webViewClick", JSON.stringify(params), (invoiceResponse) => {
          resolve(invoiceResponse);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default NativeBridge;
