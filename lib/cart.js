function t(t, r) {
    var i = t.cart.productDict[r.product_id];
    if (i) {
        if (i.specs_detail && i.specs_detail.length > 0) {
            var e = !0, n = !1, c = void 0;
            try {
                for (var o, u = i.specs_detail[Symbol.iterator](); !(e = (o = u.next()).done); e = !0) return o.value.price;
            } catch (t) {
                n = !0, c = t;
            } finally {
                try {
                    !e && u.return && u.return();
                } finally {
                    if (n) throw c;
                }
            }
        } else if (i.detail) return i.detail.price;
    }
}

function r(t, r) {
    var i = y(t, r);
    if (i) return i.price;
}

function i(t, r, i) {
    if (void 0 === i && (i = v(t, r)), !t.cloudstore.staff) return _(t, r, i).price;
    var e = t.cloudstore.customer.price_type, n = g(t, r.prices.price[i].price.price_types);
    if (r.prices.price[i].price) {
        var c = n.filter(function(t) {
            return "0" == t.status;
        }).find(function(t) {
            return t.type === e;
        }), o = n[0];
        return (c || o).price;
    }
}

function e(t, r) {
    var i = t.cart.productDict[r.product_id];
    if (i) if (i.specs_detail && i.specs_detail.length > 0) {
        var e = !0, n = !1, c = void 0;
        try {
            for (var o, u = i.specs_detail[Symbol.iterator](); !(e = (o = u.next()).done); e = !0) return o.value.price_type;
        } catch (t) {
            n = !0, c = t;
        } finally {
            try {
                !e && u.return && u.return();
            } finally {
                if (n) throw c;
            }
        }
    } else if (i.detail) return i.detail.price_type;
}

function n(t, r) {
    var i = y(t, r);
    if (i) return i.price_type;
}

function c(t, r, i) {
    if (t.cloudstore.staff) {
        var e = t.cloudstore.corporation.setting.price_types.find(function(r) {
            return r.type === t.cloudstore.customer.price_type;
        }), n = t.cloudstore.corporation.setting.price_types[0];
        return ("0" === e.status ? e : n).type;
    }
    return _(t, r, i).type;
}

function o(t, r) {
    return "TRADE" === r || "RETAIL" === r ? "TRADE" == r ? "0" : "1" : r;
}

function u(t, r) {
    if (t.cart.productDict[r.product_id]) {
        var i = 0, e = t.cart.productDict[r.product_id];
        if (e.specs_detail && e.specs_detail.length > 0) {
            var n = !0, c = !1, o = void 0;
            try {
                for (var u, d = e.specs_detail[Symbol.iterator](); !(n = (u = d.next()).done); n = !0) i += u.value.quantity;
            } catch (t) {
                c = !0, o = t;
            } finally {
                try {
                    !n && d.return && d.return();
                } finally {
                    if (c) throw o;
                }
            }
        } else e.detail && (i += e.detail.quantity);
        return i;
    }
}

function d(t, r) {}

function a(t, r, i) {
    var e = 0;
    return t.cloudstore.cachedStockDict[r.product_id] && (e = t.cloudstore.cachedStockDict[r.product_id].stock), 
    void 0 === i && (i = v(t, r)), i > 0 && (e /= r.units.unit[i].rate), e;
}

function p(t, r) {
    var i = s(t, r);
    return void 0 === i && (i = f(t, r)), void 0 === i && (i = l(t, r)), void 0 === i && (i = v(t, r)), 
    i;
}

function s(t, r) {
    var i = t.cart.productDict[r.product_id];
    if (i) for (var e = 0; e < r.units.unit.length; e++) {
        var n = r.units.unit[e].unit_id;
        if (i.specs_detail[0] && n === i.specs_detail[0].price_unit_id || i.detail && n === i.detail.price_unit_id) return e;
    }
}

function f(t, r) {
    var i = t.cloudstore.cachedProductProfile[r.product_id];
    if (i) return i.unitIndex;
}

function l(t, r) {
    if (0 != (16 & t.cloudstore.corporation.setting.store_flag) && t.cloudstore.lastPrice) {
        var i = !0, e = !1, n = void 0;
        try {
            for (var c, o = t.cloudstore.lastPrice.prices.price[Symbol.iterator](); !(i = (c = o.next()).done); i = !0) {
                var u = c.value;
                if (r.product_id === u.product_id) for (var d = 0; d < r.units.unit.length; d++) if (r.units.unit[d].unit_id === u.price_unit_id) return d;
            }
        } catch (t) {
            e = !0, n = t;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (e) throw n;
            }
        }
    }
}

function v(t, r) {
    return r.units.default_unit_index;
}

function y(t, r) {
    if (16 & t.cloudstore.corporation.setting.store_flag && t.cloudstore.lastPrice) {
        var i = !0, e = !1, n = void 0;
        try {
            for (var c, o = t.cloudstore.lastPrice.prices.price[Symbol.iterator](); !(i = (c = o.next()).done); i = !0) {
                var u = c.value;
                if (r.product_id === u.product_id) for (var d = 0; d < r.units.unit.length; d++) if (r.units.unit[d].unit_id === u.price_unit_id) return u;
            }
        } catch (t) {
            e = !0, n = t;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (e) throw n;
            }
        }
    }
}

function _(t, r, i) {
    var e = r.units.unit[i].unit_id, n = r.prices.price.find(function(t) {
        return t.unit_id === e;
    });
    if (n.price) return g(t, n.price.price_types).filter(function(t) {
        return "0" == t.status;
    }).reduce(function(t, r) {
        return r.price > t.price ? r : t;
    });
}

function g(t, r) {
    return t.cloudstore.corporation.setting.price_types.concat().map(function(t, i) {
        var e = r.find(function(r) {
            return r.type === t.type;
        });
        return t.price = e ? e.price : t.price, t;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    getPrice: function(e, n, c) {
        var o = void 0;
        return void 0 !== c && c !== s(e, n) || (o = t(e, n)), void 0 === o && (void 0 !== c && c !== l(e, n) || (o = r(e, n))), 
        void 0 === o && (o = i(e, n, c)), o;
    },
    getPriceType: function(t, r, i) {
        var u = void 0;
        return void 0 === u && (void 0 !== i && i !== s(t, r) || (u = e(t, r))), void 0 === u && (void 0 !== i && i !== l(t, r) || (u = n(t, r))), 
        void 0 === u && (u = c(t, r, i)), o(0, u);
    },
    getQuantity: function(t, r) {
        var i = u(t, r);
        return void 0 === i && (i = d()), void 0 === i && (i = a(t, r)), i;
    },
    getUnitIndex: p,
    getCartPrice: t,
    getCartPriceType: e,
    getCartQuantity: u,
    getCartUnitIndex: s,
    getLastPrice: r,
    getLastPriceType: n,
    getLastQuantity: d,
    getLastUnitIndex: l,
    getProductPrice: i,
    getProductPriceType: c,
    getProductQuantity: a,
    getProductUnitIndex: v,
    getHighestPrice: function(t, r, i) {
        return void 0 === i && (i = p(t, r)), _(t, r, i).price;
    },
    compatibleWithOldPriceType: o,
    getPriceTypeObjectWithHighestPrice: _
};