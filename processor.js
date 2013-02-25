

module.exports = {

    process: function (data, oldData) {
        if (data.countTimes === undefined){
            data.countTimes = 2;
        } else {
            data.countTimes = oldData.countTimes + 1;
        }
        console.log(oldData.user_data);
        if (oldData.user_data !== undefined) {
            data.user_data = mergeObjects(data.user_data, oldData.user_data);
        }

        return data;
    }
}

var onlyUpdatable = ['http_referer'];
var readOnly= ['reg_time'];

function mergeObjects(a, b) {
    for (var attrName in b) {
        if (readOnly.indexOf(attrName) != 1){
            a[attrName] = b[attrName];
        } else if (onlyUpdatable.indexOf(attrName) == -1) {
            a[attrName] = a[attrName] === undefined ? b[attrName] : a[attrName] + b[attrName];
        }
    }
    return a;
}
