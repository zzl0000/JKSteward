import journey from 'weex-dingtalk-journey';

// 配置Api 接口

// 引入 弹窗组件 


function setItem(name, parms, success) {
    const { requireModule } = journey;
    var storage = requireModule('storage');
    storage.setItem(name, parms);
};

function getItem(storage_key) {
    const { requireModule } = journey;
    let res;
    var storage = requireModule('storage');
    
    storage.getItem(storage_key, event => {

        if (event.data == 'undefined') {
            res = '';
        } else {
            res = event.data;
        }

    });
    return res;
};


export default {
    setItem: function(name, parms, success) {
       return setItem(name, parms, success);
    },
    getItem: function(storage_key) {
       return getItem(storage_key);
    }
}