function e(e, t) {
    var r = {};
    for (var n in e) t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    return r;
}

function t(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}

function r(e) {
    var n = t(e);
    if ("array" === n) {
        var o = [];
        for (var i in e) o[i] = r(e[i]);
        return o;
    }
    if ("object" === n) {
        var s = {};
        for (i in e) e.hasOwnProperty(i) && (s[i] = r(e[i]));
        return s;
    }
    return e;
}

function n(e) {
    for (var o = arguments.length, i = Array(o > 1 ? o - 1 : 0), s = 1; s < o; s++) i[s - 1] = arguments[s];
    return i.forEach(function(o) {
        for (var i in o) !function(i) {
            var s = t(o[i]);
            if ("object" === s) e[i] = e[i] ? e[i] : {}, e[i] = n(e[i], o[i]); else if ("function" === s) {
                var a = e[i];
                e[i] = function() {
                    var e = o[i].apply(this, arguments);
                    return a && a.apply(this, arguments) || e;
                };
            } else e[i] = "array" === s ? r(o[i]) : "number" === s ? o[i] : "boolean" === s ? o[i] : o[i] || e[i] || "";
        }(i);
    }), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.combine = n, exports.combinePage = function(e) {
    return n(e, o.default);
}, exports.formatDate = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd", r = function(e) {
        return (e = e.toString())[1] ? e : "0" + e;
    }, n = {
        "y+": e.getFullYear(),
        "M+": r(e.getMonth() + 1),
        "d+": r(e.getDate()),
        "H+": r(e.getHours()),
        "m+": r(e.getMinutes()),
        "s+": r(e.getSeconds())
    };
    for (var o in n) t = t.replace(new RegExp(o, "g"), n[o]);
    return t;
}, exports.obj2url = function(e) {
    var t = "";
    if (e) {
        t = [];
        for (var r in e) t = [ t.concat([ [ encodeURIComponent(r), encodeURIComponent(e[r]) ].join("=") ]).join("&") ];
    }
    return t;
}, exports.split2arr = function(e) {
    return e.replace(/\]\[|\]\./g, ".").replace(/\[|\]/g, ".").split(".");
}, exports.getPriceByPrecision = function(e, t) {
    if (void 0 === t) return t;
    if (-1 === ("" + t).indexOf(".")) return t;
    var r = parseInt(e.cloudstore.corporation.setting.product_price_precision);
    return ("" + t).substr(("" + t).indexOf(".") + 1).length > r ? t.toFixed(r) : t;
}, exports.getQuantityByPrecision = function(e, t) {
    if (-1 === t.toString().indexOf(".")) return t;
    var r = parseInt(e.cloudstore.corporation.setting.product_quality_precision);
    return ("" + t).substr(("" + t).indexOf(".") + 1).length > r ? t.toFixed(r) : t;
}, exports.getRoundUpQuantityByPrecision = function(t) {
    var r = e(t, []);
    if (-1 === r.val.toString().indexOf(".")) return r.val;
    var n = r.val.toString(), o = n.substr(0, n.indexOf(".")), i = n.substr(n.indexOf(".") + 1), s = r.state && r.state.cloudstore.corporation.setting.product_quality_precision || r.precision;
    return i.length > s && (i = +i.substr(0, s) + 1), o + "." + i;
}, exports.debounce = function(e, t) {
    var r = void 0;
    return function(n) {
        var o = this;
        r && clearTimeout(r), r = setTimeout(function() {
            r = null, e.call(o, n);
        }, t);
    };
}, exports.showPrice = function(e, t) {
    return 0 != (64 & e) && !(!t && 0 != (1024 & e));
}, exports.cartStorageKey = function() {
    var e = "CART_" + getApp().getCorpId(), t = "CART_" + getApp().getCorpId() + "_" + getApp().state.session.account.account_id, r = getApp().kpApi.getStorageSync(e);
    if (r && r.editedOrder) {
        var n = getApp().state.session.customer;
        (n && n.customer_id) === r.editedOrder.customer_id && (console.log("更新cart storage"), 
        getApp().kpApi.setStorageSync(t, r), getApp().kpApi.removeStorageSync(e));
    }
    return t;
}, exports.getAvatar = function() {
    var e = getApp().state, t = e.session.account && e.session.account.wechat_avatar;
    if (t) return t;
    var r = e.cloudstore.storeProfile && e.cloudstore.storeProfile.avatar;
    if (r && 0 === r.indexOf("http")) return r;
    var n = e.session.wxInfo && e.session.wxInfo.userInfo && e.session.wxInfo.userInfo.avatarUrl;
    return n || "/assets/default_header.svg";
}, exports.formatByPrecision = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, r = Number(e);
    if (!r) return 0;
    var n = r.toFixed(t).split(".");
    return n[0] = n[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, ","), n[1] = n[1] ? n[1].replace(/0+$/, "") : "", 
    n[1] ? n.join(".") : n[0];
};

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../src/components/pageBase.js"));