function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t) {
    var i = {
        priceId: "",
        quantityId: ""
    };
    return t.specs_detail.length > 0 ? (i.priceId = t.specs_detail[0].price_unit_id, 
    i.quantityId = t.specs_detail[0].quantity_unit_id) : null !== t.detail && (i.priceId = t.detail.price_unit_id, 
    i.quantityId = t.detail.quantity_unit_id), i;
}

function e(t) {
    var i = 0;
    return t.specs_detail.length > 0 ? i = t.specs_detail.reduce(function(t, i) {
        return t + i.quantity;
    }, 0) : null !== t.detail && (i = t.detail.quantity), i;
}

function n(t) {
    var i = 0;
    return t.specs_detail.length > 0 ? i = t.specs_detail[0].price : null !== t.detail && (i = t.detail.price), 
    i;
}

function r(t, e) {
    var n = i(t), r = 0, u = !0, a = !1, d = void 0;
    try {
        for (var o, c = e[t.snapshot.product_id].units.unit[Symbol.iterator](); !(u = (o = c.next()).done); u = !0) {
            var l = o.value;
            l.unit_id === n.priceId && r++, l.unit_id === n.quantityId && r++;
        }
    } catch (t) {
        a = !0, d = t;
    } finally {
        try {
            !u && c.return && c.return();
        } finally {
            if (a) throw d;
        }
    }
    return 2 === r;
}

function u(t, e) {
    var n = i(t), r = 0, u = !0, a = !1, d = void 0;
    try {
        for (var o, c = t.snapshot.units.unit[Symbol.iterator](); !(u = (o = c.next()).done); u = !0) {
            var l = o.value;
            l.unit_id === n.priceId && (n.priceIdRate = l.rate), l.unit_id === n.quantityId && (n.quantityIdRate = l.rate);
        }
    } catch (t) {
        a = !0, d = t;
    } finally {
        try {
            !u && c.return && c.return();
        } finally {
            if (a) throw d;
        }
    }
    var s = !0, p = !1, f = void 0;
    try {
        for (var _, y = e[t.snapshot.product_id].units.unit[Symbol.iterator](); !(s = (_ = y.next()).done); s = !0) {
            var v = _.value;
            v.unit_id === n.priceId && v.rate === n.priceIdRate && r++, v.unit_id === n.quantityId && v.rate === n.quantityIdRate && r++;
        }
    } catch (t) {
        p = !0, f = t;
    } finally {
        try {
            !s && y.return && y.return();
        } finally {
            if (p) throw f;
        }
    }
    return 2 === r;
}

function a(t) {
    if (t.specs_detail.length > 0) {
        for (var i in t.snapshot.units.unit) if (t.snapshot.units.unit[i].unit_id === t.specs_detail[0].price_unit_id) return parseInt(i);
    } else for (var e in t.snapshot.units.unit) if (t.snapshot.units.unit[e].unit_id === t.detail.price_unit_id) return parseInt(e);
    return t.snapshot.units.default_unit_index;
}

function d(t, i, e, n) {
    var r = i.find(function(t) {
        return t.unit_id == e;
    }).rate, u = i.find(function(t) {
        return t.unit_id == n;
    }).rate;
    return (0, c.getQuantityByPrecision)(t, r / u);
}

