Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../config/config.js"));

exports.default = {
    shareOrderDetail: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        getApp().dispatch("viewStoreOrderDetail", {
            order_id: e.item_id
        }).then(function(e) {
            getApp().kpApi.redirectTo(t.default.ORDER_DETAIL);
        }).catch(function(t) {
            getApp().dispatch("commonException");
        });
    },
    shareProductDetail: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        getApp().dispatch("viewStoreProduct", {
            option: [ {
                type: 3,
                value: e.item_id
            } ],
            replace: !0,
            limit: 1
        }).then(function(e) {
            if (0 == e.product.length) throw t.default.product.search_error;
            getApp().kpApi.redirectTo(t.default.CAR_PLACE_ORDER, {
                id: e.product[0].product.product_id
            });
        }).catch(function(t) {
            getApp().dispatch("commonException", {
                content: t
            });
        });
    },
    shareCorpIntro: function() {
        getApp().kpApi.redirectTo(t.default.CORPORATION_INTRO);
    }
};