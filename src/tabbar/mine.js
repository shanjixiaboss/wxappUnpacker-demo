var t = require("../../utils/util.js"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../config/config.js")), a = null, i = null, o = {
    data: {
        commonList: [ {
            key: "ORDER_LIST",
            leftName: "单据",
            rightVal: "",
            icon: "",
            callback: "itemCallback"
        }, {
            key: "MINE_ACCOUNT",
            leftName: "对账",
            rightVal: "",
            icon: "",
            callback: "itemCallback"
        } ],
        historyList: {
            key: "MINE_HISTORY",
            leftName: "看过的店铺",
            rightVal: "",
            icon: "",
            callback: "itemCallback"
        },
        cloudstore: {},
        avatarUrl: ""
    },
    itemCallback: function(t) {
        var a = t.currentTarget.id;
        getApp().kpApi.navigateTo(e.default[a]);
    },
    onLoad: function() {
        getApp().appShare = !1, a = getApp().use({
            name: "session",
            inst: this
        }), i = getApp().use({
            name: "cloudstore"
        }), this.setData({
            avatarUrl: (0, t.getAvatar)()
        });
    },
    onShow: function() {
        this.setData({
            cloudstore: {
                storeProfile: i.state.storeProfile
            },
            session: {
                account: a.state.account,
                wxInfo: a.state.wxInfo
            }
        });
    },
    clickHereToChangeEnviroment: function(t) {
        getApp().dispatch("switchEnviroment");
    }
};

(0, t.combinePage)(o), Page(o);