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
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
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
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                url: baseUrl + url,
                body: toParams(params)
            },
            function(res) {
                console.log("fetch request ", JSON.stringify(res.ok))
                if (res.ok) {
                    // 解密

                    success(res.data);
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


// 返回在vue模板中的调用接口
export default {
    get: function(url, params, success, failure) {
        return apiStream('GET', url, params, success, failure)
    },
    post: function(url, params, success, failure) {
        return apiStream('POST', url, params, success, failure)
    }
}