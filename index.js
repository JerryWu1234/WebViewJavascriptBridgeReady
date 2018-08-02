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



class Native{
  constructor(){
    this._bridge = null;
    // this._nativeCallHandlers = {};
    this.getBridge();
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

  async JsBridge(params) {
    return await this._bridge.webViewClick(params);
  }
  async Jscall(params) {
      return await this._bridge.Jscall(params);
  }
}

export default new Native();
