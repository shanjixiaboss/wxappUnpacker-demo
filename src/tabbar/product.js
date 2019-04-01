function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, a = require("../../utils/util.js"), i = t(require("../../config/config")), n = (t(require("../../lib/product")), 
t(require("../../intercept/watch"))), o = t(require("../../lib/product.service")), s = t(require("../../lib/placeOrder")), r = t(require("../../lib/placeOrderCommon")), c = void 0, l = 0, d = [], u = 0, p = e({
    data: Object.assign({
        blockStyle: !1,
        priceOn: !1,
        paginationOn: !1,
        showCompleteInfo: !1,
        activedTab: "all",
        quality_precision: "0",
        address: "",
        toolTip: null,
        hasNext: !0,
        lastPage: 1,
        loading: !1,
        tabDist: {},
        recentList: [],
        productList: [],
        pagination: 1,
        scrollTop: 0,
        showBrief: !0,
        outerScrollTop: 0,
        filter: {
            option: []
        },
        selectedTag: null,
        wHeight: getApp().kpApi.getSystemInfoSync().windowHeight,
        headerHeight: 0
    }, {
        modal: JSON.parse(JSON.stringify(s.default.MODAL))
    }),
    watch: {
        filter: function() {
            this.getData(!0);
        },
        "modal.extra.unit_index": function(t, e) {
            s.default.watchUnitIndex.call(this, t, e);
        }
    },
    onLoad: function() {
        var t = this;
        getApp().appShare = !1, c = new n.default(this), o.default.getLocation().then(function(e) {
            t.setData({
                address: e
            });
        }), this.setData(e({}, o.default.initStoreInform())), o.default.addDeviceStatistics(this), 
        this.getData(!0), this.setData({
            quality_precision: getApp().state.cloudstore.corporation.setting.product_quality_precision
        });
    },
    onReady: function() {
        var t = this;
        getApp().kpApi.setNavigationBarTitle({
            title: getApp().state.cloudstore.corporation.corp_name
        }), wx.createSelectorQuery().select(".kp-brief-header").boundingClientRect(function(e) {
            e && t.setData({
                headerHeight: e.height
            });
        }).exec(), getApp().dispatch("refreshTabbar", {
            index: 1
        });
    },
    onShow: function() {
        var t = this;
        getApp().dispatch("refreshTabbar", {
            index: 1
        }), getApp().dispatch("checkInfoIsComplete").then(function(e) {
            t.data.showCompleteInfo && t.setData({
                showCompleteInfo: !1
            });
        }).catch(function(e) {
            t.data.showCompleteInfo || t.setData({
                showCompleteInfo: !0
            });
        }), o.default.isFilterChanged(this.data) ? (this.setData({
            productList: [],
            pagination: 1,
            hasNext: !0
        }), this.getData(!0)) : this.setData({
            productList: this.getProductList(this.data)
        });
    },
    getData: function(t) {
        var e = this, a = u;
        if (d.forEach(function(t) {
            var e = getApp().requestTasks[t];
            e && e.abort();
        }), d.length = 0, this.setData({
            hasNext: !0,
            paginationOn: !1,
            loading: !0
        }), "bought" === this.data.activedTab) return this.getRecentBought();
        var i = "viewStoreProduct" + new Date().getTime();
        d.push(i), getApp().dispatch("viewStoreProduct", {
            requestTaskId: i,
            option: this.data.filter.option,
            replace: t,
            limit: 20,
            page: this.data.pagination,
            loading: !1
        }).then(function(t) {
            var i = t.product, n = t.hasNext;
            a === u && (l = 0, o.default.handleViewStoreProduct.call(e, {
                product: i,
                hasNext: n
            }));
        }).catch(function(i) {
            if ("request:fail abort" !== i.errMsg && a === u) {
                if (console.log("更新商品列表失败", i), (l += 1) <= 3) return e.getData(t);
                getApp().kpApi.showToast({
                    image: "alarm",
                    title: "加载失败"
                }), e.setData({
                    loading: !1,
                    hasNext: 0
                }), l = 0;
            }
        });
    },
    switchTab: (0, a.debounce)(function(t) {
        u += 1;
        var e = t.currentTarget.dataset.id;
        if (this.data.activedTab != e) {
            var a = this.data.tabDist[e], i = a.isClassifyMenu ? a : null, n = void 0;
            if (a.isClassifyMenu) {
                var o = void 0;
                switch (a.menuType) {
                  case "Text":
                    o = e;
                    break;

                  case "Array":
                    o = a.menuValue.map(function(t) {
                        return t.tag_id;
                    }).join(",");
                    break;

                  case "Object":
                    o = a.menuValue.descendantIds ? a.menuValue.descendantIds.join(",") : e;
                }
                n = {
                    option: [ {
                        type: 1,
                        value: o
                    } ]
                };
            } else n = "all" === e ? {
                option: []
            } : {
                option: [ {
                    type: 1,
                    value: e
                } ]
            };
            this.getWatch().setData({
                activedTab: e,
                productList: [],
                pagination: 1,
                paginationOn: !1,
                hasNext: !0,
                filter: n,
                selectedTag: i
            });
        }
    }, 200),
    getRecentBought: function() {
        var t = o.default.simplifyProductList(this.getProductList({
            pagination: 0
        }));
        this.setData({
            productList: t,
            paginationOn: !1,
            loading: !1,
            hasNext: 0
        });
    },
    handleTapClassifyMenu: function(t) {
        var e = t.detail.targetTag;
        console.log("菜单选择处理器", e);
        var a = void 0, i = {
            option: [ {
                type: 1,
                value: a = e.descendantIds ? e.descendantIds.join(",") : e.tag_id
            } ]
        };
        this.getWatch().setData({
            productList: [],
            pagination: 1,
            paginationOn: !1,
            hasNext: !0,
            filter: i
        });
    },
    toPrev: (0, a.debounce)(function() {
        o.default.toPrev.call(this);
    }, 200),
    toNext: (0, a.debounce)(function() {
        o.default.toNext.call(this);
    }, 200),
    getProductList: function(t) {
        return o.default.getProductList(t);
    },
    handleScroll: function(t) {
        var e = this.data, a = e.showBrief, i = e.headerHeight;
        if (a === t.detail.scrollTop > i) return this.setData({
            showBrief: !a,
            outerScrollTop: i
        });
    },
    handleScrollToLower: function(t) {
        !this.data.paginationOn && this.data.loading && this.getData(!1);
    },
    tapListItem: function(t) {
        var e = t.currentTarget;
        getApp().kpApi.navigateTo(i.default.CAR_PLACE_ORDER, {
            id: e.dataset.id
        });
    },
    handleUnitSelect: function(t) {
        this.setData({
            modal: JSON.parse(JSON.stringify(s.default.MODAL))
        }), s.default.onLoad.call(this, t.currentTarget.dataset), s.default.onShow.call(this), 
        this.toggleUnitModal();
    },
    phoneCall: function() {
        getApp().dispatch("phoneCall", this.data.phone);
    },
    navigateToPage: function(t) {
        var e = t.currentTarget.dataset.id;
        getApp().kpApi.navigateTo(i.default[e]);
    },
    toggleLayoutStyle: function() {
        this.setData({
            blockStyle: !this.data.blockStyle
        });
    },
    completeInfo: function() {
        getApp().kpApi.navigateTo(i.default.INTERCEPT_INFO, {
            scene: !0
        });
    },
    scanProduct: function() {
        getApp().dispatch("scanOrder");
    },
    showToolTip: function(t) {
        var e = t.currentTarget;
        this.setData(o.default.getToolTip(this.data, e));
    },
    closeTooltip: function() {
        this.setData(o.default.getToolTip(this.data));
    },
    tabIconPath: function(t) {
        var e = t.iconName;
        return this.data.activeTab === t.tag_id && (e += "-active"), "/assets/tabs/" + e + ".png";
    },
    openCorpIntro: function() {
        getApp().kpApi.navigateTo(i.default.CORPORATION_INTRO);
    },
    getWatch: function() {
        return c;
    }
}, r.default);

(0, a.combinePage)(p), Page(p);