function o(t, i, e, n) {
    var r = i.find(function(t) {
        return t.unit_id == n;
    }), u = i[e].rate, a = r ? r.rate : u;
    return (0, c.getQuantityByPrecision)(t, a / u);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var c = require("../utils/util"), l = t(require("./cart")), s = t(require("./product")), p = {
    validate: function(t, i) {
        function d(t, i) {
            if (n(t) * e(t) >= n(i) * e(i)) {
                var r = v.normal.findIndex(function(i) {
                    return i.snapshot.product_id === t.snapshot.product_id;
                });
                v.duplicate.push(v.normal[r]), v.normal[r] = t, y[t.snapshot.product_id] = t;
            } else v.duplicate.push(t);
        }
        var o = 4 & t.cloudstore.corporation.setting.store_flag, c = 8 & t.cloudstore.corporation.setting.store_flag, p = 512 & t.cloudstore.corporation.setting.store_flag, f = t.cloudstore.cachedProductDict, _ = t.cloudstore.cachedStockDict, y = {}, v = {
            lessThanZero: [],
            duplicate: [],
            deleted: [],
            noStock: [],
            unitModified: [],
            overStock: [],
            belowMoq: [],
            normal: []
        }, h = !0, q = !1, g = void 0;
        try {
            for (var I, m = i[Symbol.iterator](); !(h = (I = m.next()).done); h = !0) !function() {
                var i = I.value, n = i.snapshot.product_id, h = e(i) < 0, q = !!y[n], g = !f[n], m = (!_[n] || _[n].stock <= 0) && o && c;
                h ? v.lessThanZero.push(i) : q ? d(i, y[n]) : g ? v.deleted.push(i) : m ? v.noStock.push(i) : r(i, f) && u(i, f) ? l.default.getProductQuantity(t, i.snapshot, a(i)) < e(i) && o && c ? v.overStock.push(i) : p && e(i) < s.default.getMoq(i.snapshot, i.snapshot.units.unit.findIndex(function(t) {
                    return t.unit_id == (i.specs_detail[0] || i.detail).quantity_unit_id;
                })) ? v.belowMoq.push(i) : (v.normal.push(i), y[n] = i) : v.unitModified.push(i);
            }();
        } catch (t) {
            q = !0, g = t;
        } finally {
            try {
                !h && m.return && m.return();
            } finally {
                if (q) throw g;
            }
        }
        return v;
    },
    addToCart: function(t, e, n, r) {
        getApp().commit("setCartMark", e), r && getApp().commit("setCartEditStatus", {
            edit: !0,
            order: r
        });
        var u = [];
        n || (u = u.concat(e.deleted).concat(e.noStock)), [ "unitModified", "overStock", "belowMoq", "normal" ].forEach(function(r) {
            var u = !0, c = !1, s = void 0;
            try {
                for (var p, f = e[r][Symbol.iterator](); !(u = (p = f.next()).done); u = !0) {
                    var _ = p.value, y = t.cloudstore.cachedProductDict[_.snapshot.product_id], v = y.units.unit, h = _.snapshot.units.unit, q = i(_);
                    if (n && (_.add_time = new Date().getTime().toString()), _.snapshot = y, "unitModified" === r) if (_.specs_detail.length > 0) {
                        var g = !0, I = !1, m = void 0;
                        try {
                            for (var x, S = _.specs_detail[Symbol.iterator](); !(g = (x = S.next()).done); g = !0) {
                                var P = x.value;
                                P.price = l.default.getPrice(t, y, y.units.default_unit_index), P.price_type = l.default.getPriceType(t, y, y.units.default_unit_index), 
                                P.price_unit_id = y.units.unit[y.units.default_unit_index].unit_id, P.quantity = P.quantity * o(t, v, y.units.default_unit_index, q.quantityId), 
                                P.quantity_unit_id = P.price_unit_id;
                            }
                        } catch (t) {
                            I = !0, m = t;
                        } finally {
                            try {
                                !g && S.return && S.return();
                            } finally {
                                if (I) throw m;
                            }
                        }
                    } else _.detail || (_.detail = {}), _.detail.price = l.default.getPrice(t, y, y.units.default_unit_index), 
                    _.detail.price_type = l.default.getPriceType(t, y, y.units.default_unit_index), 
                    _.detail.price_unit_id = y.units.unit[y.units.default_unit_index].unit_id, _.detail.quantity = _.detail.quantity * o(t, v, y.units.default_unit_index, q.quantityId), 
                    _.detail.quantity_unit_id = _.detail.price_unit_id; else {
                        var b = a(_);
                        if (_.specs_detail.length > 0) {
                            var w = !0, M = !1, k = void 0;
                            try {
                                for (var T, D = _.specs_detail[Symbol.iterator](); !(w = (T = D.next()).done); w = !0) {
                                    var C = T.value;
                                    C.price = l.default.getPrice(t, y, b), C.price_type = l.default.getPriceType(t, y, b), 
                                    q.quantityId !== q.priceId && (C.quantity = C.quantity * d(t, h, q.quantityId, q.priceId), 
                                    C.quantity_unit_id = q.priceId);
                                }
                            } catch (t) {
                                M = !0, k = t;
                            } finally {
                                try {
                                    !w && D.return && D.return();
                                } finally {
                                    if (M) throw k;
                                }
                            }
                        } else _.detail.price = l.default.getPrice(t, y, b), _.detail.price_type = l.default.getPriceType(t, y, b), 
                        q.quantityId !== q.priceId && (_.detail.quantity = _.detail.quantity * d(t, h, q.quantityId, q.priceId), 
                        _.detail.quantity_unit_id = q.priceId);
                    }
                }
            } catch (t) {
                c = !0, s = t;
            } finally {
                try {
                    !u && f.return && f.return();
                } finally {
                    if (c) throw s;
                }
            }
        }), u = u.concat(e.unitModified).concat(e.overStock).concat(e.belowMoq).concat(e.normal), 
        getApp().dispatch("addCartProduct", u.map(function(t) {
            return {
                product: t
            };
        }));
    }
};

exports.default = {
    getUnitId: i,
    getUnitName: function(t, i, e) {
        var n = !0, r = !1, u = void 0;
        try {
            for (var a, d = i.snapshot.units.unit[Symbol.iterator](); !(n = (a = d.next()).done); n = !0) {
                var o = a.value;
                if (o.unit_id === e) {
                    if (0 !== i.snapshot.units.unit.indexOf(o) || o.name) return o.name;
                    if (t.i18n.unitDict[parseInt(e)]) return t.i18n.unitDict[parseInt(e)].name;
                }
            }
        } catch (t) {
            r = !0, u = t;
        } finally {
            try {
                !n && d.return && d.return();
            } finally {
                if (r) throw u;
            }
        }
        return "";
    },
    getQuantity: e,
    getPrice: n,
    getSpecs: function(t) {
        var i = [], e = !0, n = !1, r = void 0;
        try {
            for (var u, a = t.specs.requirement[Symbol.iterator](); !(e = (u = a.next()).done); e = !0) {
                var d = u.value;
                i.push(d.value_name);
            }
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !e && a.return && a.return();
            } finally {
                if (n) throw r;
            }
        }
        return i.join(" ");
    },
    reOrder: p,
    getDiscountCoupon: function(t, i) {
        var e = void 0, n = void 0;
        if (i) if (t.specs_detail[0]) {
            var r = t.specs_detail[0];
            r.discount < 100 && (e = r.discount, n = r.price / r.discount * (100 - r.discount));
        } else {
            var u = t.detail;
            u && u.discount < 100 && (e = u.discount, n = u.price / u.discount * (100 - u.discount));
        }
        return {
            discount: e,
            coupon: n
        };
    }
};