function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, i = require("../../utils/util.js"), s = t(require("../../config/config")), c = t(require("../../intercept/watch")), n = t(require("../../lib/cart.service")), o = t(require("../../lib/placeOrder")), r = t(require("../../lib/placeOrderCommon")), l = void 0, u = a({
    data: Object.assign({
        quality_precision: "0"
    }, {
        modal: JSON.parse(JSON.stringify(o.default.MODAL))
    }),
    watch: {
        "modal.extra.unit_index": o.default.watchUnitIndex
    },
    onLoad: function() {
        l = new c.default(this), getApp().appShare = !1, this.setData({
            quality_precision: getApp().state.cloudstore.corporation.setting.product_quality_precision
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getData();
    },
    getData: function() {
        try {
            this.setData(a({}, n.default.initData(), n.default.getData(getApp().state), {
                modal: JSON.parse(JSON.stringify(o.default.MODAL))
            })), this.initTouchData(), getApp().dispatch("refreshTabbar", {
                index: 1
            });
        } catch (t) {
            console.error(t);
        }
    },
    clickConfirm: function() {
        this.data.isEdit ? this.deleteItem() : this.confirmCar();
    },
    deleteItem: function(t) {
        var e = t ? [ this.data.productList[getApp().touch.getItemIndex(t)] ] : n.default.getNeedDelList(this.data.productList);
        0 !== e.length && getApp().kpApi.showModal({
            content: "确认删除这" + e.length + "种货品吗？",
            success: this.confirmDeleteItemHandler(e)
        });
    },
    confirmDeleteItemHandler: function(t) {
        var e = this;
        return function(a) {
            a.confirm && n.default.dispatchItemDeleteMethod(t).then(function(t) {
                e.getData();
            });
        };
    },
    toggleEditStatus: function() {
        this.data.hasLeftSlidedItem && this.setData({
            hasLeftSlidedItem: !1
        });
        var t = !this.data.isEdit;
        t || this.setAllItemSelectStatus(!1), this.setData({
            isEdit: t
        });
    },
    toggleAllSelectStatus: function(t) {
        var e = t.detail;
        this.setAllItemSelectStatus(e.status);
    },
    setAllItemSelectStatus: function(t) {
        var e = n.default.setAllItemSelectStatus(this.data.productList, t), a = n.default.getNeedDelList(e), i = t;
        this.setData({
            productList: e,
            needDelList: a,
            isAllSelect: i
        });
    },
    clickProductItem: function(t) {
        var e = t.currentTarget, a = this.data, i = e.dataset.index, s = a.productList[i];
        if (!this.data.hasLeftSlidedItem) if (a.isEdit) {
            var c = !s.isSelect, o = n.default.setAnItemSelectStatus(a.productList, i, c), r = n.default.getNeedDelList(a.productList), l = n.default.getIsAllSelectStatus(a.productList, a.isAllSelect, c);
            this.setData({
                productList: o,
                needDelList: r,
                isAllSelect: l
            });
        } else n.default.goToItemDetailPage(s);
    },
    confirmCar: function() {
        var t = n.default.validate(getApp().state, this.data);
        (t.status || t.type) && ("UNIT_MODIFIED" === t.type ? getApp().kpApi.showModal({
            content: t.content,
            success: function(t) {
                t.confirm && getApp().kpApi.navigateTo(s.default.CAR_SUBMIT_ORDER);
            }
        }) : getApp().kpApi.navigateTo(s.default.CAR_SUBMIT_ORDER));
    },
    exitOrderEdit: function() {
        var t = this;
        getApp().dispatch("initCart").then(function(e) {
            t.getData();
        });
    },
    getWatch: function() {
        return l;
    }
}, r.default, {
    confirmBill: function() {
        var t = this;
        o.default.confirmBill.call(this).then(function(e) {
            e && (t.data.modal.product.kpv.hasMultipleSpecs && t.togglePlaceOrderModal(), t.getData());
        }).then(function() {
            t.getPlaceOrderProcesser().complete();
        }).catch(function() {
            t.getPlaceOrderProcesser().complete();
        });
    },
    removeBill: function() {
        var t = this;
        o.default.removeBill.call(this).then(function(e) {
            t.data.modal.product.kpv.hasMultipleSpecs && t.togglePlaceOrderModal(), t.getData();
        }).then(function() {
            t.getPlaceOrderProcesser().complete();
        }).catch(function() {
            t.getPlaceOrderProcesser().complete();
        });
    },
    touchStart: function(t) {
        this.data.isEdit || this.setData({
            productList: getApp().touch.touchStart(t)
        });
    },
    touchMove: function(t) {
        if (!this.data.isEdit) {
            var a = getApp().touch.touchMove(t);
            a && this.setData(e({}, "productList[" + getApp().touch.getItemIndex(t) + "]", a));
        }
    },
    touchEnd: function(t) {
        var a = this;
        if (!this.data.isEdit) {
            var i = getApp().touch.touchEnd(t);
            i.left ? this.setData({
                hasLeftSlidedItem: !0
            }) : setTimeout(function() {
                a.setData({
                    hasLeftSlidedItem: !1
                });
            }, 500), i && this.setData(e({}, "productList[" + getApp().touch.getItemIndex(t) + "]", i));
        }
    },
    initTouchData: function() {
        getApp().touch.initData({
            datalist: this.data.productList,
            operationWrapperWidth: 150
        });
    }
});

(0, i.combinePage)(u), Page(u);