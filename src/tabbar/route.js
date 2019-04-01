!function(e) {
    e && e.__esModule;
}(require("../../config/config.js"));

Page({
    onLoad: function(e) {
        wx.showNavigationBarLoading(), console.log("-------------route", e), getApp().createStore(), 
        e.scene || e.q ? this.handleFromScene(e) : e.appShare ? this.handleFromShare(e) : this.handleFromNormal(e), 
        console.log("deal options result", e);
    },
    handleFromScene: function(e) {
        var o = this;
        console.log("------通过扫二维码进来的, ^_^");
        var t = {};
        if (e.scene) t = {
            scene: decodeURIComponent(e.scene)
        }; else {
            var n = decodeURIComponent(e.q).split("store/").pop();
            if (-1 !== n.indexOf("h5?")) return void this.handleFromShare(JSON.parse('{"' + n.split("h5?")[1].replace(/=/g, '":"').replace(/&/g, '","') + '"}'));
            t = {
                scene: n
            };
        }
        getApp().dispatch("appDecodeCode", t).then(function(t) {
            t.type_value && t.type_value.length > 0 ? (t.type_value.forEach(function(o) {
                "CORPORATION" == o.type ? e.id = o.value : "STAFF" == o.type ? e.staff_id = o.value : "PRODUCT" != o.type && "ORDER" != o.type || (e.item_id = o.value, 
                e.actionName = "PRODUCT" == o.type ? "shareProductDetail" : "shareOrderDetail");
            }), e.actionName ? o.handleFromShare(e) : o.dealOptions(e)) : t && t.value && (e.id = t.value[0], 
            e.staff_id = t.value[1], t.value[2] ? (e.item_id = t.value[2], e.actionName = "PRODUCT" == t.model_type || 3 == t.model_type ? "shareProductDetail" : "shareOrderDetail", 
            o.handleFromShare(e)) : o.dealOptions(e));
        }).catch(function(t) {
            o.dealOptions(e);
        });
    },
    handleFromShare: function(e) {
        console.log("------通过点击用户分享的程序进来的, ^_^"), getApp().sharesDeal(e), this.dealOptions(e);
    },
    handleFromNormal: function(e) {
        console.log("------通过其它渠道进来的, ^_^"), this.dealOptions(e);
    },
    dealOptions: function(e) {
        console.log("dealOptions", e), e.id && (console.log("------有corp情况下执行"), getApp().setCorpId(e.id)), 
        console.log("------时刻更新分享者id", e.staff_id), getApp().setCreatorId(e.staff_id), this.startApp();
    },
    startApp: function() {
        getApp().kpApi.getStorageSync("account") ? (console.log("-------用户已经登录"), getApp().dispatch("checkCorpId", {
            isLogin: !0
        })) : this.wxSsoLogin();
    },
    wxSsoLogin: function() {
        getApp().dispatch("getWXCode").then(function(e) {
            console.log("------授权成功", e), getApp().dispatch("wxSsoLogin").then(function(e) {
                getApp().dispatch("checkCorpId", {
                    isLogin: !0
                });
            }).catch(function(e) {
                getApp().dispatch("checkCorpId", {
                    isLogin: !1
                });
            });
        }).catch(function(e) {
            getApp().dispatch("checkCorpId", {
                isLogin: !1
            });
        });
    }
});