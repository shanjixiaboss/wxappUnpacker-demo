function e(e) {
    Object.assign(a, e);
}

function t(e) {
    var t = this.state.session, n = t.account, s = t.wxInfo, a = t.token;
    this.state = Object.assign({}, e), this.state.session.account = n, this.state.session.wxInfo = s, 
    this.state.session.token = a;
}

function n(e) {
    Object.assign(i, e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.dispatch = function(e) {
    var t = arguments && arguments[1];
    return a[e].call(this, t);
}, exports.commit = function(e, t) {
    var n = Object.keys(i).find(function(t) {
        return i[t].hasOwnProperty(e);
    });
    {
        if (n) return getApp().state[n] = i[n][e].call(null, getApp().state[n], t), getApp().state[n];
        console.warn("未找到对应" + e + "的纯函数");
    }
}, exports.use = function(e) {
    return new s.default(e);
}, exports.createStore = function() {
    var s = require("./actions/index.js"), a = require("./reducers/index.js");
    if (s) {
        var i = {}, r = {};
        Object.keys(s).forEach(function(e) {
            i[e] = JSON.parse(JSON.stringify(s[e].state)), r = Object.assign({}, r, s[e].actions);
        }), t.call(this, i), e.call(this, r);
    }
    a && n(a), getApp().appShare = !1;
}, exports.sharesDeal = function(e) {
    delete (e = JSON.parse(JSON.stringify(e))).id, delete e.staff_id, delete e.appShare;
    e.actionName;
    if (0 == Object.keys(r).length) {
        var t = require("./shares/index.js"), n = {};
        t && (Object.keys(t).forEach(function(e) {
            n = Object.assign({}, n, t[e]);
        }), Object.assign(r, n));
    }
    !function(e) {
        console.log("params", e, r), Object.keys(e).forEach(function(t) {
            e[t] = e[t] ? decodeURIComponent(e[t]) : e[t];
        });
        var t = Object.assign({}, e);
        e.path ? getApp().event.listen("shareAppListener", function() {
            getApp().appShare = !0, delete e.path, delete e.actionName, console.log("decode params", e), 
            getApp().kpApi.reLaunch({
                url: t.path
            }, e);
        }) : r[e.actionName] ? getApp().event.listen("shareAppListener", function() {
            getApp().appShare = !0, delete e.path, delete e.actionName, delete e.pathParams, 
            console.log("decode params", e), r[t.actionName].call(null, e);
        }) : e.actionName ? getApp().event.listen("shareAppListener", function() {
            getApp().dispatch("commonException");
        }) : getApp().event.removeAll("shareAppListener");
    }(e);
};

var s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../intercept/store.js")), a = {}, i = {}, r = {};