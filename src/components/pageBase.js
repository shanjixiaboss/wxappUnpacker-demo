Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    onLoad: function(e) {
        this.$store = getApp();
    },
    onShow: function() {
        this.setData({
            appShare: getApp().appShare || !1
        });
    },
    onShareAppMessage: function() {
        return getApp().shareApp();
    },
    data: {}
};

exports.default = e;