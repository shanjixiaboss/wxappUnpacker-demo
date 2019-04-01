Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, t = require("../../utils/util"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../config/config")), o = {
    GET_STORE_PRODUCT_BASE: "/gw/cloudstorelogic/get_store_product_base",
    GET_STORE_PROFILE_BASE: "/gw/cloudstorelogic/get_store_profile_base",
    VIEW_STORE_PRODUCT: "/gw/cloudstorelogic/view_store_product",
    VIEW_STORE_FINANCE: "/gw/cloudstorelogic/view_store_finance",
    VIEW_STORE_ORDER: "/gw/cloudstorelogic/view_store_order",
    VIEW_STORE_ORDER_DETAIL: "/gw/cloudstorelogic/get_store_order",
    GET_STORE_OWN: "/gw/cloudstorelogic/get_store_own",
    SET_STORE_PROFILE: "/gw/cloudstorelogic/set_store_profile",
    ADD_STORE_ORDER_PROCESS: "/gw/cloudstorelogic/add_store_order_process_v2",
    SET_STORE_ORDER_PROCESS: "/gw/cloudstorelogic/set_store_order_process",
    GET_STORE_WXA_IMAGE: "/gw/cloudstorelogic/get_store_wxa_image",
    GET_STORE_WXA_IMAGE_URL: "/app/filestorage/wxstore_get_image_url"
}, i = {
    URL: o,
    state: {
        encrypt_corporation_id: "",
        corporation: null,
        customer: null,
        staff: null,
        isProductBaseLoading: !1,
        productBaseSyncInterval: .25,
        productBaseSyncIndex: {
            max_mtime: 0,
            ready: !1
        },
        attributeList: [],
        attributeDict: {},
        tagList: [],
        tagDict: {},
        viewStoreProductKey: "",
        productList: [],
        productDict: {},
        cachedSpecificationtableDict: {},
        cachedProductDict: {},
        cachedStockDict: {},
        cachedProductProfile: {},
        isProfileBaseLoading: !1,
        profileBaseSyncInterval: .25,
        profileBaseSyncIndex: {
            max_mtime: 0,
            ready: !1
        },
        recentProductList: [],
        recentProductDict: {},
        own: null,
        lastPrice: null,
        storeProfile: null,
        viewStoreOrderKey: "",
        orderList: [],
        orderDict: {},
        viewStoreFinanceKey: "",
        financeList: [],
        financeDict: {},
        ownmoney: null
    },
    actions: {
        reloadStoreProductBaseFromServer: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return new Promise(function(e, t) {
                getApp().request({
                    loading: !1,
                    url: o.GET_STORE_PRODUCT_BASE
                }).then(function(t) {
                    getApp().commit("store_product_base_data", t), e(t);
                }).catch(function(e) {
                    t(e);
                });
            });
        },
        reloadStoreProfileBaseFromServer: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(t, r) {
                getApp().request({
                    loading: e.loading,
                    url: o.GET_STORE_PROFILE_BASE,
                    data: {}
                }).then(function(e) {
                    getApp().commit("store_profile_base_data", e), getApp().dispatch("setKpAddress"), 
                    t(e);
                }).catch(function(e) {
                    r(e);
                });
            });
        },
        viewStoreProduct: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = JSON.stringify([ t.min_ctime, t.option ]), n = !0 === t.replace || i !== this.state.cloudstore.viewStoreProductKey;
            n && (getApp().commit("store_view_product_key", i), getApp().productLinkedList.reset());
            var c = t.page, a = 0;
            if (n) a = 0; else if (c) {
                var s = getApp().productLinkedList.getPage(c).length;
                a = c > 0 ? (c - 1) * r.default.LIMIT + s : s;
            } else a = this.state.cloudstore.productList.length;
            var d = {
                min_ctime: t.min_ctime || "0",
                max_ctime: t.max_ctime || new Date().getTime().toString(),
                option: t.option,
                offset: a,
                limit: t.limit || r.default.LIMIT
            };
            return new Promise(function(r, i) {
                getApp().request({
                    loading: t.loading,
                    requestTaskId: t.requestTaskId,
                    url: o.VIEW_STORE_PRODUCT,
                    data: d
                }).then(function(t) {
                    getApp().commit("store_view_store_product", e({
                        page: c
                    }, t)), r(t);
                }, function(e) {
                    i(e);
                });
            });
        },
        viewStoreOrder: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = getApp().state.cloudstore.orderList, r = {
                min_ctime: e.min_ctime || "0",
                max_ctime: e.max_ctime || new Date().getTime().toString(),
                option: e.option,
                offset: t.length || 0,
                limit: e.limit || 20
            };
            return new Promise(function(e, t) {
                getApp().request({
                    url: o.VIEW_STORE_ORDER,
                    data: r
                }).then(function(t) {
                    getApp().commit("store_view_store_order", t), e(t);
                }).catch(function(e) {
                    getApp().commit("store_view_order_key"), t(e);
                });
            });
        },
        viewStoreOrderDetail: function() {
            var e = {
                order_id: (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).order_id
            };
            return new Promise(function(t, r) {
                getApp().request({
                    url: o.VIEW_STORE_ORDER_DETAIL,
                    data: e
                }).then(function(e) {
                    e.order ? (getApp().commit("store_order_detail", e), t(e)) : r(err);
                }).catch(function(e) {
                    r(e);
                });
            });
        },
        viewStoreOwn: function() {
            var e = {
                customer_id: getApp().state.session.customer.customer_id
            };
            return new Promise(function(t, r) {
                getApp().request({
                    url: o.GET_STORE_OWN,
                    data: e
                }).then(function(e) {
                    getApp().commit("store_own_money", e), t(e);
                });
            });
        },
        viewStoreFinance: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = getApp().state.cloudstore.financeList, r = {
                min_ctime: e.min_ctime || "0",
                max_ctime: e.max_ctime || new Date().getTime().toString(),
                option: e.option,
                offset: t.length || 0,
                limit: e.limit || 20
            };
            return new Promise(function(e, t) {
                getApp().request({
                    url: o.VIEW_STORE_FINANCE,
                    data: r
                }).then(function(t) {
                    getApp().commit("store_merge_finance_from_updated_list", {
                        updateds: t.finance
                    }), e(t);
                });
            });
        },
        setStoreProfile: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
                store_profile: e.storeProfile,
                only_set_store_profile: !!e.only_set_store_profile && e.only_set_store_profile
            };
            return new Promise(function(r, i) {
                getApp().request({
                    url: o.SET_STORE_PROFILE,
                    data: t,
                    loading: e.loading
                }).then(function(e) {
                    getApp().commit("store_profile_base_data", e), getApp().dispatch("setKpAddress").then(function(t) {
                        r(e);
                    });
                }).catch(function(e) {
                    i(e);
                });
            });
        },
        addStoreOrder: function() {
            var e = JSON.parse(JSON.stringify(getApp().state.cart));
            e.order.sequence = Number(Date.now() + "" + Math.round(1e3 * Math.random()));
            var t = {
                order: e.order,
                order_detail: e.order.orderDetail
            };
            return delete t.order.orderDetail, new Promise(function(e, r) {
                getApp().request({
                    url: o.ADD_STORE_ORDER_PROCESS,
                    data: t
                }).then(function(t) {
                    getApp().commit("store_order_detail", t), e(t);
                }).catch(function(e) {
                    r(e);
                });
            });
        },
        setStoreOrder: function() {
            var r = getApp().kpApi.getStorageSync((0, t.cartStorageKey)()).editedOrder, i = JSON.parse(JSON.stringify(r)), n = JSON.parse(JSON.stringify(getApp().state.cart.order)), c = {
                order: e({}, i, {
                    remark: n.remark,
                    price: n.price,
                    quantity: n.quantity
                }),
                order_detail: e({}, i.orderDetail, {
                    products: n.orderDetail.products,
                    address: n.orderDetail.address
                })
            };
            return delete c.order.orderDetail, new Promise(function(e, t) {
                getApp().request({
                    url: o.SET_STORE_ORDER_PROCESS,
                    data: c
                }).then(function(t) {
                    getApp().commit("store_order_detail", t), e(t);
                }).catch(function(e) {
                    t(e);
                });
            });
        },
        autoFixProfile: function() {
            if (getApp().isLogin()) {
                var e = {};
                if (getApp().state.cloudstore.storeProfile.avatar || (e.avatar = getApp().state.session.wxInfo.userInfo.avatarUrl), 
                86 != getApp().state.cloudstore.storeProfile.phone_country && (e.phone_country = "86"), 
                Object.keys(e).length <= 0) return;
                var t = Object.assign({}, getApp().state.cloudstore.storeProfile, e);
                getApp().dispatch("setStoreProfile", {
                    storeProfile: t
                });
            }
        },
        getPosterBased: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(t, r) {
                getApp().request({
                    url: o.GET_STORE_WXA_IMAGE_URL,
                    data: {
                        type: e.type,
                        image: e.image,
                        value: [ getApp().getCorpId(), getApp().getCreatorId(), e.product_id || e.order_id ]
                    }
                }).then(function(e) {
                    t(e);
                }).catch(function(e) {
                    r(e);
                });
            });
        },
        getWXACode: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(t, i) {
                getApp().request({
                    url: o.GET_STORE_WXA_IMAGE,
                    data: {
                        appid: r.default.APP_MP_ID,
                        page: "src/tabbar/route",
                        type: 0,
                        value: [ getApp().getCorpId(), getApp().getCreatorId(), e.product_id || e.order_id ]
                    }
                }).then(function(e) {
                    t(e);
                }).catch(function(e) {
                    i(e);
                });
            });
        }
    }
};

exports.default = i;