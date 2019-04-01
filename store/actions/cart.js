Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
}, e = require("../../utils/util"), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../lib/order")), o = {
    status: "0",
    sequence: "0",
    corporation_id: "0",
    department_id: "0",
    type: "CLOUD_DRAFT",
    receivable: 0,
    received: 0,
    price: 0,
    quantity: 0,
    tax: 0,
    tax_rate: 0,
    cost: 0,
    remark: "",
    customer_id: "0",
    customer_name: "",
    orderDetail: {
        products: {
            product: []
        },
        address: null,
        sort_type: "ADD_TIME"
    }
}, i = {
    ready: !1,
    order: null,
    productList: [],
    productDict: {},
    markList: [],
    markDict: {}
}, a = {
    initLocalCart: function() {
        var t = getApp().getCorpObject(), e = t ? t.order : null;
        if (getApp().commit("initCart"), e) {
            var o = e.orderDetail && e.orderDetail.products && e.orderDetail.products.product ? e.orderDetail.products.product : [];
            if (!o.length) return;
            var i = o.map(function(t) {
                return t.snapshot.product_id;
            });
            getApp().dispatch("viewStoreProduct", {
                option: [ {
                    type: 3,
                    value: i.join(",")
                } ],
                replace: !0,
                limit: 200
            }).then(function(t) {
                var i = r.default.reOrder.validate(getApp().state, o);
                r.default.reOrder.addToCart(getApp().state, JSON.parse(JSON.stringify(i)), !1, 0 != e.order_id && e);
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    initCart: function(t) {
        return new Promise(function(e, r) {
            getApp().state.cart.order && getApp().dispatch("setRemoteCartProduct").then(function(r) {
                getApp().commit("initCart"), t || getApp().commit("setCartEditStatus"), e(i);
            }).catch(function(t) {
                console.log(t), r(t);
            });
        });
    },
    addCartProduct: function(t) {
        var e = t instanceof Array ? t.concat() : [ t ];
        return new Promise(function(t, r) {
            try {
                e.forEach(function(t) {
                    getApp().commit("addCartProduct", t), getApp().commit("setCartPrice"), getApp().commit("setCartQuantity");
                }), getApp().dispatch("setRemoteCartProduct", getApp().state.cart.order).then(function(e) {
                    t(i);
                }).catch(function(t) {
                    console.log(t);
                });
            } catch (t) {
                r(t);
            }
        });
    },
    delCartProduct: function(t) {
        var e = t instanceof Array ? t.concat() : [ t ];
        return new Promise(function(t, r) {
            try {
                e.forEach(function(t) {
                    getApp().commit("delCartProduct", t), getApp().commit("setCartPrice"), getApp().commit("setCartQuantity");
                }), getApp().dispatch("setRemoteCartProduct", getApp().state.cart.order).then(function(e) {
                    t(i);
                }).catch(function(t) {
                    console.log(t);
                });
            } catch (t) {
                r(t);
            }
        });
    },
    refreshTabbar: function(t) {
        if (t && 1 === t.index) {
            var e = getApp().state.cart.productList.length;
            e > 0 ? getApp().kpApi.kpCheckCanIuse("setTabBarBadge", {
                index: 1,
                text: "" + e
            }) : getApp().kpApi.kpCheckCanIuse("removeTabBarBadge", {
                index: 1
            });
        }
    },
    setRemoteCartProduct: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = getApp().getCorpObject(), i = "{}" === JSON.stringify(t({}, r));
        return new Promise(function(a, c) {
            console.log("set REMOTE CART PRODUCT");
            var n = Object.assign({}, getApp().state.cloudstore.storeProfile), p = void 0, d = getApp().kpApi.getStorageSync((0, 
            e.cartStorageKey)());
            if (d.editedOrder) {
                var s = JSON.parse(JSON.stringify(d.editedOrder)), u = JSON.parse(JSON.stringify(r));
                p = t({}, s, {
                    remark: i ? "" : u.remark,
                    price: i ? 0 : u.price,
                    quantity: i ? 0 : u.quantity,
                    orderDetail: t({}, s.orderDetail, {
                        products: i ? {
                            product: []
                        } : u.orderDetail.products
                    })
                });
            }
            o.order = p || (i ? null : r), n.corporationids.corporation = n.corporationids.corporation.map(function(t) {
                return t.encrypt_corporation_id === getApp().getCorpId() && (t = o), t;
            }), getApp().dispatch("setStoreProfile", {
                storeProfile: n,
                only_set_store_profile: !0,
                loading: !1
            }).then(function(t) {
                a(t);
            }).catch(function(t) {
                "100270120" !== t.code && getApp().kpApi.showModal({
                    content: "加购物车失败 " + t.code
                }), console.log("something happen!", t);
            });
        });
    }
};

exports.default = {
    order: o,
    state: i,
    actions: a
};