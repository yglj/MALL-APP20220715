

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
export const scrollDoSome = (cb, limit_time=300) => {
    document.addEventListener("scroll",
        throttleFunc(() => {
            let { scrollHeight: sh, scrollTop: st, clientHeight: ch } = document.documentElement
            cb(sh, st, ch)
        }, limit_time)
    )
}