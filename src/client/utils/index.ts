export const getParams = (key: string) => {
    const search = window.location.href.split('?')[1]
    let obj:any = {}
    const keyValuesArr = search ? search.split('&') : [];
    keyValuesArr.forEach(item => {
        const arr = item.split('=')
        obj[arr[0]] = decodeURIComponent(arr[1])
    })
    return obj[key]
}

export const callNative = (namespace: string, method: string) => {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[namespace]) {
        window.webkit.messageHandlers[namespace].postMessage(method);
    } else if ((window as { [key: string]: any })[namespace]) {
        (window as { [key: string]: any })[namespace].postMessage(method);
    } else {
        console.error(`调用的原生方法不存在：${namespace} ${method}`)
    }
}