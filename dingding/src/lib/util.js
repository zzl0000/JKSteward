import dingtalk from 'weex-dingtalk';
import journey from 'weex-dingtalk-journey';

const {requireModule, querystring, url, env} = journey;
import {APPHOST} from './env.js';


let uid = 1;

export function jsApiOAuth() {
    let Config = {
        method: 'post',
        uri: APPHOST + '/Appinterface/authoJsApi',
        body: ''
    };
    let jsApiList = ['device.nfc.nfcRead'];
    return new Promise(function (resolve, reject) {
        request(Config, function (error, res) {

            if (!error) {
                const data = res.data.data;
                if (res.data.errcode === '1') {
                    const oauth = {
                        agentId: data.agentId || '',
                        corpId: data.corpId || '',
                        timeStamp: data.timeStamp || '',
                        nonceStr: data.nonceStr || '',
                        signature: data.signature || '',
                        jsApiList: jsApiList || []
                    };
                    dingtalk.config(oauth);
                    resolve();
                }
            } else {
                reject(res);
            }
        });
    });
}


export function request(config, cb, progressCb) {
    const modal = requireModule('modal');
    const stream = requireModule('stream');
    let {method, uri, body, type, headers} = config;
    if (!uri || typeof uri !== 'string') {
        return;
    }
    let requestConf = {
        method,
        type: type || 'json',
        headers
    };
    if (method === 'GET') {
        let cur = false;
        const len = uri.length - 1;
        const middle = uri.lastIndexOf('?');
        if (middle > -1 && middle === len) {
            uri = uri.substring(0, middle);
        }
        if (middle === -1) {
            uri = uri + '?';
        }
        if (typeof body === 'object' && body !== null) {
            uri = uri + querystring.stringify(body);
        }
        if (typeof body === 'string') {
            uri = uri + body;
        }
        requestConf.url = uri;
    } else {
        requestConf.url = uri;
        requestConf.body = JSON.stringify(body);
    }
    stream.fetch(requestConf, function (res) {
        let u = false;
        let data = {};
        if (res.ok) {
            u = true;
        }
        if (typeof cb === 'function') {
            cb(u ? null : {}, res);
        }
    }, progressCb);
}


// device.nfc.nfcRead


export function setNfc(cb) {
    dingtalk.ready(function () {
        dingtalk.apis.device.nfc.nfcRead({
            onSuccess: function (data) {
                cb(data)
            },
            onFail: function (err) {
                cb(err)
            }
        });
    });
}


export function getNetwork(cb) {
    dingtalk.ready(function () {
        dingtalk.apis.device.connection.getNetworkType({
            onSuccess: function (data) {
                cb(data)
            },
            onFail: function (err) {
                cb(err)
            }
        });
    });
}


export function setRight(config, cb) {
    const {control} = config;
    dingtalk.ready(function () {
        dingtalk.apis.biz.navigation.setRight(config);
        if (control) {
            dingtalk.on('navRightButton', cb);
        }
    });
}

export function setLeft(cb) {

    document.addEventListener('backbutton', function (e) {
        // 在这里处理你的业务逻辑
        e.preventDefault();
        cb()
    });

}


let isModal = false;

export function toast(msg) {
    const modal = requireModule('modal');
    modal.toast({
        message: msg,
        duration: 2
    });

}

export function alert(msg) {
    const modal = requireModule('modal');
    modal.alert({
        message: msg,
        duration: 2
    });

}


export function confirm(msg, cb) {
    const modal = requireModule('modal');
    modal.confirm({
        message: msg,
        okTitle: '确定',
        cancelTitle: '取消'
    }, function (result) {
        if (typeof cb === 'function') {
            cb(result);
        }
    })
}


export function setTitle(title) {

    dingtalk.ready(function () {

        dingtalk.apis.biz.navigation.setTitle({
            title: title,
        })
    });
}

export function pointDistinct(arrs) {

    var result = [];
    var obj = {};
    for (var i = 0; i < arrs.length; i++) {

        if (!obj[arrs[i].pointId]) {
            result.push(arrs[i]);
            obj[arrs[i].pointId] = true;
        }
    }

    return result;
}



