function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./placeOrder.service.js")), d = t(require("./product")), i = t(require("../config/config.js")), o = {
    product: null,
    specificationtable: null,
    stock: null,
    tempRemark: "",
    validationFailed: !1,
    selectedList: [],
    requirement3NeedBadgeList: [],
    requirement2NeedBadgeList: [],
    orderInDetail: !1,
    priceOn: !1,
    stockOn: !1,
    moqOn: !1,
    remarkModal: !1,
    placeOrderModal: !1,
    unitModal: !1,
    showStockStatus: !1,
    noStockNoOrder: !1,
    selectedListOn: !1,
    extra: {
        product: {
            snapshot: null,
            detail: null,
            specs_detail: [],
            mark: "NULL_ORDER_MARK",
            remark: "",
            add_time: ""
        },
        unit_index: 0,
        requirement_value: [ 0 ],
        requirement_quantity: [],
        requirement_stock: [],
        specsStockDict: {},
        failedSpecsDict: {},
        requirement_stock_failed: [],
        detail: {},
        total_quantity: 0,
        kpv_total_quantity: 0
    }
};

exports.default = {
    MODAL: o,
    onLoad: function(t) {
        this.setData({
            id: t.id
        });
    },
    onShow: function() {
        this.setData({
            modal: e.default.initPlaceOrderData(this.data, this.data.id)
        });
        var t = this.data.modal, a = t.orderInDetail, d = t.product;
        a && d.kpv.video && (this.videoContext = wx.createVideoContext("productVideo"), 
        d.kpv.thumbnailList[0] !== i.default.VIDEO_DEFAULT && d.kpv.thumbnailList.unshift(d.kpv.thumbnailList[0]), 
        this.setData({
            "modal.product.kpv.thumbnailList": d.kpv.thumbnailList
        })), this.bindTempRemarkInput(), this.data.modal.product.kpv.inCart && (this.setData({
            modal: e.default.loadQuantity(this.data.modal)
        }), this.changeRequirementQuantity());
    },
    watchUnitIndex: function(t, a) {
        d.default.changeUnit(this.data.modal.product.product_id, t), this.setData({
            "modal.product.kpv": d.default.updateKpv(this.data.modal.product, t)
        });
    },
    togglePlaceOrderModal: function() {
        this.setData({
            "modal.placeOrderModal": !this.data.modal.placeOrderModal
        });
    },
    toggleUnitModal: function() {
        this.setData({
            "modal.unitModal": !this.data.modal.unitModal
        });
    },
    toggleRemarkModal: function() {
        this.setData({
            "modal.remarkModal": !this.data.modal.remarkModal
        });
    },
    bindTempRemarkInput: function(t) {
        this.setData({
            "modal.tempRemark": t ? t.detail.value.slice(0, 1e3) : this.data.modal.extra.product.remark
        });
    },
    bindRemarkInputStatus: function(t) {
        var a = t.detail;
        "cancel" === a.type ? this.bindTempRemarkInput() : "confirm" === a.type && this.setData({
            "modal.extra.product.remark": this.data.modal.tempRemark
        }), this.toggleRemarkModal();
    },
    changeUnit: function() {
        this.data.modal = e.default.postProcess(this.data.modal), this.data.modal.selectedListOn && (this.data.modal.selectedList = e.default.getSelectedList(this.data.modal));
        var t = e.default.getCurrentStockList(this.data.modal);
        t && (this.data.modal.extra.requirement_stock = t.requirement_stock, this.data.modal.extra.requirement_stock_failed = t.requirement_stock_failed), 
        this.setData({
            modal: this.data.modal
        });
    },
    changeRequirementQuantity: function(t) {
        t && (this.data.modal.extra.requirement_quantity[t.detail.cid] = t.detail.value), 
        this.data.modal = e.default.saveQuantity(this.data.modal), this.data.modal = e.default.postProcess(this.data.modal), 
        this.data.modal = Object.assign(this.data.modal, e.default.setBadge(this.data.modal)), 
        this.data.modal.selectedListOn && (this.data.modal.selectedList = e.default.getSelectedList(this.data.modal)), 
        this.setData({
            modal: this.data.modal
        });
    },
    changeRequirementValue2: function(t) {
        this.data.modal.extra.requirement_value[1] = t.detail.id, this.data.modal = e.default.loadQuantity(this.data.modal);
        var a = e.default.getCurrentStockList(this.data.modal);
        this.data.modal.extra.requirement_stock = a.requirement_stock, this.data.modal.extra.requirement_stock_failed = a.requirement_stock_failed, 
        this.setData({
            modal: this.data.modal
        });
    },
    changeRequirementValue3: function(t) {
        this.data.modal.extra.requirement_value[2] = t.detail.id, this.data.modal = e.default.loadQuantity(this.data.modal);
        var a = e.default.getCurrentStockList(this.data.modal);
        this.data.modal.extra.requirement_stock = a.requirement_stock, this.data.modal.extra.requirement_stock_failed = a.requirement_stock_failed, 
        this.data.modal = Object.assign(this.data.modal, e.default.setBadge(this.data.modal)), 
        this.setData({
            modal: this.data.modal
        });
    },
    confirmBill: function() {
        var t = this, a = e.default.validate(this.data), d = a.status, i = a.data;
        return new Promise(function(a, o) {
            d ? (t.setData({
                "modal.validationFailed": !1
            }), getApp().dispatch("addCartProduct", {
                product: Object.assign(t.data.modal.extra.product, {
                    add_time: new Date().getTime().toString()
                })
            }).then(function(a) {
                e.default.successAddCartProductHandler(t.data);
            }).then(function(t) {
                getApp().dispatch("refreshTabbar", {
                    index: 1
                });
            }).then(function(t) {
                a(d);
            }).catch(function(t) {
                getApp().kpApi.showToast({
                    title: "加购物车失败"
                }), o(t);
            })) : (t.data.modal.noStockNoOrder && i && i.negativeStockDict && (t.data.modal.validationFailed = !0, 
            t.data.modal.extra.failedSpecsDict = Object.assign({}, i.negativeStockDict), t.data.modal.specificationtable.requirements.requirement.length > 0 && (t.data.modal.extra.requirement_stock_failed = e.default.getCurrentStockList(t.data.modal).requirement_stock_failed), 
            t.setData({
                modal: t.data.modal
            })), a(d));
        });
    },
    removeBill: function() {
        var t = this;
        return new Promise(function(a, e) {
            getApp().dispatch("delCartProduct", {
                product: {
                    snapshot: t.data.modal.product
                }
            }).then(function(e) {
                getApp().dispatch("refreshTabbar", {
                    index: 1
                }), (t.data.modal.orderInDetail || t.data.modal.product.kpv.hasMultipleSpecs) && getApp().kpApi.showToast({
                    image: "success",
                    title: "删除成功"
                }), a(e), t.data.modal.orderInDetail && setTimeout(function() {
                    getApp().kpApi.navigateBack();
                }, 1e3);
            }).catch(function(t) {
                console.log(t), e(t);
            });
        });
    },
    updateCurrentProduct: function() {
        var t = this.data.modal.product.product_id, e = this.data.productList.concat().findIndex(function(a) {
            return a.product_id == t;
        }), i = getApp().state.cloudstore.cachedProductDict[t];
        this.setData(a({}, "productList[" + e + "]", d.default.updateProductKpv([ i ])[0]));
    },
    generatePosterData: function(t) {
        var a = this.data.modal.product, e = a.name, d = a.kpv;
        if (!(t < 0 || t >= d.imgList.length)) {
            var o = t || 0, r = getApp().state.cloudstore.corporation.icon_url;
            return {
                corporationIcon: r ? i.default.HTTP_IMAGE_DEFAULT + r : "/assets/corp_avatar.png",
                corporationName: getApp().state.cloudstore.corporation.corp_name,
                productName: e + " " + d.attrs,
                price: d.price,
                unitName: d.unitName,
                image: d.imgList[o],
                qrcodeText: "长按识别小程序，马上下单！",
                imageIndex: o,
                isLastOne: o == d.imgList.length - 1,
                isFirstOne: 0 == o
            };
        }
    },
    changeQuantityByJudgingMoq: function(t, a) {
        return a.moqOn && a.product.kpv.hasMoq ? a.product.kpv.extra.quantity < a.product.kpv.moq ? (getApp().kpApi.showToast({
            icon: "none",
            title: "起订量" + a.product.kpv.moq + a.product.kpv.unitName
        }), +t < +a.product.kpv.extra.quantity ? 0 : +t < +a.product.kpv.moq ? +a.product.kpv.moq : t) : +t < +a.product.kpv.moq ? 0 : t : t;
    }
};