function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = e(require("./config/config.js")), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("./store/index")), r = e(require("./intercept/api.js")), i = e(require("./intercept/event.js")), s = e(require("./intercept/share.js")), a = e(require("./intercept/touch.js")), c = e(require("./intercept/request.js")), u = require("./utils/util.js"), p = e(require("./lib/productLinkedList")), f = e(require("./lib/placeOrderProcesser")), l = new p.default(), d = {
    onLaunch: function(e) {
        console.log("-------------Launch", e), wx.removeStorageSync("account");
    },
    onShow: function() {
        try {
            console.log("-----------getUpdateManager");
            var e = r.default.getUpdateManager();
            e.onUpdateReady(function() {
                console.log("onUpdateReady"), setTimeout(function() {
                    r.default.showModal({
                        content: o.default.common.version,
                        showCancel: !1,
                        success: function(t) {
                            e.applyUpdate();
                        }
                    });
                }, 2e3);
            });
        } catch (e) {}
    },
    onPageNotFound: function(e) {
        console.log("-----onPageNotFound", e), wx.redirectTo({
            url: o.default.NOT_FOUND_PAGE
        });
    },
    init: function() {
        var e = this, t = function(t) {
            getApp().commit("initCart"), e.initCount = 0, console.log("-------拉取数据", t), e.event.hasListen("shareAppListener") ? (e.event.trigger("shareAppListener"), 
            e.event.removeAll("shareAppListener")) : e.event.hasListen("afterLoginListener") ? (e.event.trigger("afterLoginListener"), 
            e.event.removeAll("afterLoginListener")) : (getApp().kpApi.reLaunch(getApp().appToPath && o.default[getApp().appToPath] || o.default.INDEX_PATH), 
            getApp().appToPath = null);
        }, n = function(t) {
            if (console.log("-------拉取数据失败", t), console.log("account", e.initCount), e.initCount >= 3) return e.initCount = 0, 
            console.log("------3次初始化数据失败, 重新跳转登录页"), void getApp().dispatch("appLogout");
            e.initCount++, e.init();
        };
        console.log("-------初始化基础数据"), Promise.all([ getApp().dispatch("reloadI18NFromServer"), getApp().dispatch("reloadStoreProductBaseFromServer") ]).then(function(e) {
            getApp().isLogin() ? getApp().dispatch("reloadStoreProfileBaseFromServer").then(function(e) {
                return getApp().dispatch("initLocalCart");
            }).then(t).catch(n) : t();
        }).catch(n);
    },
    setCreatorId: function(e) {
        var t = wx.getStorageSync("cookie") || {};
        return t["staff_id_" + o.default.APP_CODE] = e, wx.setStorageSync("cookie", t), 
        this.creator_id = e, getApp().dispatch("getCreatorStaff"), this.creator_id;
    },
    getCreatorId: function() {
        return this.state.session.staff && this.state.session.staff.staff_id && (this.creator_id = this.state.session.staff.staff_id), 
        this.creator_id || "0";
    },
    getCorpId: function() {
        return wx.getStorageSync("cookie")["corporation_id_" + o.default.APP_CODE];
    },
    setCorpId: function(e) {
        e || wx.removeStorageSync("corporation");
        var t = wx.getStorageSync("cookie") || {};
        t["corporation_id_" + o.default.APP_CODE] = e, wx.setStorageSync("cookie", t), this.state.session.corporation_id = e;
    },
    getCorpObject: function() {
        var e = this;
        return this.state.cloudstore.storeProfile.corporationids.corporation.find(function(t) {
            return t.encrypt_corporation_id === e.getCorpId();
        });
    },
    isLogin: function() {
        return getApp().state.session.account;
    },
    isCustomer: function() {
        return getApp().state.session.customer;
    },
    _sizeOf: function(e) {
        for (var o = [], n = [ e ], r = 0; n.length; ) {
            var i = n.pop();
            if ("boolean" == typeof i) r += 4; else if ("string" == typeof i) r += 2 * i.length; else if ("number" == typeof i) r += 8; else if ("object" === (void 0 === i ? "undefined" : t(i)) && -1 === o.indexOf(i)) {
                o.push(i);
                for (var s in i) n.push(i[s]);
            }
        }
        return r;
    },
    checkEnterSuccess: function() {
        this.isEnterSuccess || this.kpApi.reLaunch(o.default.INTERCEPT_INFO);
    },
    state: {
        session: {}
    },
    event: new i.default(),
    touch: new a.default(),
    request: c.default,
    kpApi: r.default,
    initCount: 0,
    appTimer: null,
    productLinkedList: l,
    requestTasks: {},
    placeOrderProcesser: new f.default()
};

(0, u.combine)(d, n, s.default), App(d);