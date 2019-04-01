function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = Object.assign || function(t) {
    for (var r = 1; r < arguments.length; r++) {
        var e = arguments[r];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, e = require("../../utils/util"), o = t(require("../../lib/product.js")), i = (t(require("../../lib/cart.js")), 
t(require("../../lib/order.js")));

exports.default = {
    store_corporation: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return t.corporation = r.corporation, t;
    },
    store_view_product_key: function(t, r) {
        return t.productList = [], t.productDict = {}, t.viewStoreProductKey = r, t;
    },
    store_view_store_product: function(t, r) {
        var e = r.page, i = r.product;
        return void 0 !== e && (console.log("处理商品列表第 " + e + " 页"), getApp().productLinkedList.addPage(e, i), 
        i = getApp().productLinkedList.toList(), t.productDict = {}, t.productList = []), 
        i && i.length && (i = o.default.updateProductRelated(t, i), o.default.initViewStoreProductKpv(t, i)), 
        t;
    },
    store_product_base_data: function(t, r) {
        t.productBaseSyncIndex.ready = !0, t.attributeList = r.attribute;
        var e = !0, o = !1, i = void 0;
        try {
            for (var n, a = t.attributeList[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
                var u = n.value;
                t.attributeDict[u.attribute_id] = u;
            }
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !e && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        t.tagList = [];
        var s = !0, c = !1, d = void 0;
        try {
            for (var p, l = r.tag[Symbol.iterator](); !(s = (p = l.next()).done); s = !0) {
                var f = p.value;
                0 == (2 & f.status) && (t.tagList.push(f), t.tagDict[f.tag_id] = f);
            }
        } catch (t) {
            c = !0, d = t;
        } finally {
            try {
                !s && l.return && l.return();
            } finally {
                if (c) throw d;
            }
        }
        return t;
    },
    store_profile_base_data: function(t, e) {
        if (t.profileBaseSyncIndex.ready = !0, t.own = e.own || t.own, t.lastPrice = e.last_price || t.lastPrice, 
        t.storeProfile = e.store_profile, 0 == t.recentProductList.length && e.product) {
            var i = e.product;
            o.default.updateProductRelated(t, i), i = o.default.initViewStoreProductKpv(t, i), 
            getApp().commit("store_view_store_product", r({
                page: 0
            }, e));
        }
        return t.storeProfile.corporation_history = e.store_profile.corporationids.corporation.filter(function(t) {
            return !(2 & t.status);
        }).sort(function(t, r) {
            return +r.modify_time - +t.modify_time;
        }), t.storeProfile.corporation = e.store_profile.corporationids.corporation || t.storeProfile.corporation, 
        t;
    },
    store_update_address: function(t, r) {
        return t.storeProfile.kpAddress = r, t;
    },
    store_state_data: function(t, r) {
        return t.encrypt_corporation_id = r.corporation_id, t.encrypt_customer_id = r.customer_id, 
        t.corporation = r.corporation, t.customer = r.customer, t.staff = r.staff, t;
    },
    store_merge_finance_from_updated_list: function(t, r) {
        var e = r.updateds;
        if (e && e.length) {
            var o = t.financeList.concat(), i = !0, n = !1, a = void 0;
            try {
                for (var u, s = e[Symbol.iterator](); !(i = (u = s.next()).done); i = !0) {
                    var c = u.value, d = t.financeDict[c.finance_id];
                    d ? o.splice(o.indexOf(d), 1, c) : o.push(c), t.financeDict[c.finance_id] = c;
                }
            } catch (t) {
                n = !0, a = t;
            } finally {
                try {
                    !i && s.return && s.return();
                } finally {
                    if (n) throw a;
                }
            }
            t.financeList = o;
        }
        return t;
    },
    store_view_finance_key: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return t.financeList = [], t.financeDict = {}, t.viewStoreFinanceKey = r.key, t;
    },
    store_own_money: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return r.own && (t.ownmoney = r.own.amount), t;
    },
    store_view_store_order: function(t) {
        var r = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).order;
        if (r && r.length) {
            r = r.map(function(t) {
                return t.orderDetail.products.product = t.orderDetail.products.product.map(function(t) {
                    var r = (0, e.showPrice)(getApp().state.cloudstore.corporation.setting.store_flag, getApp().isCustomer()), n = i.default.getDiscountCoupon(t, r), a = n.discount, u = n.coupon;
                    return t.snapshot.kpv = {
                        attrs: o.default.getAttrs(getApp().state, t.snapshot),
                        thumbnail: o.default.imagesFormatter({
                            list: t.snapshot.images && t.snapshot.images.image || [],
                            returnQuantity: 1,
                            thumb: !0
                        }),
                        imgList: o.default.imagesFormatter({
                            list: t.snapshot.images && t.snapshot.images.image || []
                        }),
                        rateText: o.default.getUnitsRateText(getApp().state, t.snapshot),
                        priceTax: getApp().state.cloudstore.corporation.setting.product_tax_rate,
                        priceWithTax: 16 & getApp().state.cloudstore.corporation.setting.product_flag,
                        quantity: (0, e.getQuantityByPrecision)(getApp().state, i.default.getQuantity(t)),
                        price: (0, e.getPriceByPrecision)(getApp().state, i.default.getPrice(t)),
                        unit_name_quantity: i.default.getUnitName(getApp().state, t, i.default.getUnitId(t).quantityId),
                        unit_name_price: i.default.getUnitName(getApp().state, t, i.default.getUnitId(t).priceId),
                        discount: a,
                        coupon: u
                    }, t;
                }), t;
            });
            var n = t.orderList.concat(), a = !0, u = !1, s = void 0;
            try {
                for (var c, d = r[Symbol.iterator](); !(a = (c = d.next()).done); a = !0) {
                    var p = c.value, l = t.orderDict[p.order_id];
                    l ? n.splice(n.indexOf(l), 1, p) : n.push(p), t.orderDict[p.order_id] = p;
                }
            } catch (t) {
                u = !0, s = t;
            } finally {
                try {
                    !a && d.return && d.return();
                } finally {
                    if (u) throw s;
                }
            }
            t.orderList = n;
        }
        return t;
    },
    store_view_order_key: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return t.orderList = [], t.orderDict = {}, t.viewStoreOrderKey = r.key, t;
    },
    store_order_detail: function(t, r) {
        return !r || r && !r.order ? t.orderDetail = r : (getApp().commit("store_view_store_order", {
            order: [ r.order ]
        }), t.orderDetail = t.orderDict[r.order.order_id]), t;
    }
};