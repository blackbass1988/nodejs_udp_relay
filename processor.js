module.exports = {

    process: function (one, two) {
        one.body = two.body + one.body;
        return one;
    }
}
