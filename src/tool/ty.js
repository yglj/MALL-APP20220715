import { unref } from 'vue'

function debounceFunc(fn, wait) {
    let timer = null;
    return function () {
        let args = arguments;

        timer && clearTimeout(timer);

        timer = setTimeout(() => {
            //@ts-ignore
            fn.apply(this, args)
        }, wait);
    }
}

// 节流
export function throttleFunc(fn, wait, a) {
    let time = 0, timer= null;
    return function () {
        let now = Date.now();
        let args = arguments;
        if (now - time > wait) {
            //@ts-ignore
            fn.call(this, args, a);
            time = now;
        } else {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                //@ts-ignore
                fn.call(this, args, a);
                time = now;
            }, wait);
        }
    }
}

// 滚动
export const scrollDoSome = (cb, limit_time = 300, node = document) => {
    if(!node) return false
    unref(node).addEventListener("scroll",
        throttleFunc(() => {
            let { scrollHeight: sh, scrollTop: st, clientHeight: ch } = unref(node).documentElement || unref(node)
            cb(sh, st, ch)
        }, limit_time)
    )
}

//  防抖
export const debounce = (cb, time) => {
    let timer = null
    return (v2v, ...args) => {
        clearTimeout(timer)
        timer = setTimeout(
            () => {
                cb(v2v, args)
            }, time
        )
    }
}