function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), i = function() {
    function i() {
        e(this, i), this.limitPage = 3, this.defaultPage = {
            list: []
        }, this.reset();
    }
    return a(i, [ {
        key: "reset",
        value: function() {
            var t = {
                prev: null,
                next: null,
                list: [],
                pagenum: 1
            };
            this.data = {
                firstPage: t,
                lastPage: t,
                1: t
            };
        }
    }, {
        key: "addPage",
        value: function(t, e) {
            if (0 === t) return this._handleDefaultPage(e);
            if (this._validPage(t)) {
                if (this._hasPage(t)) return this._updatePage(t, e);
                t < this.firstPageNum() ? (this._unshift(t, e), this._exceedLimit() && this._pop()) : (this._push(t, e), 
                this._exceedLimit() && this._shift());
            }
        }
    }, {
        key: "toList",
        value: function() {
            return this.data.firstPage ? this._concatList(this.data.firstPage) : [];
        }
    }, {
        key: "firstPageNum",
        value: function() {
            return this.data.firstPage.pagenum;
        }
    }, {
        key: "lastPageNum",
        value: function() {
            return this.data.lastPage.pagenum;
        }
    }, {
        key: "getPage",
        value: function(t) {
            return 0 === t ? this.defaultPage.list : this._hasPage(t) ? this.data[t].list : (console.log("不存在商品第 " + t + " 页数据"), 
            []);
        }
    }, {
        key: "_concatList",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return e = e.concat(t.list), t.next && (e = this._concatList(t.next, e)), e;
        }
    }, {
        key: "_validPage",
        value: function(t) {
            var e = this.firstPageNum(), a = this.lastPageNum();
            return t >= e - 1 && t <= a + 1 || (console.log("非法页码"), !1);
        }
    }, {
        key: "_hasPage",
        value: function(t) {
            return this.data.hasOwnProperty(t);
        }
    }, {
        key: "_unshift",
        value: function(t, e) {
            var a = this.data.firstPage, i = {
                list: e,
                pagenum: t,
                prev: null,
                next: a
            };
            this.data[t] = i, a.prev = i, this.data.firstPage = i;
        }
    }, {
        key: "_shift",
        value: function() {
            var t = this.firstPageNum(), e = this.data.firstPage.next;
            e.prev = null, this.data.firstPage = e, delete this.data[t];
        }
    }, {
        key: "_push",
        value: function(t, e) {
            var a = this.data.lastPage, i = {
                list: e,
                pagenum: t,
                prev: a,
                next: null
            };
            this.data[t] = i, a.next = i, this.data.lastPage = i;
        }
    }, {
        key: "_pop",
        value: function() {
            var t = this.lastPageNum(), e = this.data.lastPage.prev;
            e.next = null, this.data.lastPage = e, delete this.data[t];
        }
    }, {
        key: "_updatePage",
        value: function(e, a) {
            for (var i = this.data[e].list, n = [].concat(t(i)), s = 0, u = a.length; s < u; s += 1) !function(t, e) {
                n.find(function(e) {
                    return e.product.product_id === a[t].product.product_id;
                }) || n.push(a[t]);
            }(s);
            this.data[e].list = n;
        }
    }, {
        key: "_handleDefaultPage",
        value: function(t) {
            this.defaultPage.list = t;
        }
    }, {
        key: "_exceedLimit",
        value: function() {
            var t = this.firstPageNum();
            return this.lastPageNum() - t + 1 > this.limitPage;
        }
    } ]), i;
}();

exports.default = i;