export const throttle = (fn: Function, deley = 300) => {
    let flag = true
    return (...args: any[]) => {
        if(flag) {
            flag = false
            fn.apply(this, args)
            setTimeout(()=>{
                flag = true
            }, deley)
        }
    }
}

export const debounce = (fn: Function, delay = 300) => {
    let timer:any = null;
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)        
    }
}