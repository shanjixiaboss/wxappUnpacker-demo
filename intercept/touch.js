function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = function() {
    function i() {
        t(this, i), this.dataList = [], this.startClientX = null, this.operationWrapperWidth = null;
    }
    return e(i, [ {
        key: "initData",
        value: function(t) {
            var e = t.datalist, i = t.operationWrapperWidth;
            this.operationWrapperWidth = i, this.dataList = e instanceof Array ? e.concat() : [ e ];
        }
    }, {
        key: "touchStart",
        value: function(t) {
            return this._resetData(), this.startClientX = this._getClientX(t), this.dataList;
        }
    }, {
        key: "touchMove",
        value: function(t) {
            var e = this._getMoveWidth(t);
            if (!(e > 0)) return this.dataList[this.getItemIndex(t)].left = Math.abs(e) > this.operationWrapperWidth ? -this.operationWrapperWidth : e, 
            this.dataList[this.getItemIndex(t)];
        }
    }, {
        key: "touchEnd",
        value: function(t) {
            var e = this._getMoveWidth(t), i = 0;
            return e < 0 && Math.abs(e) > this.operationWrapperWidth / 2 && (i = -this.operationWrapperWidth), 
            this.dataList[this.getItemIndex(t)].left = i, this.dataList[this.getItemIndex(t)];
        }
    }, {
        key: "getItemIndex",
        value: function(t) {
            return t.currentTarget.dataset.index;
        }
    }, {
        key: "_getClientX",
        value: function(t) {
            var e = t.changedTouches;
            if (1 === e.length) return e[0].clientX;
        }
    }, {
        key: "_getMoveWidth",
        value: function(t) {
            return this._getClientX(t) - this.startClientX;
        }
    }, {
        key: "_resetData",
        value: function() {
            this.startClientX = null, this.dataList.forEach(function(t) {
                t.left = 0;
            });
        }
    } ]), i;
}();

exports.default = i;