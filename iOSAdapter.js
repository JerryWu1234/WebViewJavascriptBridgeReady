function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
}

let getBridge = new Promise((resolve, reject) => {
    let initSuccess = false;
    setupWebViewJavascriptBridge((bridge) => {
        initSuccess = true;
        resolve(bridge);
    });

    setTimeout(() => {
        if (initSuccess) {
            return;
        }
        reject(new Error("No native support yet!"));
    }, 1000);
});

export default getBridge;
