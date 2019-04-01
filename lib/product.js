function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    var i = getApp().state, r = !!i.cart.productDict[t.product_id], u = (0, l.getPriceByPrecision)(i, f.default.getPrice(i, t, e)), a = r ? (0, 
    l.getQuantityByPrecision)(i, f.default.getQuantity(i, t)) : "";
    return p({}, t.kpv, {
        inCart: r,
        price: u,
        quantity: a,
        unitIndex: e,
        unitName: n(i, t, e),
        stock: (0, l.getQuantityByPrecision)(i, f.default.getProductQuantity(i, t, e)),
        highestPrice: (0, l.getPriceByPrecision)(i, f.default.getHighestPrice(i, t, e)),
        isLastPrice: t.kpv && t.kpv.lastPrice == u,
        hasMoq: c(t),
        moq: (0, l.getRoundUpQuantityByPrecision)({
            state: i,
            val: o(t, e)
        }),
        extra: {
            quantity: a
        }
    });
}

function i(t, e) {
    var i = {
        specificationtable_id: "0",
        requirements: {
            requirement: []
        }
    }, r = !0, n = !1, u = void 0;
    try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done); r = !0) {
            var o = a.value, s = o.product || o, d = t.productDict[s.product_id];
            d ? t.productList.splice(t.productList.indexOf(d), 1, s) : t.productList.push(s);
            var p = s.units.unit[0];
            p.name || (p.name = getApp().state.i18n.unitDict[p.unit_id].name), t.productDict[s.product_id] = s, 
            t.cachedProductDict[s.product_id] = s;
            var l = o.specificationtable || i;
            t.cachedSpecificationtableDict[l.specificationtable_id] = l;
            var f = o.stock;
            f && (t.cachedStockDict[f.product_id] = f);
        }
    } catch (t) {
        n = !0, u = t;
    } finally {
        try {
            !r && c.return && c.return();
        } finally {
            if (n) throw u;
        }
    }
    return e;
}

function r(t, e) {
    var i = [];
    return e.attrs.attr.forEach(function(e, r) {
        2 !== r && void 0 !== t.cloudstore.attributeDict[e.attribute_id] && 0 != (131072 & parseInt(t.cloudstore.attributeDict[e.attribute_id].status)) && i.push(e.value);
    }), i.join(" ");
}

function n(t, e, i) {
    var r = e.units.unit[i];
    return 0 !== i || r.name ? r.name : t.i18n.unitDict[r.unit_id] ? t.i18n.unitDict[r.unit_id].name : "";
}

function u(t, e) {
    var i = e.units.unit;
    return i.length > 1 ? i.map(function(r, u) {
        if (0 !== u) {
            var a = (0, l.getQuantityByPrecision)(t, r.rate / i[u - 1].rate), c = (0, l.getQuantityByPrecision)(t, 1);
            return "" + a + (u - 1 == 0 ? n(t, e, 0) : i[u - 1].name) + "=" + c + r.name;
        }
    }).filter(function(t) {
        return t;
    }).join("，") : "";
}

function a(t) {
    return (t.specificationtable || {
        specificationtable_id: "0",
        requirements: {
            requirement: []
        }
    }).requirements.requirement.length > 0;
}

function c(t) {
    var e = t.units.unit[0].unit_id, i = t.order_quantity_threshold, r = i.quantity;
    return i.unit_id !== e || 1 !== r;
}

function o(t, e) {
    var i = t.order_quantity_threshold, r = t.units.unit.find(function(t) {
        return t.unit_id == i.unit_id;
    }) || t.units.unit[0], n = t.units.unit[e];
    return r.rate * i.quantity / n.rate;
}

