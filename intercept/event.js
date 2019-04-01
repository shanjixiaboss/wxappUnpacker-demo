function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = function() {
    function n() {
        e(this, n), this.EventObj = {
            list: {}
        };
    }
    return t(n, [ {
        key: "createEventOnPage",
        value: function(e) {
            if (e && e.events) {
                var t = this;
                t._beforeListen(e), Object.keys(e.events).forEach(function(n) {
                    t._listen(n, e.events[n], e);
                });
            }
        }
    }, {
        key: "_beforeListen",
        value: function(e, t) {
            var n = this, i = e.onUnload;
            e.onUnload = function() {
                t ? n.remove(t, e) : Object.keys(e.events).forEach(function(t) {
                    n.remove(t, e);
                }), i && i.apply(e, arguments);
            };
        }
    }, {
        key: "listen",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : getCurrentPages()[getCurrentPages().length - 1], i = this;
            i._beforeListen(n, e), i._listen(e, t, n);
        }
    }, {
        key: "_listen",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : getCurrentPages()[getCurrentPages().length - 1];
            this.EventObj.list[e] || (this.EventObj.list[e] = [], console.log("新增事件类型,事件名为：" + e, n)), 
            this.EventObj.list[e].push({
                callback: t,
                instance: n,
                key: n.__wxWebviewId__
            }), console.log(e + "事件监听添加成功，共有" + this.EventObj.list[e].length + "个。");
        }
    }, {
        key: "trigger",
        value: function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
            this.EventObj.list[e] && this.EventObj.list[e].forEach(function(t) {
                console.log("回调" + e + "事件"), t.callback.apply(t.instance, n);
            });
        }
    }, {
        key: "remove",
        value: function(e, t) {
            if (this.EventObj.list[e]) {
                var n = t || getCurrentPages()[getCurrentPages().length - 1], i = this.EventObj.list[e], s = i.findIndex(function(e) {
                    return e.key === n.__wxWebviewId__;
                });
                i.splice(s, 1), 0 === i.length && delete this.EventObj.list[e], console.log("移除监听" + e);
            }
        }
    }, {
        key: "removeAll",
        value: function(e) {
            e ? delete this.EventObj.list[e] : this.EventObj.list = {};
        }
    }, {
        key: "hasListen",
        value: function(e) {
            return !!this.EventObj.list[e];
        }
    }, {
        key: "showAll",
        value: function(e) {
            return console.log(this.EventObj.list), this.EventObj.list;
        }
    } ]), n;
}();

exports.default = n;