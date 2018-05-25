// 配置Api 接口

import journey from 'weex-dingtalk-journey';
// 引入 弹窗组件 
const { requireModule } = journey;


// 自定义判断元素类型JS
export function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
export function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

// 工具方法
export function toParams(obj) {
    var param = ""
    for (const name in obj) {
        if (typeof obj[name] != 'function') {
            param += "&" + name + "=" + encodeURI(obj[name])
        }
    }
    return param.substring(1)
};

// 接口处理 


export function apiStream(method, url, params, success, failuer) {
    const modal = weex.requireModule('modal');
    const stream = weex.requireModule('stream');
    const baseUrl = 'http://dev-oa-api.tq-service.com';
    if (params) {
        params = filterNull(params);
    }


    /* stream */
    if (method === 'GET') {
        stream.fetch({
            method: 'GET',
            type: 'text',
            url: baseUrl + url + toParams(params)
        }, function(res) {
            if (res.ok) {
                success(res.data);
            } else {
                modal.toast({
                    message: '请求失败,请检查网络!',
                    duration: 2
                })
            }
        })

    } else if (method === 'POST') {
        stream.fetch({
                method: 'POST',
                type: 'text',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                url: baseUrl + url,
                body: toParams(params)
            },
            function(res) {
                //console.log("fetch request ", JSON.stringify(res.ok))
                if (res.ok) {
                    // 解密
                    success(JSON.parse(res.data));
                } else {
                    modal.toast({
                        message: '请求失败,请检查网络!',
                        duration: 2
                    })
                }
            },
            function(progress) {

            })

    }

}

// 弹窗定义

export function toast(msg) {
    const modal = requireModule('modal');
    modal.toast({
        message: msg,
        duration: 2
    });
}

/*时间渲染*/
export function add0(m) {
    return m < 10 ? '0' + m : m
}


// 格式化时间

export function formats() {
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) +':' + add0(s);
}



// 返回在vue模板中的调用接口
export default {
    get: function(url, params, success, failure) {
        return apiStream('GET', url, params, success, failure)
    },
    post: function(url, params, success, failure) {
        return apiStream('POST', url, params, success, failure)
    },
    toast: function(msg) {
        return toast(msg);
    },
    formats:function(rs) {
        return formats(rs);
    },
}