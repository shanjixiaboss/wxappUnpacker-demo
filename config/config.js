function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./zh-cn.js")), s = t(require("./rules.js")), o = t(require("./enums.js")), u = {
    isProd: !0,
    APP_CODE: 2,
    APP_LOGIN_TYPE: 6,
    APP_MP_ID: "wx06a4114be1928f3f",
    APP_NAME: "超级采购",
    TIMER_TIME: 6e4,
    STAY_TIME: 500,
    LIMIT: 200,
    IMAGE_DEFAULT: "/assets/default.png",
    VIDEO_DEFAULT: "/assets/default_video.png",
    HTTP_IMAGE_DEFAULT: "https://kpavatarstorage.oss-cn-hangzhou.aliyuncs.com/",
    HTTP_IMAGE_PRODUCT: "https://kpproductstorage.oss-cn-hangzhou.aliyuncs.com/",
    HTTP_VIDEO_PRODUCT: "https://kpproductvideo.oss-cn-hangzhou.aliyuncs.com/",
    ORDER: {
        LIMIT_DATE: 90,
        LIMIT_DATE_TIME: 7776e6
    },
    isDev: function() {
        var t = wx.getStorageSync("isDev");
        return "" === t || t;
    },
    getHttpLocation: function() {
        return u.isProd ? "https://kptom.com" : u.isDev() ? "http://dev.kptom.com" : "https://kptom.com";
    },
    getDefaultCorpId: function() {
        return u.isProd ? "5213278622785814962" : u.isDev() ? "9073905512751102983" : "5213278622785814962";
    }
};

Object.assign(u, e.default, s.default, o.default), exports.default = u;