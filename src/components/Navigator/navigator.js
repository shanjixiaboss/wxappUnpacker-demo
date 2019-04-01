Component({
    properties: {
        showCart: {
            type: null,
            value: !1
        }
    },
    data: {
        flag: null,
        top: "15%",
        right: "20px",
        bottom: "null",
        left: "null",
        direction: "row",
        screenHeight: 0,
        screenWidth: 0,
        windowHeight: 0,
        windowWight: 0,
        width: 35,
        height: 35,
        isShow: !1,
        cart_value: 0
    },
    methods: {
        tap: function(t) {
            this.setData({
                flag: !this.data.flag
            });
        },
        touch: function(t) {
            if ("touchmove" == t.type) {
                var e = this.data.windowWidth - t.changedTouches[0].clientX, i = this.data.windowHeight - t.changedTouches[0].clientY, a = void 0, h = void 0, n = void 0, d = void 0, o = void 0;
                i < this.data.height ? (a = null, h = 2) : i >= this.data.height && (a = t.changedTouches[0].clientY < this.data.height ? 2 : t.changedTouches[0].clientY - this.data.height, 
                h = null), e < this.data.width ? (n = null, d = 2, o = "row") : e < this.data.windowWidth / 2 ? (n = null, 
                d = e - this.data.width, o = "row") : e >= this.data.width && (n = t.changedTouches[0].clientX < this.data.width ? 2 : t.changedTouches[0].clientX - this.data.width, 
                d = null, o = "row-reverse"), this.setData({
                    top: a + "px",
                    bottom: h + "px",
                    right: d + "px",
                    left: n + "px",
                    direction: o
                });
            }
        },
        navigatorEvent: function(t) {
            getApp().appToPath = t.currentTarget.id, getApp().dispatch("checkCorpId", {
                isLogin: getApp().isLogin()
            });
        }
    },
    created: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.data.screenHeight = e.screenHeight, t.data.screenWidth = e.screenWidth, t.data.windowHeight = e.windowHeight, 
                t.data.windowWidth = e.windowWidth;
            }
        }), getApp().event.createEventOnPage(this);
    },
    ready: function() {
        var t = this;
        this.setData({
            isShow: getCurrentPages()[getCurrentPages().length - 1].data.appShare,
            cart_value: getApp().state.cart.productList.length
        }), getApp().event.listen("cart_quantity", function() {
            console.log("this.", this, t), t.setData({
                cart_value: getApp().state.cart.productList.length
            });
        });
    }
});