function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    var t = s.default.tagFormatter(getApp().state.cloudstore.tagList), e = t.tree, a = [];
    t.defaultTag.forEach(function(t) {
        var e = t.tag_id;
        switch (t.type) {
          case "NEW":
            a.push({
                name: "新品",
                tag_id: e
            });
            break;

          case "HOT":
            a.push({
                name: "爆品",
                tag_id: e
            });
            break;

          case "PROMOTION":
            a.push({
                name: "促销",
                tag_id: e
            });
        }
    });
    var i = {
        all: {
            name: "全部",
            noResultText: "暂无货品上架",
            tag_id: "all",
            iconName: "all",
            isClassifyMenu: !1
        }
    };
    return getApp().isCustomer() && (i.bought = {
        name: "买过",
        noResultText: "最近没有购买过哟～",
        tag_id: "bought",
        iconName: "bought",
        isClassifyMenu: !0,
        menuType: "Text",
        menuValue: "最近30天买过的货"
    }), i.recommend = {
        name: "推荐",
        noResultText: "暂无该分类货品",
        tag_id: "recommend",
        iconName: "recommend",
        isClassifyMenu: !0,
        menuType: "Array",
        menuValue: a
    }, e.forEach(function(t) {
        i[t.tag_id] = {
            name: t.name,
            noResultText: "暂无货品",
            tag_id: t.tag_id,
            isClassifyMenu: !0,
            menuType: "Object",
            menuValue: t
        };
    }), i;
}

function a(t, e) {
    var a = p.lastPageNum() > 1;
    return t >= c.default.LIMIT && e || a && !e;
}

function i(t) {
    var e = t.list, a = t.offset, i = t.key, n = void 0 === i ? "productList" : i, o = {};
    for (var r in e) o[n + "[" + (a + +r) + "]"] = e[r];
    return o;
}

function n(t) {
    return t.map(function(t) {
        return {
            name: t.name,
            product_id: t.product_id,
            units: t.units,
            kpv: t.kpv
        };
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, r = t(require("./product")), s = t(require("./tag")), u = t(require("./setting")), c = t(require("../config/config")), p = getApp().productLinkedList;

exports.default = {
    initStoreInform: function() {
        var t = getApp().state.cloudstore, a = getApp().state.session, i = t.corporation.setting, n = i.store_notice.replace(/\s/g, " "), o = t.corporation.icon_url ? c.default.HTTP_IMAGE_DEFAULT + t.corporation.icon_url : "/assets/corp_avatar.png", r = t.staff && t.staff.phone || a.creatorStaff && a.creatorStaff.phone || i.store_phone, s = function() {
            var e = t.staff && t.staff.name || a.creatorStaff && a.creatorStaff.name || i.store_contact_person;
            return e ? "( " + e + " )" : "";
        }();
        return {
            tabDist: e(),
            priceOn: u.default.priceOn(),
            recentList: t.recentProductList,
            notice: n,
            avatar: o,
            phone: r,
            staffName: s
        };
    },
    getProductList: function(t) {
        var e = t.pagination, a = t.offset, i = getApp().productLinkedList.getPage(e).slice(a).map(function(t) {
            return t.product;
        });
        return i.length && (i = r.default.updateProductKpv(i)), i;
    },
    toPrev: function() {
        var t = this.data.pagination;
        if (!(t <= 1)) {
            this.setData({
                scrollTop: 0
            }), t -= 1;
            var e = n(this.getProductList({
                pagination: t,
                offset: 0
            }));
            if (e.length) {
                var a = i({
                    offset: 0,
                    list: e,
                    key: "productList"
                });
                this.setData(o({
                    pagination: t,
                    paginationOn: !0,
                    loading: !1
                }, a));
            } else this.setData({
                pagination: t,
                paginationOn: !1,
                loading: !0,
                productList: []
            }), this.getData(!1);
        }
    },
    toNext: function() {
        var t = this.data, e = t.pagination, a = (t.hasNext, t.lastPage);
        if (this.data.hasNext || e !== a) {
            this.setData({
                scrollTop: 0
            }), (e += 1) > a && (a = e);
            var i = n(this.getProductList({
                pagination: e,
                offset: 0
            }));
            i.length ? this.setData({
                pagination: e,
                lastPage: a,
                paginationOn: !0,
                loading: !1,
                productList: i
            }) : (this.setData({
                pagination: e,
                lastPage: a,
                paginationOn: !1,
                loading: !0,
                productList: []
            }), this.getData(!1));
        }
    },
    getToolTip: function(t, e) {
        if (!e) return {
            toolTip: null
        };
        var a = e.dataset.id;
        if (t[a]) {
            var i = "notice" === a ? "公告：" : "店铺地址：";
            return i = "" + i + t[a], {
                toolTip: {
                    key: a,
                    text: i
                }
            };
        }
    },
    isFilterChanged: function(t) {
        return JSON.stringify([ t.filter.min_ctime, t.filter.option ]) !== getApp().state.cloudstore.viewStoreProductKey;
    },
    getLocation: function() {
        return getApp().dispatch("getAddress", {
            address: o({}, getApp().state.cloudstore.corporation, {
                district: getApp().state.cloudstore.corporation.dist
            })
        }).then(function(t) {
            return t;
        }).catch(function(t) {
            return t;
        });
    },
    addDeviceStatistics: function(t) {
        getApp().kpApi.getSystemInfo({
            success: function(e) {
                t.setData({
                    session: getApp().state.session,
                    systemInfo: e
                });
            }
        });
    },
    sliceProductListData: i,
    simplifyProductList: n,
    handleViewStoreProduct: function(t) {
        var e = t.product, r = t.hasNext, s = this.data.productList.length, u = this.data.pagination, c = void 0, p = void 0;
        if (e.length) {
            var f = n(this.getProductList({
                offset: s,
                pagination: u
            })), d = a(f.length + s, 1 === r);
            p = i({
                offset: s,
                list: f,
                key: "productList"
            }), c = o({
                paginationOn: d,
                hasNext: 1 === r,
                loading: 1 === r
            }, p);
        } else c = {
            loading: !1,
            hasNext: !1,
            paginationOn: !1
        };
        this.setData(c);
    }
};