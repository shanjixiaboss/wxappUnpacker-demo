function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./placeOrder"));

exports.default = {
    addNullSpecsProductHandler: function(a) {
        var l = this.data.modal;
        a.detail.value = e.default.changeQuantityByJudgingMoq(a.detail.value, l), this.changeRequirementQuantity(a);
        var r = this.data.modal, n = this.data.productList.findIndex(function(t) {
            return t.product_id == r.product.product_id;
        });
        if (-1 !== n && this.setData(t({}, "productList[" + n + "].kpv.extra.quantity", r.extra.kpv_total_quantity)), 
        0 == r.extra.total_quantity) {
            if (!r.product.kpv.inCart) return e.default.updateCurrentProduct.call(this);
            this.removeBill();
        } else this.confirmBill();
    },
    stopPropagation: function(t) {},
    getPlaceOrderProcesser: function() {
        return getApp().placeOrderProcesser;
    },
    processPlaceOrder: function(t) {
        var a = t.currentTarget.dataset.id, l = function() {
            this.setData({
                modal: JSON.parse(JSON.stringify(e.default.MODAL))
            }), e.default.onLoad.call(this, t.currentTarget.dataset), e.default.onShow.call(this), 
            this.data.modal.product.kpv.hasMultipleSpecs ? this.togglePlaceOrderModal() : this.addNullSpecsProductHandler(t);
        }.bind(this);
        this.getPlaceOrderProcesser().add({
            fn: l,
            productId: a
        });
    },
    togglePlaceOrderModal: function() {
        e.default.togglePlaceOrderModal.call(this), this.data.modal.placeOrderModal || this.getPlaceOrderProcesser().complete();
    },
    toggleUnitModal: function() {
        e.default.toggleUnitModal.call(this);
    },
    toggleRemarkModal: function() {
        e.default.toggleRemarkModal.call(this);
    },
    bindTempRemarkInput: function(t) {
        e.default.bindTempRemarkInput.call(this, t);
    },
    bindRemarkInputStatus: function(t) {
        e.default.bindRemarkInputStatus.call(this, t);
    },
    changeUnit: function(t) {
        this.getWatch().setData({
            "modal.extra.unit_index": t.detail.index
        }), e.default.changeUnit.call(this, t);
    },
    changeUnitInModal: function(t) {
        this.getWatch().setData({
            "modal.extra.unit_index": t.detail.index
        }), e.default.changeUnit.call(this, t);
        var a = this.data.modal.extra.kpv_total_quantity;
        this.addNullSpecsProductHandler({
            detail: {
                value: a
            }
        });
    },
    changeRequirementQuantity: function(t) {
        e.default.changeRequirementQuantity.call(this, t);
    },
    changeRequirementValue2: function(t) {
        e.default.changeRequirementValue2.call(this, t);
    },
    changeRequirementValue3: function(t) {
        e.default.changeRequirementValue3.call(this, t);
    },
    confirmBill: function() {
        var t = this;
        e.default.confirmBill.call(this).then(function(a) {
            a && t.data.modal.product.kpv.hasMultipleSpecs && t.togglePlaceOrderModal(), e.default.updateCurrentProduct.call(t);
        }).then(function() {
            t.getPlaceOrderProcesser().complete();
        }).catch(function() {
            t.getPlaceOrderProcesser().complete();
        });
    },
    removeBill: function() {
        var t = this;
        e.default.removeBill.call(this).then(function(a) {
            t.data.modal.product.kpv.hasMultipleSpecs && t.togglePlaceOrderModal(), e.default.updateCurrentProduct.call(t);
        }).then(function() {
            t.getPlaceOrderProcesser().complete();
        }).catch(function() {
            t.getPlaceOrderProcesser().complete();
        });
    }
};