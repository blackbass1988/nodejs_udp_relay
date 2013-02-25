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


function mergeObjects(a, b) {
    for (var attrName in b) {
        console.log(b);
        a[attrName] = a[attrName] === undefined ? b[attrName] : a[attrName] + b[attrName];
        console.log(a[attrName]);
    }
    return a;
}
