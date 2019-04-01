Component({
    data: {
        isShow: !1
    },
    properties: {
        status: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                this.setData({
                    isShow: t
                });
            }
        },
        titleText: {
            type: String,
            value: ""
        },
        confirmText: {
            type: String,
            value: "确定"
        },
        cancelText: {
            type: String,
            value: "取消"
        }
    },
    methods: {
        tapButton: function(t) {
            var e = "0" === t.target.dataset.type ? "cancel" : "confirm";
            this.triggerEvent("buttontype", {
                type: e
            });
        }
    }
});