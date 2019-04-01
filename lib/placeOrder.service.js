function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

function r(t) {
    var e = Object.assign({}, t), r = s.default.encode(a(e));
    e.extra.product.detail = null, e.extra.product.specs_detail = [], e.extra.total_quantity = 0;
    var i = Object.keys(e.extra.detail).map(function(t) {
        return e.extra.detail[t];
    }), n = !0, c = !1, d = void 0;
    try {
        for (var l, p = i[Symbol.iterator](); !(n = (l = p.next()).done); n = !0) {
            var f = l.value;
            Object.assign(f, {
                quantity_unit_id: e.product.units.unit[e.extra.unit_index].unit_id,
                price_unit_id: e.product.units.unit[e.extra.unit_index].unit_id,
                price_type: o.default.getPriceType(getApp().state, e.product, e.extra.unit_index),
                price: o.default.getPrice(getApp().state, e.product, e.extra.unit_index)
            }), r === s.default.encode(f.specs) ? e.extra.product.detail = f : e.extra.product.specs_detail.push(f), 
            e.extra.total_quantity += f.quantity;
        }
    } catch (t) {
        c = !0, d = t;
    } finally {
        try {
            !n && p.return && p.return();
        } finally {
            if (c) throw d;
        }
    }
    return e.extra.kpv_total_quantity = (0, u.getQuantityByPrecision)(getApp().state, e.extra.total_quantity), 
    console.log("postProcess, this.data.modal.extra:", e.extra), JSON.parse(JSON.stringify(e));
}

function a(t, e) {
    var r = Object.assign({}, t);
    if (null === r.product) return null;
    var a = r.specificationtable.requirements.requirement, i = null;
    return a.length > 0 && ((i = {
        requirement: []
    }).requirement = a.map(function(t, a) {
        return {
            requirement_id: t.requirement_id,
            requirement_name: t.requirement_name,
            value_id: 0 == a ? e : r.extra.requirement_value[a],
            value_name: 0 == a ? d.default.getValueNameFromRequirement(t.value, e) : d.default.getValueNameFromRequirement(t.value, r.extra.requirement_value[a])
        };
    })), console.log("makeSpecs return a specs, specs:", i), i;
}

function i(t) {
    var e = {};
    return t ? (t.department_stocks.department_stock.forEach(function(t) {
        t.specs_stock.forEach(function(t) {
            var r = s.default.encode(t.specs);
            e[r] ? e[r] += t.stock : e[r] = t.stock;
        });
    }), e) : e;
}

