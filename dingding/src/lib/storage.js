import journey from 'weex-dingtalk-journey';

// 配置Api 接口

// 引入 弹窗组件 


function setItem(name, parms, success) {
    const { requireModule } = journey;
    var storage = requireModule('storage');
    storage.setItem(name, parms );
};

function getItem(storage_key, success) {
    const { requireModule } = journey;
    var storage = requireModule('storage');

    storage.getItem(storage_key, event => {
        //console.log('get value:', event)
        //this.state = 'value: ' + event.data
        success(event.data);
    });
};


export default {
    setItem: function(name,parms, success) {
        setItem(name, parms, success);
    },
    getItem: function(storage_key, success) {
        getItem(storage_key, success);
    }
}