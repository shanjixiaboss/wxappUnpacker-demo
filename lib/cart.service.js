function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
}, r = require("../utils/util"), i = t(require("../config/config")), n = t(require("./cart")), a = (t(require("./specs")), 
t(require("./product")), t(require("./setting")));

exports.default = {
    initData: function() {
        return {
            isEdit: !1,
            isAllSelect: !1,
            priceOn: !1,
            productList: [],
            needDelList: [],
            totalPrice: 0,
            totalQuantity: 0,
            isOrderEdit: getApp().kpApi.getStorageSync((0, r.cartStorageKey)()).isOrderEdit || !1
        };
    },
    getData: function(t) {
        var i = t.cloudstore.corporation.setting, c = a.default.hasTax(), u = i.product_tax_rate / 100, o = c ? t.cart.order.price / (1 + u) * u : t.cart.order.price * u, s = i.store_order_price_threshold || 0, d = c ? s - t.cart.order.price : s - t.cart.order.price - o, p = d > 0 ? (0, 
        r.getPriceByPrecision)(t, d) : 0;
        return {
            priceTax: u,
            priceWithTax: c,
            productList: t.cart.productList.map(function(i) {
                var a = i.snapshot, c = t.cart.markDict[a.product_id];
                return Object.assign(a, {
                    isSelect: !1,
                    kpv: e({}, a.kpv, {
                        mark: c,
                        markValue: c ? c.value : "",
                        price: (0, r.getPriceByPrecision)(t, n.default.getPrice(t, a, n.default.getUnitIndex(t, a))),
                        remark: i.remark,
                        unitIndex: n.default.getUnitIndex(t, a),
                        unit: a.units.unit[n.default.getUnitIndex(t, a)].name,
                        quantity: (0, r.getQuantityByPrecision)(t, n.default.getQuantity(t, a)),
                        extra: {
                            quantity: (0, r.getQuantityByPrecision)(t, n.default.getQuantity(t, a))
                        }
                    })
                });
            }),
            needOrderPrice: p,
            totalPriceTax: (0, r.getPriceByPrecision)(t, o),
            totalQuantity: (0, r.getQuantityByPrecision)(t, t.cart.order.quantity),
            totalPrice: c ? (0, r.getPriceByPrecision)(t, t.cart.order.price) : (0, r.getPriceByPrecision)(t, t.cart.order.price + o),
            store_order_price_threshold: (0, r.getPriceByPrecision)(t, s),
            priceOn: a.default.priceOn()
        };
    },
    getNeedDelList: function(t) {
        return t.filter(function(t) {
            return t.isSelect;
        });
    },
    setAllItemSelectStatus: function(t, e) {
        return t.map(function(t) {
            return t.isSelect = e, t;
        });
    },
    setAnItemSelectStatus: function(t, e, r) {
        return t.map(function(t, i) {
            return t.isSelect = i == e ? r : t.isSelect, t;
        });
    },
    dispatchItemDeleteMethod: function(t) {
        var e = t.map(function(t) {
            return {
                product: {
                    snapshot: t
                }
            };
        });
        return getApp().dispatch("delCartProduct", e);
    },
    getIsAllSelectStatus: function(t, e, r) {
        return !(e && !r) && (r ? !t.find(function(t) {
            return !t.isSelect;
        }) : e);
    },
    goToItemDetailPage: function(t) {
        var e = t.kpv.mark;
        (!e || "DELETED" !== e.type && "NO_STOCK" !== e.type) && getApp().kpApi.navigateTo(i.default.CAR_PLACE_ORDER, {
            id: t.product_id
        });
    },
    validate: function(t, e) {
        if (e.needOrderPrice > 0) return {
            status: !1
        };
        var r = t.cart.markDict, i = null, n = !1, a = !1, c = !1, u = !1, o = !0, s = !1, d = void 0;
        try {
            for (var p, l = t.cart.productList[Symbol.iterator](); !(o = (p = l.next()).done); o = !0) {
                var f = p.value.snapshot.product_id;
                if (r[f]) {
                    var g = r[f].type;
                    if (!n && "OVER_STOCK" === g) {
                        i = "库存不足！请先修改数量", n = "OVER_STOCK" === g;
                        break;
                    }
                    if (!n && "BELOW_MOQ" === g) {
                        i = "低于起订量", n = "BELOW_MOQ" === g;
                        break;
                    }
                    if (!c && "DELETED" === g) {
                        i = "请删除下架商品", c = "DELETED" === g;
                        break;
                    }
                    if (!u && "NO_STOCK" === g) {
                        i = "请删除售罄商品", u = "NO_STOCK" === g;
                        break;
                    }
                    if (!a && "UNIT_MODIFIED" === g) {
                        i = "放弃检查改动过的货品，直接下单？", a = "UNIT_MODIFIED" === g;
                        break;
                    }
                }
            }
        } catch (t) {
            s = !0, d = t;
        } finally {
            try {
                !o && l.return && l.return();
            } finally {
                if (s) throw d;
            }
        }
        return n || c || u ? (getApp().kpApi.showModal({
            content: i,
            success: function() {}
        }), {
            status: !1
        }) : a ? {
            status: !1,
            type: "UNIT_MODIFIED",
            content: i
        } : {
            status: !0
        };
    }
};