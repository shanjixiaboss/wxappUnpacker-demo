Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = require("../../utils/util"), t = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("../actions/cart"));

exports.default = {
    initCart: function(r) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return r.order = JSON.parse(JSON.stringify(t.default.order)), r.productList = r.order.orderDetail.products.product, 
        r.productDict = {}, r.markList = [], r.markDict = {}, r;
    },
    setCartEditStatus: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = getApp().state.session.customer, d = o && o.customer_id, i = e.order || null, a = i && i.customer_id;
        return i && d === a ? (t.editedOrder = i, t.isOrderEdit = !0) : (t.editedOrder = null, 
        t.isOrderEdit = !1), getApp().kpApi.setStorageSync((0, r.cartStorageKey)(), {
            isOrderEdit: t.isOrderEdit,
            editedOrder: t.editedOrder
        }), t;
    },
    setCartMark: function(r, t) {
        return [ "deleted", "noStock", "unitModified", "overStock", "belowMoq" ].forEach(function(e) {
            var o = !0, d = !1, i = void 0;
            try {
                for (var a, u = t[e][Symbol.iterator](); !(o = (a = u.next()).done); o = !0) {
                    var c = a.value, n = {
                        product_id: c.snapshot.product_id
                    }, s = null;
                    switch (e) {
                      case "deleted":
                        s = {
                            type: "DELETED",
                            value: "已下架"
                        };
                        break;

                      case "noStock":
                        s = {
                            type: "NO_STOCK",
                            value: "已售罄"
                        };
                        break;

                      case "unitModified":
                        s = {
                            type: "UNIT_MODIFIED",
                            value: "有改动"
                        };
                        break;

                      case "overStock":
                        s = {
                            type: "OVER_STOCK",
                            value: "库存不足"
                        };
                        break;

                      case "belowMoq":
                        s = {
                            type: "BELOW_MOQ",
                            value: "低于起订量"
                        };
                    }
                    Object.assign(n, s), r.markList.push(n), r.markDict[c.snapshot.product_id] = n;
                }
            } catch (r) {
                d = !0, i = r;
            } finally {
                try {
                    !o && u.return && u.return();
                } finally {
                    if (d) throw i;
                }
            }
        }), r;
    },
    delCartMark: function(r, t) {
        var e = r.markList.findIndex(function(r) {
            return r.product_id === t.product_id;
        });
        return r.markList.splice(e, 1), delete r.markDict[t.product_id], r;
    },
    addCartProduct: function(r, t) {
        var e = r.productDict[t.product.snapshot.product_id];
        return e ? r.order.orderDetail.products.product.splice(r.order.orderDetail.products.product.indexOf(e), 1, t.product) : r.order.orderDetail.products.product.push(t.product), 
        r.productDict[t.product.snapshot.product_id] = t.product, r;
    },
    delCartProduct: function(r, t) {
        var e = r.productDict[t.product.snapshot.product_id];
        return e && (r.order.orderDetail.products.product.splice(r.order.orderDetail.products.product.indexOf(e), 1), 
        delete r.productDict[t.product.snapshot.product_id]), r;
    },
    setCartProfile: function(r, t) {
        r.order.corporation_id = t.corporation_id, r.order.customer_id = t.customer_id, 
        r.order.customer_name = t.customer_name, r.order.orderDetail.address = t.address, 
        r.order.remark = t.remark, r.order.creator_id = t.creator_id, r.order.handler_id = t.creator_id, 
        r.order.type = t.type;
        var e = {
            corporation_id: t.corporation_id,
            operator_id: t.customer_id,
            operator_name: t.customer_name,
            operation_time: new Date().getTime(),
            operation_type: 10
        };
        return r.order.orderDetail.operations ? r.order.orderDetail.operations.operation.push(e) : r.order.orderDetail.operations = {
            operation: [ e ]
        }, r;
    },
    setCartPrice: function(r) {
        var t = 0, e = !0, o = !1, d = void 0;
        try {
            for (var i, a = r.productList[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
                var u = i.value;
                if (u.specs_detail && u.specs_detail.length > 0) {
                    var c = !0, n = !1, s = void 0;
                    try {
                        for (var p, l = u.specs_detail[Symbol.iterator](); !(c = (p = l.next()).done); c = !0) {
                            var f = p.value;
                            t += f.quantity * f.price;
                        }
                    } catch (r) {
                        n = !0, s = r;
                    } finally {
                        try {
                            !c && l.return && l.return();
                        } finally {
                            if (n) throw s;
                        }
                    }
                } else if (u.detail) {
                    var _ = u.detail;
                    t += _.quantity * _.price;
                }
            }
        } catch (r) {
            o = !0, d = r;
        } finally {
            try {
                !e && a.return && a.return();
            } finally {
                if (o) throw d;
            }
        }
        return r.order.price = t, r;
    },
    setCartQuantity: function(r) {
        var t = 0, e = !0, o = !1, d = void 0;
        try {
            for (var i, a = r.productList[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
                var u = i.value;
                if (u.specs_detail && u.specs_detail.length > 0) {
                    var c = !0, n = !1, s = void 0;
                    try {
                        for (var p, l = u.specs_detail[Symbol.iterator](); !(c = (p = l.next()).done); c = !0) t += p.value.quantity;
                    } catch (r) {
                        n = !0, s = r;
                    } finally {
                        try {
                            !c && l.return && l.return();
                        } finally {
                            if (n) throw s;
                        }
                    }
                } else u.detail && (t += u.detail.quantity);
            }
        } catch (r) {
            o = !0, d = r;
        } finally {
            try {
                !e && a.return && a.return();
            } finally {
                if (o) throw d;
            }
        }
        return r.order.quantity = t, r;
    }
};