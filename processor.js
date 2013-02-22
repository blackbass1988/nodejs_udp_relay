module.exports = {

    process: function (data, delta) {
        data.body += delta.body;
        return data;
    }
}
