function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../utils/util.js"), n = function t(e) {
    var n = e.name, i = e.inst;
    return new t.fn.init({
        name: n,
        inst: i
    });
};

(n.fn = n.prototype = {
    init: function(t) {
        var e = t.name, n = t.inst;
        return this.inst = n, this.name = e, this.state = getApp().state[e], this;
    }
}).init.prototype.getData = function(t, n) {
    var i = getApp().state[this.name][n] || getApp().state[this.name], a = (0, e.split2arr)(t), r = a.pop(), s = null;
    try {
        a.forEach(function(t) {
            i = i[t];
        }), s = i[r];
    } catch (t) {
        s = null;
    }
    return s;
}, n.fn.init.prototype.setData = function(n) {
    var i = this;
    Object.keys(n).forEach(function(t) {
        try {
            var a = getApp().state[i.name], r = (0, e.split2arr)(t), s = r.pop();
            r.forEach(function(t) {
                a[t] || (a[t] = {}), a = a[t];
            }), a[s] = n[t];
        } catch (e) {
            console.warn("设置数据时发现异常, 未找到对相关数据" + t);
        }
    });
    var a = this.name;
    this.inst && this.inst.setData(t({}, a, getApp().state[a])), this.state = getApp().state[this.name];
}, exports.default = n;