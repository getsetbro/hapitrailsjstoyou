module.exports = function (options, context) {
    options = options || {};
    if (context.data.root.title == options) {
        return '<li class="active">';
    }

    return '<li>';
};

