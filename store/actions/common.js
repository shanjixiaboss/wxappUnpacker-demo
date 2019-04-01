Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
    }
    return e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../config/config.js")), o = {
    URL: {},
    state: {},
    actions: {
        setKpAddress: function() {
            return new Promise(function(e, t) {
                try {
                    getApp().dispatch("getAddress", {
                        address: getApp().state.cloudstore.storeProfile.addresses.address[0]
                    }).then(function(t) {
                        getApp().commit("store_update_address", t), e();
                    });
                } catch (e) {
                    getApp().commit("store_update_address", ""), t();
                }
            });
        },
        getWxAddress: function() {
            function e(e) {
                e.setData({
                    "wxAddress.callback": "kp_chooseAddress"
                });
                var t = e.chooseAddress;
                e.kp_chooseAddress = function() {
                    getApp().kpApi.kpAuth("chooseAddress", {
                        success: function(o) {
                            console.log(o);
                            var s = {
                                city_name: o.cityName,
                                state_name: o.provinceName,
                                district_name: o.countyName,
                                country_id: "17230"
                            };
                            getApp().dispatch("getWxLocation", s).then(function(s) {
                                var n = {
                                    country: "17230",
                                    city: s.city.city_id,
                                    state: s.state.state_id,
                                    district: s.district.district_id,
                                    address: o.detailInfo,
                                    name: o.userName,
                                    phone: o.telNumber
                                }, c = JSON.parse(JSON.stringify(getApp().state.cloudstore.storeProfile));
                                c.addresses.address[0] = n, getApp().dispatch("setStoreProfile", {
                                    storeProfile: c
                                }).then(function(s) {
                                    t ? t(s, o) : e.onShow();
                                }).catch(function(e) {
                                    console.log("保存地址失败");
                                });
                            });
                        },
                        fail: function(e) {
                            console.log("----err", e);
                        }
                    });
                };
            }
            return new Promise(function(t, o) {
                var s = getCurrentPages()[getCurrentPages().length - 1];
                getApp().dispatch("checkInfoIsComplete").then(function(e) {
                    s.setData({
                        wxAddress: null
                    });
                }).catch(function(t) {
                    t && 8 == (8 & t) ? e(s) : s.setData({
                        wxAddress: null
                    });
                });
            });
        },
        getAddress: function(e) {
            var t = e.address, o = e.notAddress, s = e.defRetAddress, n = e.whiteSpace, c = void 0 === n ? "" : n;
            return new Promise(function(e, n) {
                var i = "";
                if (getApp().state.i18n.country_dict) {
                    console.log("----通过内存获取地址信息");
                    try {
                        var r = getApp().state.i18n.country_dict[t.state], p = r && r.city[t.city], a = p && p.district[t.district];
                        r && (i = r.name + c), p && (i += p.name + c), a && (i += a.name), o || (i += c + t.address), 
                        e(i);
                    } catch (e) {
                        n(i = "无地址信息");
                    }
                } else 0 == t.country && (t.country = "17230"), getApp().dispatch("getLocation", {
                    country_id: t.country,
                    state_id: t.state,
                    city_id: t.city,
                    district_id: t.district
                }).then(function(n) {
                    var r = "";
                    null !== n.state && (r += n.state.name + c), null !== n.city && (r += n.city.name + c), 
                    null !== n.district && (r += n.district.name), (i = o ? r : r + c + t.address) || (i = s || "无地址信息"), 
                    e(i);
                }, function(e) {
                    n(i = s || "读取地址信息失败");
                });
            });
        },
        selectAddress: function() {
            return new Promise(function(e, t) {
                getApp().kpApi.kpAuth("chooseAddress", {
                    success: function(e) {
                        console.log("success", JSON.stringify(e));
                    },
                    fail: function(e) {
                        console.log("fail", e);
                    },
                    complete: function(e) {
                        console.log("complete", e);
                    }
                });
            });
        },
        checkInfoIsComplete: function() {
            return new Promise(function(e, t) {
                if (getApp().isLogin()) {
                    var o = getApp().state.cloudstore.storeProfile, s = 0;
                    try {
                        o ? (o.name || (s += 2), o.addresses.address[0].address && Number(o.addresses.address[0].district) && o.addresses.address[0].phone && o.addresses.address[0].name || (s += 8), 
                        s - 0 == 0 ? e(s) : t(s)) : t(s);
                    } catch (e) {
                        t(s);
                    }
                } else t();
            });
        },
        switchEnviroment: function() {
            if (t.default.isProd) console.log("-----当前为线上版本, 不允许切换!"); else if (getApp().state.tab_click_count || (getApp().state.tab_click_count = 0), 
            8 == ++getApp().state.tab_click_count) {
                console.log("config.isDev()", t.default.isDev());
                var e = t.default.isDev();
                getApp().kpApi.setStorageSync("isDev", !e), getApp().kpApi.showToast({
                    icon: "none",
                    title: "Switch to " + (e ? "release" : "debugger"),
                    success: function() {
                        setTimeout(function() {
                            getApp().setCorpId(), getApp().state = {
                                session: {}
                            }, getApp().kpApi.removeStorageSync("cookie"), getApp().kpApi.removeStorageSync("account"), 
                            getApp().kpApi.reLaunch(t.default.ROUTE_PATH);
                        }, 2e3);
                    }
                });
            } else clearTimeout(getApp().state.tab_click_count_timer), getApp().state.tab_click_count_timer = setTimeout(function() {
                getApp().state.tab_click_count = 0, getApp().state.tab_click_count_timer = null;
            }, 1200);
        },
        phoneCall: function(e) {
            if (!e) {
                var t = getApp().use({
                    name: "cloudstore"
                });
                e = t.state.staff && t.state.staff.phone || t.state.corporation.setting.store_phone;
            }
            e ? getApp().kpApi.getSystemInfoSync().system.includes("iOS") ? getApp().kpApi.makePhoneCall({
                phoneNumber: e
            }) : getApp().kpApi.showModal({
                title: "",
                content: "拨打电话：" + e,
                success: function(t) {
                    t.confirm && getApp().kpApi.makePhoneCall({
                        phoneNumber: e
                    });
                }
            }) : getApp().kpApi.showModal({
                content: "号码无效, 播号失败",
                success: function(e) {}
            });
        },
        timerFunction: function() {
            var e = getApp();
            e.isLogin() ? (clearTimeout(e.appTimer), e.appTimer = setTimeout(function() {
                console.log("------开始定时刷新啦");
                var t = e.isCustomer() ? 1 : 0;
                Promise.all([ e.dispatch("timerEnterEvent", {
                    loading: !1
                }) ]).then(function(o) {
                    var s = o[0] && o[0].customer ? 1 : 0;
                    console.log("---------old, new ", t, s, s ^ t), s ^ t ? (console.log("------用户身份变化啦"), 
                    e.dispatch("session_userinfo_change")) : e.dispatch("timerFunction");
                }).catch(function(e) {
                    console.log("-------任务捕获异常", e);
                });
            }, t.default.TIMER_TIME)) : clearTimeout(e.appTimer);
        },
        commonException: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = {
                content: t.default.common.search_error,
                showCancel: !1,
                confirmText: t.default.order.enter_store,
                success: function() {
                    getApp().kpApi.reLaunch(t.default.ROUTE_PATH, {
                        id: getApp().getCorpId(),
                        staff_id: getApp().getCreatorId()
                    });
                }
            };
            getApp().kpApi.showModal(Object.assign({}, o, e));
        },
        scanOrder: function() {
            function e(e) {
                getApp().dispatch("viewStoreProduct", {
                    option: [ {
                        type: e.type || 0,
                        value: e.result
                    } ]
                }).then(function(o) {
                    o.product.length > 1 ? getApp().kpApi.navigateTo(t.default.PRODUCT_SEARCH, {
                        query: e.result
                    }) : 1 == o.product.length ? getApp().kpApi.navigateTo(t.default.CAR_PLACE_ORDER, {
                        id: o.product[0].product.product_id
                    }) : getApp().kpApi.showToast({
                        icon: "none",
                        title: t.default.product.search_error
                    });
                }).catch(function(e) {
                    console.log("err", e);
                });
            }
            return new Promise(function(t, o) {
                getApp().kpApi.scanCode({
                    success: function(t) {
                        if (console.log("扫描结果", t), !t.path && "QR_CODE" === t.scanType && /store\/h5\?/.test(t.result)) {
                            var o = decodeURIComponent(t.result.split("store/h5?").pop()), s = JSON.parse('{"' + o.replace(/=/g, '":"').replace(/&/g, '","') + '"}');
                            if (console.log("首页扫一扫 store/h5? query 参数解析结果", s), s.item_id) return e({
                                type: 3,
                                result: s.item_id
                            });
                        }
                        if (!t.path || "WX_CODE" !== t.scanType && "QR_CODE" !== t.scanType) t.result && e(t); else {
                            t.path.substr(0, t.path.indexOf("?"));
                            var n = decodeURIComponent(t.path.substr(t.path.indexOf("=") + 1));
                            getApp().dispatch("appDecodeCode", {
                                scene: n
                            }).then(function(t) {
                                t.type_value && t.type_value.length > 0 && (t.type_value.forEach(function(e) {
                                    "PRODUCT" != e.type && "ORDER" != e.type || (t.result = e.value, t.type = 3);
                                }), console.log("-----------", t), e(t));
                            });
                        }
                    }
                });
            });
        },
        commonLogin: function(o) {
            var s = e({}, o), n = s.obj, c = s.data, i = s.callback, r = getCurrentPages().length;
            getApp().event.removeAll("afterLoginListener"), getApp().event.listen("afterLoginListener", function() {
                getApp().kpApi.navigateBack({
                    delta: getCurrentPages().length - r
                }), console.log("-----登录成功后跳转目标地址"), i ? i.call(this, arguments) : getApp().kpApi.navigateTo(n, c);
            }), getApp().kpApi.navigateTo(t.default.LOGIN_PATH);
        }
    }
};

exports.default = o;