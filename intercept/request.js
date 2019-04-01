function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
        url: "",
        params: {}
    }, t = null;
    return t = e.url && -1 !== e.url.indexOf("http") ? e.url : s.default.getHttpLocation() + e.url, 
    (0, c.obj2url)(e.params) ? t + "?" + (0, c.obj2url)(e.params) : t + (0, c.obj2url)(e.params);
}

function a() {
    var e = s.default.APP_CODE, t = n.default.getStorageSync("cookie") || {}, a = t["account_id_" + e] || 0;
    return {
        "Grpc-Metadata-Appid": e,
        "Grpc-Metadata-Account": a,
        "Grpc-Metadata-Staff": t["staff_id_" + e] || 0,
        "Grpc-Metadata-Token": t["token_" + e] || 0,
        "Grpc-Metadata-Requestid": new Date().getTime()
    };
}

function r() {
    var e = s.default.APP_CODE, t = n.default.getStorageSync("cookie") || {}, a = "";
    return a += "app=" + e + ";", a += [ "token_" + e + "=" ] + (t["token_" + e] || 0) + ";", 
    a += [ "account_id_" + e + "=" ] + (t["account_id_" + e] || 0) + ";", a += [ "corporation_id_" + e + "=" ] + (t["corporation_id_" + e] || 0) + ";", 
    a += [ "staff_id_" + e + "=" ] + (t["staff_id_" + e] || 0) + ";", a += [ "client_ver_" + e + "=" ] + "wxa/store;", 
    a += [ "request_id_" + e + "=" ] + new Date().getTime() + ";", {
        cookie: a
    };
}

function o() {
    var e = s.default.APP_CODE, t = n.default.getStorageSync("cookie") || {};
    return {
        app_type: e,
        account_id: t["account_id_" + e] || 0,
        corporation_id: t["corporation_id_" + e] || 0,
        staff_id: t["staff_id_" + e] || 0,
        client_ver: "wxa/store",
        request_id: new Date().getTime()
    };
}

function d(e) {
    var t = !0;
    return 401 === e.statusCode && l.C16 === e.data.code ? (clearTimeout(getApp().appTimer), 
    getApp().kpApi.showModal({
        showCancel: !1,
        title: s.default.login.title,
        content: s.default.login.time_out,
        confirmText: s.default.login.btn_login,
        success: function() {
            getApp().dispatch("appLogout");
        }
    })) : 500 === e.statusCode && "100281001" == e.code || "100281002" == e.code ? getApp().dispatch("session_userinfo_change") : 400 === e.statusCode && l.C3 === e.data.code && -1 === e.data.error.indexOf("JSON") ? n.default.reLaunch(s.default.NOT_FOUND) : t = !1, 
    t;
}

function i(e, t) {
    e && (getApp().requestTasks[e] = t);
}

function u(e) {
    e && getApp().requestTasks[e] && delete getApp().requestTasks[e];
}

var n = e(require("./api.js")), s = e(require("../config/config")), c = require("../utils/util"), f = function() {
    var e = 0, t = !1;
    return function(a) {
        if (a) {
            if (!1 === a.loading) return;
            ++e;
        } else {
            if (!e) return;
            --e;
        }
        e <= 0 ? (n.default.hideLoading(), t = !1) : e > 0 && !t && (n.default.showLoading(), 
        t = !0);
    };
}(), l = {
    C2: 2,
    C3: 3,
    C14: 14,
    C16: 16
};

module.exports = function(e) {
    var c = Object.assign({
        method: "POST",
        data: {}
    }, JSON.parse(JSON.stringify(e))), l = c.requestTaskId;
    return delete c.requestTaskId, new Promise(function(s, _) {
        delete c.data.loading, Object.assign(c, {
            url: t(c),
            header: Object.assign(a(), r(), c.header),
            data: Object.assign({}, c.data, {
                header: Object.assign(o(), c.data.header)
            }),
            success: function(e) {
                if (200 === e.statusCode && e.data) s(e.data); else {
                    if (console.log("请求不成功，返回的response:", e), e.data && e.data.error && (e.code = e.data.error.substr(-9), 
                    e.request_id = c.data.header.request_id), e.code || (e.code = c.data.header.request_id, 
                    e.request_id = c.data.header.request_id), d(e)) return;
                    _(e);
                }
            },
            fail: function(e) {
                e.data && e.data.error && (e.code = e.data.error.substr(-9), e.request_id = c.data.header.request_id), 
                e.code || (e.code = c.data.header.request_id, e.request_id = c.data.header.request_id), 
                _(e);
            },
            complete: function(e) {
                f(), u(l);
            }
        }), console.log("请求参数", c), f(e);
        var p = n.default.request(c);
        i(l, p);
    }).catch(function(e) {
        return "request:fail timeout" === e.errMsg && n.default.showToast({
            icon: "none",
            title: s.default.common.server_out
        }), e.data && e.data.error && (e.code = e.data.error.substr(-9)), Promise.reject(e);
    });
};