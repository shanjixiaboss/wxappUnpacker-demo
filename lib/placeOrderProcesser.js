function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("../utils/util"), r = {
    pending: 0,
    processing: 1
}, i = function() {
    function i() {
        var t = this;
        e(this, i), this.queue = [], this.state = r.pending, this.debouncePlace = (0, n.debounce)(function() {
            t._next();
        }, 200), this.timer = null;
    }
    return t(i, [ {
        key: "add",
        value: function(e) {
            var t = e.fn, n = e.productId, r = this.queue;
            if (0 === r.length) r.push({
                fn: t,
                productId: n
            }); else if (r[r.length - 1].productId === n) r.splice(r.length - 1, 1, {
                fn: t,
                productId: n
            }); else {
                if (r.length > 5) return;
                r.push({
                    fn: t,
                    productId: n
                });
            }
            this.debouncePlace();
        }
    }, {
        key: "complete",
        value: function() {
            this.timer && clearTimeout(this.timer), console.log("placeOrderProcesser complete"), 
            this.state = r.pending, this._next();
        }
    }, {
        key: "_next",
        value: function() {
            if (0 === this.queue.length) return console.log("placeOrderProcesser queue empty"), 
            void (this.state = r.pending);
            this.state === r.pending ? (console.log("placeOrderProcesser pending"), this._setTimeout(), 
            this.state = r.processing, this.queue.pop().fn()) : console.log("placeOrderProcesser processing");
        }
    }, {
        key: "_setTimeout",
        value: function() {
            var e = this;
            this.timer && clearTimeout(this.timer), console.log("placeOrderProcesser setTimeout"), 
            this.timer = setTimeout(function() {
                console.log("placeOrderProcesser Timeout"), e.complete();
            }, 2500);
        }
    } ]), i;
}();

exports.default = i;