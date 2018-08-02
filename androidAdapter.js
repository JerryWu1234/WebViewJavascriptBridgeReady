let getBridge = new Promise((resolve, reject) => {
  if (window.WebViewJavascriptBridge) {
    resolve(window.WebViewJavascriptBridge);
    return;
}

  document.addEventListener("WebViewJavascriptBridgeReady", () => {
    // window.WebViewJavascriptBridge.init(() => {
    //
    // });
    if(window.onWebViewJavascriptBridgeReady) window.onWebViewJavascriptBridgeReady(window.__bridge = WebViewJavascriptBridge);
    resolve(window.WebViewJavascriptBridge);
  }, false);

  setTimeout(() => {
    if (!window.WebViewJavascriptBridge) {
      reject(new Error("No native support yet!"));
    }
  }, 1000);
});
// document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
//   if(window.onWebViewJavascriptBridgeReady) window.onWebViewJavascriptBridgeReady(window.__bridge = WebViewJavascriptBridge);
//   callback(WebViewJavascriptBridge)
// }, false)


export default getBridge;