function n(t) {
    var e = Object.assign({}, t), r = e.product.units.unit[e.extra.unit_index].rate, a = e.specificationtable.requirements.requirement;
    if (a.length > 0) {
        var i = void 0, n = void 0;
        return n = a[0].value.map(function(t) {
            var a = {};
            a.requirement = e.extra.requirement_value.map(function(r, a) {
                return {
                    requirement_id: e.specificationtable.requirements.requirement[a].requirement_id,
                    value_id: 0 == a ? t.id : r
                };
            });
            var i = s.default.encode(a);
            return e.extra.specsStockDict[i] ? (0, u.getQuantityByPrecision)(getApp().state, e.extra.specsStockDict[i] / r) || 0 : 0;
        }), e.validationFailed && (i = a[0].value.map(function(t) {
            var a = {};
            a.requirement = e.extra.requirement_value.map(function(r, a) {
                return {
                    requirement_id: e.specificationtable.requirements.requirement[a].requirement_id,
                    value_id: 0 == a ? t.id : r
                };
            });
            var i = s.default.encode(a);
            return e.extra.failedSpecsDict[i] ? e.extra.specsStockDict[i] ? (0, u.getQuantityByPrecision)(getApp().state, e.extra.specsStockDict[i] / r) || 0 : 0 : null;
        })), {
            requirement_stock: n,
            requirement_stock_failed: i
        };
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = require("../utils/util"), c = t(require("../config/config")), o = t(require("./cart")), s = t(require("./specs")), d = t(require("./product"));

exports.default = {
    initPlaceOrderData: function(t, e) {
        console.warn("id", e);
        var r = getApp().state, a = Object.assign({}, t.modal);
        a.product = r.cloudstore.cachedProductDict[e], a.specificationtable = r.cloudstore.cachedSpecificationtableDict[a.product.specificationtable_id], 
        a.stock = r.cloudstore.cachedStockDict[a.product.product_id];
        var c = r.cart.productDict[e];
        if (c) if (a.extra.product = JSON.parse(JSON.stringify(c)), a.extra.product.specs_detail && a.extra.product.specs_detail.length > 0) {
            var o = !0, l = !1, p = void 0;
            try {
                for (var f, m = a.extra.product.specs_detail[Symbol.iterator](); !(o = (f = m.next()).done); o = !0) {
                    var v = f.value;
                    a.extra.detail[s.default.encode(v.specs)] = v;
                }
            } catch (t) {
                l = !0, p = t;
            } finally {
                try {
                    !o && m.return && m.return();
                } finally {
                    if (l) throw p;
                }
            }
        } else if (a.extra.product.detail) {
            var x = a.extra.product.detail;
            a.extra.detail[s.default.encode(x.specs)] = x;
        }
        a.extra.product.snapshot = a.product, a.extra.unit_index = a.product.kpv.unitIndex, 
        a.product.kpv = d.default.updateKpv(a.product, a.product.kpv.unitIndex);
        var g = a.specificationtable.requirements.requirement;
        a.selectedListOn = g.length > 1, 0 == g.length ? (a.extra.requirement_quantity.push(0), 
        a.extra.requirement_stock.push(a.stock ? a.stock.stock : 0)) : (a.extra.specsStockDict = i(a.stock), 
        g.forEach(function(t, e) {
            0 == e ? a.extra.requirement_quantity = t.value.map(function(t) {
                return 0;
            }) : a.extra.requirement_value[e] = t.value[0].id;
        }), a.extra.requirement_stock = n(a).requirement_stock);
        var _ = r.cloudstore.corporation.setting;
        return Object.assign(a, {
            stockOn: 4 & _.store_flag,
            noStockNoOrder: 8 & _.store_flag,
            showStockStatus: 32 & _.store_flag,
            priceOn: (0, u.showPrice)(_.store_flag, getApp().isCustomer()),
            moqOn: 512 & _.store_flag,
            quality_precision: _.product_quality_precision
        }), JSON.parse(JSON.stringify(a));
    },
    postProcess: r,
    makeSpecs: a,
    loadQuantity: function(t) {
        var e = Object.assign({}, t), i = e.specificationtable.requirements.requirement, n = e.extra.requirement_quantity;
        if (i.length > 0) i[0].value.forEach(function(t, r) {
            var i = s.default.encode(a(e, t.id));
            n[r] = e.extra.detail[i] && e.extra.detail[i].quantity || 0;
        }), n.every(function(t) {
            return 0 === t;
        }) && r(e); else {
            var u = s.default.encode(a(e));
            n[0] = e.extra.detail[u] && e.extra.detail[u].quantity || 0;
        }
        return console.log("loadQuantity, will change this.data.extra.requirement_quantity, this.data.modal: ", e), 
        JSON.parse(JSON.stringify(e));
    },
    saveQuantity: function(t) {
        var e = Object.assign({}, t);
        if (null === e.product) return JSON.parse(JSON.stringify(e));
        var r = e.specificationtable.requirements.requirement, i = e.extra.requirement_quantity;
        if (r.length > 0) r[0].value.forEach(function(t, r) {
            var n = a(e, t.id), u = s.default.encode(n), c = e.extra.detail[u] || {
                specs: n
            };
            0 === i[r] ? delete e.extra.detail[u] : (c.quantity = Number(i[r]), e.extra.detail[u] = c);
        }); else {
            var n = a(e), u = s.default.encode(n), c = e.extra.detail[u] || {};
            0 === i[0] ? delete e.extra.detail[u] : (c.quantity = Number(i[0]), e.extra.detail[u] = c);
        }
        return console.log("saveQuantity, change this.data.extra.detail[id], this.data.extra: ", t.extra), 
        JSON.parse(JSON.stringify(e));
    },
    setBadge: function(t) {
        var r = Object.assign({}, t), a = r.specificationtable.requirements.requirement;
        if (!(a.length <= 1)) {
            var i = Object.keys(r.extra.detail), n = [], u = [];
            return a.length > 2 && (n = [].concat(e(new Set(i.map(function(t) {
                return +t.split(",")[3].slice(t.split(",")[3].indexOf(":") + 1);
            }))))), u = [].concat(e(new Set(i.map(function(t) {
                var e = t.split(",");
                return a.length > 2 ? e[3].slice(e[3].indexOf(":") + 1) == r.extra.requirement_value[2] ? +e[2].slice(e[2].indexOf(":") + 1) : void 0 : +e[2].slice(e[2].indexOf(":") + 1);
            }).filter(function(t) {
                return t;
            })))), {
                requirement3NeedBadgeList: n,
                requirement2NeedBadgeList: u
            };
        }
    },
    getCurrentStockList: n,
    getSelectedList: function(t) {
        var e = Object.assign({}, t), r = {}, a = e.product.kpv.unitName;
        return Object.keys(e.extra.detail).forEach(function(t) {
            var a = (t.split(",")[3] && t.split(",")[3].split(":")[1]) + "," + t.split(",")[2].split(":")[1];
            (r[a] = r[a] || []).push(e.extra.detail[t]);
        }), Object.keys(r).map(function(t) {
            var e = r[t], i = e[0].specs.requirement[1].value_name;
            return ((e[0].specs.requirement[2] ? e[0].specs.requirement[2].value_name : "") + " " + i + ": " + e.map(function(t) {
                return t.specs.requirement[0].value_name + "/" + t.quantity + a;
            }).join("，")).trim();
        });
    },
    validate: function(t) {
        var e = Object.assign({}, t.modal), r = getApp().state.cart.productList.length, a = e.moqOn && e.product.kpv.hasMoq ? e.extra.total_quantity < e.product.kpv.moq : e.extra.total_quantity <= 0, i = !getApp().isLogin(), n = function() {
            if (e.noStockNoOrder) {
                var t = {};
                return Object.keys(e.extra.detail).forEach(function(r) {
                    if (e.extra.product.specs_detail.length > 0) {
                        var a = e.extra.specsStockDict[r] || 0, i = e.product.units.unit.find(function(t) {
                            return t.unit_id == e.extra.detail[r].quantity_unit_id;
                        }).rate;
                        e.extra.detail[r].quantity * i > a && (t[r] = e.extra.detail[r]);
                    } else e.extra.product.detail && e.extra.detail[r].quantity > e.product.kpv.stock && (t[r] = e.extra.detail[r]);
                }), t;
            }
            return {};
        }(), u = e.extra.product.specs_detail.length > 100, o = r > 200 || 200 === r && !e.product.kpv.inCart, s = void 0, d = "", l = null;
        if (a) d = "低于起订量，无法下单"; else if (i) {
            var p = this;
            d = "无法下单，请先登录", l = function(e) {
                e.confirm && getApp().dispatch("commonLogin", {
                    callback: function() {
                        getApp().dispatch("viewStoreProduct", {
                            option: [ {
                                type: 3,
                                value: t.id
                            } ]
                        }).then(function(t) {
                            p.onShow();
                        }).catch(function(t) {
                            getApp().kpApi.reLaunch(c.default.INDEX_PATH);
                        });
                    }
                });
            };
        } else if (Object.keys(n).length > 0) d = "库存不足", s = {
            negativeStockDict: n
        }; else if (u) d = "最多支持100种规格同时下单，当前规格数：" + e.extra.product.specs_detail.length; else {
            if (!o) return {
                status: !0
            };
            d = "购物车已满";
        }
        return getApp().kpApi.showModal({
            confirmText: "确定",
            content: d,
            success: l || function() {}
        }), {
            status: !1,
            data: s
        };
    },
    successAddCartProductHandler: function(t) {
        var e = t.id, r = Object.assign({}, t.modal), a = getApp().state.cart.markDict[e] && "OVER_STOCK" === getApp().state.cart.markDict[e].type, i = getApp().state.cart.markDict[e] && "UNIT_MODIFIED" === getApp().state.cart.markDict[e].type, n = getApp().state.cart.markDict[e] && "BELOW_MOQ" === getApp().state.cart.markDict[e].type;
        (r.orderInDetail || r.product.kpv.hasMultipleSpecs) && getApp().kpApi.showToast({
            duration: 1e3,
            title: r.product.kpv.inCart ? "修改成功" : "加入成功"
        }), (a || i || n) && getApp().commit("delCartMark", {
            product_id: e
        }), r.orderInDetail && setTimeout(function() {
            getApp().kpApi.navigateBack();
        }, 1e3);
    }
};