function s(t) {
    var e = t.list, i = t.thumb, r = t.returnQuantity, n = t.hasDefault, u = t.useVideoDefaultPic;
    if (e && e.length > 0 && "" !== e[0]) {
        var a = r >= e.length || r < 0 || !r ? e.concat() : e.slice(0, r);
        return a = a.map(function(t) {
            return ~t.indexOf("http") ? t : "" + P.default.HTTP_IMAGE_PRODUCT + getApp().state.session.corporation.corporation_id + "/" + t;
        }), i ? a.map(function(t) {
            return ~t.indexOf(P.default.HTTP_IMAGE_PRODUCT) ? t + "_480" : t;
        }) : a;
    }
    return !1 !== n ? [ u ? P.default.VIDEO_DEFAULT : P.default.IMAGE_DEFAULT ] : [];
}

function d(t) {
    if (t) return ~t.indexOf("http") ? t : "" + P.default.HTTP_VIDEO_PRODUCT + getApp().state.session.corporation.corporation_id + "/" + t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var p = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
    }
    return t;
}, l = require("../utils/util"), f = t(require("cart")), g = t(require("./setting")), P = t(require("../config/config.js"));

exports.default = {
    imagesFormatter: s,
    videoFormatter: d,
    initViewStoreProductKpv: function(t, e) {
        return e.map(function(t) {
            var e = t.product, i = getApp().state, P = f.default.getUnitIndex(i, e), m = !!i.cart.productDict[e.product_id], h = (0, 
            l.getPriceByPrecision)(i, f.default.getPrice(i, e, P)), v = (0, l.getPriceByPrecision)(i, f.default.getLastPrice(i, e)), y = m ? (0, 
            l.getQuantityByPrecision)(i, f.default.getQuantity(i, e)) : "", _ = d(e.video);
            return e.kpv = p({}, e.kpv, {
                attrs: r(i, e),
                thumbnail: s({
                    list: e.images.image,
                    thumb: !0,
                    returnQuantity: 1
                }),
                thumbnailList: s({
                    list: e.images.image,
                    thumb: !0,
                    useVideoDefaultPic: !!_
                }),
                imgList: s({
                    list: e.images.image
                }),
                descriptionList: s({
                    list: e.images.description,
                    hasDefault: !1
                }),
                video: _,
                rateText: u(i, e),
                priceTax: i.cloudstore.corporation.setting.product_tax_rate,
                priceWithTax: g.default.hasTax(),
                lastPrice: v,
                hasMultipleSpecs: a(t),
                inCart: m,
                quantity: y,
                unitIndex: P,
                unitName: n(i, e, P),
                price: h,
                stock: (0, l.getQuantityByPrecision)(i, f.default.getProductQuantity(i, e, P)),
                highestPrice: (0, l.getPriceByPrecision)(i, f.default.getHighestPrice(i, e, P)),
                isLastPrice: v == h,
                hasMoq: c(e),
                moq: (0, l.getRoundUpQuantityByPrecision)({
                    state: i,
                    val: o(e, P)
                }),
                extra: {
                    quantity: y
                }
            }), t;
        });
    },
    updateProductRelated: i,
    updateProductKpv: function(t) {
        var r = t;
        return t && t.length && (r = t.map(function(t) {
            var i = getApp().state, r = f.default.getUnitIndex(i, t);
            return t.kpv = e(t, r), t;
        }), i(getApp().state.cloudstore, r)), r;
    },
    changeUnit: function(t, e) {
        (getApp().state.cloudstore.cachedProductProfile[t] || (getApp().state.cloudstore.cachedProductProfile[t] = {})).unitIndex = e;
    },
    getAttrs: r,
    getAttr: function(t, e) {
        if (void 0 !== t.cloudstore.attributeDict[e.attribute_id] && 0 != (131072 & parseInt(t.cloudstore.attributeDict[e.attribute_id].status))) return e.value;
    },
    getUnitName: n,
    getUnitsRateText: u,
    getValueNameFromRequirement: function(t, e) {
        var i = t.find(function(t) {
            return t.id === Number(e);
        });
        return i ? i.name : null;
    },
    checkMoq: c,
    getMoq: o,
    updateKpv: e,
    checkMultipleSpecs: a
};