function e(e) {
    var t = getApp().kpApi.getStorageSync("cookie") || {}, n = o.default.APP_CODE;
    if (e) if (e.token) {
        var c = new Date(Date.now() + p);
        t["account_id_" + n] = e.account.account_id, t["big_token_" + n] = e.big_token, 
        t["token_" + n] = e.token, t["expires_time_" + n] = c, wx.setStorageSync("account", e);
    } else t["corporation_id_" + n] = e.corporation_id, t["staff_id_" + n] = e.customer_id; else delete t["account_id_" + n], 
    delete t["staff_id_" + n], delete t["token_" + n], delete t["big_token_" + n], delete t["expires_time_" + n], 
    wx.setStorageSync("account", e);
    wx.setStorageSync("cookie", t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../config/config")), n = {
    GET_STORE_CORPORATION: "/gw/cloudstorelogic/get_store_corporation",
    ENTER_STORE: "/gw/cloudstorelogic/enter_store",
    APP_LOGIN: "/gw/accountlogic/login_cloud_store",
    SEND_MESSAGE: "/gw/smslogic/send_message",
    SEND_EMAIL: "/gw/smslogic/send_email",
    WX_CONNECT: "/gw/accountlogic/connect_wechat",
    WX_DISCONNECT: "/gw/accountlogic/disconnect_wechat",
    APP_LOGOUT: "/gw/accountlogic/logout",
    APP_UPDATE_ACCOUNT: "/gw/accountlogic/update_account",
    APP_DECODE_SCENE: "/gw/cloudstorelogic/decode_scene",
    APP_DECODE_QRCODE: "/gw/cloudstorelogic/get_store_qrcode",
    APP_GET_PHONE_NUMBER: "/gw/cloudstorelogic/decode_scene",
    GET_STORE_STAFF: "/gw/corporationlogic/get_staff"
}, p = 24e4, c = {
    URL: n,
    state: {
        account: null,
        app_type: 0,
        authority: {},
        big_token: "",
        corporation: {},
        corporation_id: "",
        creatorStaff: null,
        customer: null,
        department: {},
        grpc: {},
        header: null,
        language_id: "zh_cn",
        port: {},
        staff: {},
        timeout: !1,
        token: "",
        userInfo: null,
        wxInfo: null
    },
    actions: {
        getWXCode: function() {
            return new Promise(function(e, t) {
                getApp().kpApi.login({
                    success: function(o) {
                        getApp().kpApi.kpAuth("getUserInfo", {
                            withCredentials: !0,
                            success: function(t) {
                                t.code = o.code, getApp().commit("session_wx_info", t), e(t);
                            },
                            fail: function(e) {
                                t(e);
                            }
                        }, !0);
                    },
                    fail: function(e) {
                        console.log("----微信服务器挂啦", e), t(e);
                    }
                });
            });
        },
        wxSsoLogin: function() {
            return new Promise(function(t, p) {
                var c = getApp().state.session.wxInfo, i = {
                    code: c.code,
                    iv: c.iv,
                    encryptedData: c.encryptedData
                }, r = {
                    type: o.default.APP_LOGIN_TYPE,
                    account: o.default.APP_MP_ID,
                    passport: JSON.stringify(i),
                    appid: o.default.APP_MP_ID,
                    code: JSON.stringify(i)
                };
                getApp().request({
                    loading: !1,
                    url: n.APP_LOGIN,
                    data: r
                }).then(function(o) {
                    e(o), getApp().commit("session_app_login", o), t(o);
                }).catch(function(e) {
                    p(e);
                });
            });
        },
        appLogin: function(t) {
            var p = {
                type: 4,
                account: t.account,
                passport: t.pwd
            };
            return -1 !== t.account.indexOf("@") && (p.type = 3), new Promise(function(t, c) {
                getApp().request({
                    url: n.APP_LOGIN,
                    data: p
                }).then(function(o) {
                    e(o), getApp().commit("session_app_login", o), getApp().dispatch("appConnectWx").then(function(e) {
                        t(e);
                    }, function(e) {
                        t(o);
                    });
                }).catch(function(e) {
                    getApp().kpApi.showToast({
                        title: o.default.ERROR_CODE[e.code] || "登录失败" + (e.code || ""),
                        icon: "none"
                    });
                });
            });
        },
        appLogout: function() {
            getApp().commit("session_account"), getApp().createStore(), clearTimeout(getApp().appTimer), 
            e(), getApp().kpApi.reLaunch(o.default.LOGIN_PATH), getApp().kpApi.showToast({
                title: "登出成功",
                icon: "none"
            });
        },
        appConnectWx: function() {
            return new Promise(function(e, t) {
                getApp().dispatch("getWXCode").then(function(p) {
                    var c = getApp().state.session.wxInfo, i = {
                        code: p.code,
                        iv: c.iv,
                        encryptedData: c.encryptedData
                    }, r = {
                        code: JSON.stringify(i),
                        appid: o.default.APP_MP_ID
                    };
                    getApp().request({
                        loading: !1,
                        url: n.WX_CONNECT,
                        data: r
                    }).then(function(t) {
                        e();
                    }, function(e) {
                        t();
                    });
                }).catch(function(e) {
                    getApp().kpApi.navigateTo(o.default.INTERCEPT_INDEX);
                });
            });
        },
        appDisconnectWx: function() {
            return clearTimeout(getApp().appTimer), new Promise(function(t, p) {
                getApp().request({
                    url: n.WX_DISCONNECT
                }).then(function(t) {
                    e(), getApp().kpApi.reLaunch(o.default.LOGIN_PATH);
                }).catch(function(t) {
                    e(), getApp().kpApi.reLaunch(o.default.LOGIN_PATH);
                });
            });
        },
        checkCorpId: function(e) {
            console.log("------checkCorpId", e);
            var t = getApp().getCorpId();
            getApp().event.hasListen("shareAppListener") ? e.isLogin ? getApp().dispatch("checkEnter") : getApp().dispatch("getStoreCorporation").then(function(e) {
                getApp().init();
            }) : e.isLogin ? t ? (console.log("------corpId存在", t), getApp().dispatch("checkEnter")) : (console.log("------corpId不存在", t), 
            getApp().dispatch("reloadStoreProfileBaseFromServer").then(function(e) {
                console.log("reloadStoreProfileBaseFromServer返回成功", e);
                var t = getApp().state.cloudstore.storeProfile.corporation_history;
                0 === t.length ? (getApp().setCorpId(o.default.getDefaultCorpId()), getApp().dispatch("checkEnter")) : 1 === t.length ? (getApp().setCorpId(t[0].encrypt_corporation_id), 
                getApp().dispatch("checkEnter")) : getApp().kpApi.reLaunch(o.default.MINE_HISTORY);
            }, function(e) {
                console.log("---返回的历史记录失败", e), getApp().setCorpId(o.default.getDefaultCorpId()), 
                getApp().dispatch("checkEnter");
            })) : (t || getApp().setCorpId(o.default.getDefaultCorpId()), getApp().dispatch("getCorporation"));
        },
        checkEnter: function() {
            getApp().dispatch("enterStore", {
                need_update: !0
            }).then(function(t) {
                getApp().dispatch("timerFunction"), console.log("-------enter访问成功", t), e(t), getApp().commit("session_state_data", t), 
                getApp().commit("store_state_data", t), getApp().init();
            }, function(t) {
                getApp().event.hasListen("shareAppListener") ? getApp().dispatch("getStoreCorporation").then(function(e) {
                    getApp().init();
                }) : (console.log("-------enter访问失败", t), o.default.ERROR_CODE[t.code] ? getApp().dispatch("getStoreCorporation").then(function(e) {
                    getApp().kpApi.reLaunch(o.default.INTERCEPT_INFO);
                }) : (e({}), getApp().kpApi.reLaunch(o.default.NOT_FOUND)));
            });
        },
        enterStore: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, p = t({
                header: {
                    corporation_id: getApp().getCorpId()
                },
                creator_id: getApp().getCreatorId()
            }, o);
            return p.creator_id || delete p.creator_id, console.log("enter-data", p), new Promise(function(t, c) {
                getApp().request({
                    loading: o.loading,
                    url: n.ENTER_STORE,
                    data: p
                }).then(function(o) {
                    getApp().isEnterSuccess = !0, e(o), getApp().kpApi.setStorage({
                        key: "corporation",
                        data: o.corporation
                    }), t(o);
                }, function(e) {
                    getApp().isEnterSuccess = !1, c(e);
                });
            });
        },
        getCorporation: function() {
            return new Promise(function(e, t) {
                getApp().dispatch("getStoreCorporation").then(function(e) {
                    getApp().kpApi.kpAuth("getUserInfo", {
                        success: function(t) {
                            0 != (2 & e.corporation.setting.store_flag) ? getApp().init() : getApp().isLogin() ? getApp().kpApi.reLaunch(o.default.INTERCEPT_INFO) : getApp().kpApi.reLaunch(o.default.LOGIN_PATH);
                        },
                        fail: function(e) {
                            getApp().kpApi.reLaunch(o.default.INTERCEPT_INDEX);
                        }
                    }, !0);
                });
            });
        },
        getStoreCorporation: function() {
            var t = {
                header: {
                    corporation_id: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getApp().getCorpId()
                }
            };
            return new Promise(function(p, c) {
                getApp().request({
                    loading: !1,
                    url: n.GET_STORE_CORPORATION,
                    data: t
                }).then(function(e) {
                    getApp().kpApi.setStorage({
                        key: "corporation",
                        data: e.corporation
                    }), getApp().commit("session_corporation", e), getApp().commit("store_corporation", e), 
                    p(e);
                }).catch(function(t) {
                    e({}), getApp().kpApi.removeStorageSync("corporation"), getApp().kpApi.reLaunch(o.default.NOT_FOUND);
                });
            });
        },
        createEnterRecord: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(o, n) {
                getApp().dispatch("enterStore", t({}, e, {
                    apply_visit: !0
                })).then(function(e) {
                    o(e), getApp().dispatch("reloadStoreProfileBaseFromServer", {
                        loading: !1
                    }).then(function(e) {
                        console.log("------enter之后刷新profile成功, 当前版本个人信息版本:", e);
                    }).catch(function(e) {});
                }).catch(function(e) {
                    n(e);
                });
            });
        },
        timerEnterEvent: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(n, p) {
                getApp().dispatch("enterStore", t({}, o)).then(function(t) {
                    e(t), getApp().commit("session_state_data", t), getApp().commit("store_state_data", t), 
                    getApp().dispatch("reloadStoreProfileBaseFromServer", {
                        loading: !1
                    }).then(function(e) {
                        console.log("------enter之后刷新profile成功, 当前版本个人信息版本:", e);
                    }).catch(function(e) {}), n(t);
                }).catch(function(e) {
                    p(e);
                });
            });
        },
        sendMessage: function(e) {
            var t = e.phone ? "手机" : "邮箱", p = {
                service_type: o.default.SMS_SERVICETYPE[e.service_type || "LOGIN"]
            };
            return Object.assign(e, p), new Promise(function(p, c) {
                getApp().request({
                    url: n[e.request_type || "SEND_MESSAGE"],
                    data: e
                }).then(function(o) {
                    getApp().kpApi.showToast({
                        title: t + "验证码发送成功",
                        icon: "none"
                    }), p(e.account);
                }).catch(function(e) {
                    getApp().kpApi.showToast({
                        title: o.default.ERROR_CODE[e.code] || t + "验证码发送失败，请重新获取",
                        icon: "none"
                    });
                });
            });
        },
        appDecodeCode: function(e) {
            var t = e.scene ? n.APP_DECODE_SCENE : n.APP_DECODE_QRCODE;
            return new Promise(function(o, n) {
                getApp().request({
                    url: t,
                    data: e
                }).then(function(e) {
                    o(e);
                }, function(e) {
                    n(e);
                });
            });
        },
        appModifyAccount: function(e) {
            return new Promise(function(t, o) {
                getApp().request({
                    url: n.APP_UPDATE_ACCOUNT,
                    data: e
                }).then(function(e) {
                    console.log("response", e), delete e.staff, getApp().dispatch("reloadStoreProfileBaseFromServer"), 
                    getApp().commit("session_app_login", e), t(e);
                }, function(e) {
                    o(e);
                });
            });
        },
        session_userinfo_change: function() {
            clearTimeout(getApp().appTimer), getApp().kpApi.showModal({
                title: o.default.login.title,
                content: o.default.login.tourist,
                confirmColor: "#ff9f00",
                confirmText: o.default.login.btn_enter,
                showCancel: !1,
                success: function() {
                    getApp().dispatch("checkEnter");
                }
            });
        },
        getCreatorStaff: function() {
            return new Promise(function(e, t) {
                var o = getApp().getCreatorId();
                if ("0" === o) return e();
                var p = {
                    staff_id: o
                };
                getApp().request({
                    loading: !1,
                    url: n.GET_STORE_STAFF,
                    data: p
                }).then(function(t) {
                    console.log(t), getApp().commit("session_creatorStaff", t), e(t);
                }).catch(function(e) {
                    t(e);
                });
            });
        }
    }
};

exports.default = c;