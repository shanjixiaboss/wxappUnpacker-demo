function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

function t(e, t, o) {
    !e.isNeedLogin || getApp().state.session.account && getApp().state.session.token ? o && o() : getApp().kpApi.showModal({
        title: s.default.login.title,
        content: s.default.login.toast_tips,
        showCancel: !0,
        success: function(o) {
            o.confirm && getApp().dispatch("commonLogin", {
                obj: e,
                data: t
            });
        }
    });
}

function o(e, t) {
    return {
        url: t ? e.url + "?" + (0, n.obj2url)(t) : e.url,
        fail: function(e) {
            e.errMsg && wx.reLaunch(Object.assign({}, s.default.NOT_FOUND_PAGE));
        }
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a, n = require("../utils/util.js"), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../config/config.js")), i = {
    alarm: "/assets/alarm.png"
}, c = {
    getUserInfo: "scope.userInfo",
    chooseLocation: "scope.userLocation",
    getLocation: "scope.userLocation",
    chooseAddress: "scope.address",
    chooseInvoiceTitle: "scope.invoiceTitle",
    getWeRunData: "scope.werun",
    startRecord: "scope.record",
    saveImageToPhotosAlbum: "scope.writePhotosAlbum",
    saveVideoToPhotosAlbum: "scope.writePhotosAlbum",
    camera: "scope.camera"
};

exports.default = (a = {
    setStorageSync: wx.setStorageSync,
    getStorageSync: wx.getStorageSync,
    getStorage: wx.getStorage,
    setStorage: wx.setStorage,
    removeStorage: wx.removeStorage,
    removeStorageSync: wx.removeStorageSync,
    getUserInfo: wx.getUserInfo,
    getSystemInfo: wx.getSystemInfo,
    getSystemInfoSync: wx.getSystemInfoSync,
    getLocation: wx.getLocation,
    chooseLocation: wx.chooseLocation,
    openLocation: wx.openLocation,
    createMapContext: wx.createMapContext,
    createSelectorQuery: wx.createSelectorQuery,
    hideLoading: wx.hideLoading,
    hideToast: wx.hideToast,
    login: wx.login,
    checkSession: wx.checkSession,
    downloadFile: wx.downloadFile,
    getFileSystemManager: wx.getFileSystemManager,
    createCanvasContext: wx.createCanvasContext,
    canvasToTempFilePath: wx.canvasToTempFilePath,
    saveImageToPhotosAlbum: wx.saveImageToPhotosAlbum,
    chooseImage: wx.chooseImage,
    previewImage: wx.previewImage
}, e(a, "saveImageToPhotosAlbum", wx.saveImageToPhotosAlbum), e(a, "getImageInfo", wx.getImageInfo), 
e(a, "request", wx.request), e(a, "scanCode", wx.scanCode), e(a, "setNavigationBarTitle", wx.setNavigationBarTitle), 
e(a, "setTabBarBadge", wx.setTabBarBadge), e(a, "removeTabBarBadge", wx.removeTabBarBadge), 
e(a, "showTabBarRedDot", wx.showTabBarRedDot), e(a, "hideTabBarRedDot", wx.hideTabBarRedDot), 
e(a, "setTabBarStyle", wx.setTabBarStyle), e(a, "setTabBarItem", wx.setTabBarItem), 
e(a, "showTabBar", wx.showTabBar), e(a, "hideTabBar", wx.hideTabBar), e(a, "showNavigationBarLoading", wx.showNavigationBarLoading), 
e(a, "stopPullDownRefresh", wx.stopPullDownRefresh), e(a, "getSetting", wx.getSetting), 
e(a, "authorize", wx.authorize), e(a, "openSetting", wx.openSetting), e(a, "makePhoneCall", wx.makePhoneCall), 
e(a, "getUpdateManager", wx.getUpdateManager), e(a, "chooseAddress", wx.chooseAddress), 
e(a, "navigateBack", function() {
    1 == getCurrentPages().length ? wx.switchTab(Object.assign({}, s.default.INDEX_PATH)) : wx.navigateBack();
}), e(a, "navigateTo", function(e, a) {
    t(e, a, function() {
        wx.navigateTo(o(e, a));
    });
}), e(a, "redirectTo", function(e, a) {
    t(e, a, function() {
        wx.redirectTo(o(e, a));
    });
}), e(a, "switchTab", function(e, a) {
    t(e, a, function() {
        wx.switchTab(o(e, a));
    });
}), e(a, "reLaunch", function(e, a) {
    t(e, a, function() {
        wx.reLaunch(o(e, a));
    });
}), e(a, "showLoading", function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    wx.showLoading(Object.assign({
        title: "加载中",
        mask: "true"
    }, e));
}), e(a, "showToast", function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({
        title: "成功",
        mask: "true",
        icon: "success",
        duration: 2e3
    }, e);
    t.image = i[t.image] || "", wx.showToast(t);
}), e(a, "showModal", function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    wx.showModal(Object.assign({
        title: "提示",
        mask: "true",
        content: "",
        showCancel: !0,
        cancelColor: "#000000",
        confirmColor: "#ff9f00"
    }, e));
}), e(a, "invokeWebviewMethod", function(e, t, o) {
    if (console.log(e, t, o), !t || !0 === t) {
        var a = getCurrentPages();
        t = [ a[a.length - 1].__wxWebviewId__ ];
    }
    "array" !== Object.prototype.toString.call(t).slice(8, -1).toLowerCase() && (t = [ t ]), 
    wx.invokeWebviewMethod({
        name: "appDataChange",
        args: Object.assign({}, {
            data: e
        }, {
            complete: o || function() {}
        }),
        webviewIds: t
    });
}), e(a, "kpCheckCanIuse", function(e, t) {
    wx[e] ? wx[e](t) : getApp().kpApi.showModal({
        content: "当前微信版本过低，无法使用最新功能，请升级到最新微信版本后重试。"
    });
}), e(a, "kpAuth", function(e, t, o) {
    getApp().event.removeAll("authCallback");
    var a = Object.assign({}, t);
    a.success = function(e) {
        t.success && t.success(e);
    }, a.fail = function(n) {
        wx.getSetting({
            success: function(i) {
                if (i.authSetting[c[e]] || o) t.fail && t.fail(n); else {
                    getApp().kpApi.showModal({
                        content: "您当前未授权该操作,授权后即可使用",
                        confirmText: "立即前往",
                        cancelText: "稍后",
                        success: function(t) {
                            t.confirm && (getApp().kpApi.navigateTo(s.default.INTERCEPT_INDEX, {
                                key: "getUserInfo" == e ? "" : c[e]
                            }), getApp().event.listen("authCallback", function() {
                                getApp().kpApi.navigateBack(), "getUserInfo" == e || wx[e](a);
                            }));
                        }
                    });
                }
            }
        });
    };
    try {
        wx[e](a);
    } catch (t) {
        console.warn("调取微信Api中的" + e + "出错");
    }
}), a);