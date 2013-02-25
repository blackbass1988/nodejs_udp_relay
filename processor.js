module.exports = {

    process: function (data, oldData) {
        if (data.countTimes === undefined){
            data.countTimes = 2;
        } else {
            data.countTimes = oldData.countTimes + 1;
        }
        if (oldData.userData !== undefined) {
            data.userData = mergeObjects(data.userData, oldData.userData);
        }

        return data;
    }
}


function mergeObjects(a, b) {
    for (var attrName in b) {
        a[attrName] = a[attrName] === undefined ? b[attrName] : a[attrName] + b[attrName];
    }
    return a;
}
