// import IOSBridge from './IOSAdapter' ;
// import androidBridge from './androidAdapter'
import NativeBridge from './nativeBridge'

const OS_TYPE = {
  iOS: "iOS",
  Android: "Android",
  Windows: "Windows",
  Linux: "Linux",
  Unknown: "Unknown"
};

function getOsType(){
  if (/(iphone|ipad|ipod)/i.test(navigator.userAgent)) {
    return OS_TYPE.iOS;
  } else if (/(android)/i.test(navigator.userAgent)) {
    return OS_TYPE.Android;
  } else if (/linux/i.test(navigator.userAgent)) {
    return OS_TYPE.Linux;
  } else if (/windows/i.test(navigator.userAgent)) {
    return OS_TYPE.Windows;
  } else {
    return OS_TYPE.Unknown;
  }
}


function isPenglaiApp() {

  let isApp = /penglaiapp/i.test(navigator.userAgent);
  return /penglaiapp/i.test(navigator.userAgent);
}

class Native{
  constructor(){
    this._bridge = null;
    this._nativeCallHandlers = {};
    if(isPenglaiApp()){
      this.getBridge();
    }else{
      console.log('bushi app')
    }
  }
  getBridge(){
    let osType = getOsType();
    switch (osType) {
      case OS_TYPE.iOS:
        let IOSBridge = require("./IOSAdapter").default;
        this._bridge = new NativeBridge(IOSBridge);
        break;
      case OS_TYPE.Android:
        let androidBridge = require("./androidAdapter").default;
        this._bridge = new NativeBridge(androidBridge);
        break;
      // default: return false;
    }
    // this._impls.onCall(this._nativeCallHandlers);
  }

  async invoiceInfo (){
    return await this._bridge.invoice();
  }

  async getTokenK(){

    return await this._bridge.getToken();
  }

  async goBackFun(){
    return await this._bridge.goBack();
  }
  async openLogin(){
    return await this._bridge.openLogin();
  }
  async clickTime(startTime,endTime,adress){
    return await this._bridge.clickTime(startTime,endTime,adress);
  }
  async clickAdress(startTime,endTime,adress){
    return await this._bridge.clickAdress(startTime,endTime,adress);
  }
  async submitFromWeb(packageArray){
    return await this._bridge.submitFromWeb(packageArray);
  }
  isPenglaiApp () {
    return isPenglaiApp();
  }

  getOsType () {
    return getOsType();
  }

  async JsBridge(params) {
    return await this._bridge.webViewClick(params);
  }
}

export default new Native();
