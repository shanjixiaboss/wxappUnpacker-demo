Component({
    properties: {
        nowrap: {
            type: Boolean,
            value: !1
        },
        styleType: {
            type: String,
            value: "checking",
            observer: function(e, t) {
                switch (e) {
                  case "line":
                    this.setData({
                        radioStyle: "kp-line-radio"
                    });
                    break;

                  case "square":
                    this.setData({
                        radioStyle: "kp-square-radio"
                    });
                    break;

                  case "checking":
                    this.setData({
                        radioStyle: "kp-checking-radio"
                    });
                }
            }
        },
        radioList: {
            type: Array,
            value: []
        },
        itemKey: {
            type: String,
            value: ""
        },
        itemName: {
            type: String,
            value: ""
        },
        checked: {
            type: Number
        },
        radioBadgeList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                var a = this.data.radioList.map(function(e) {
                    return e.badge && delete e.badge, e;
                });
                e.forEach(function(e) {
                    var t = a.findIndex(function(t) {
                        return t.id == e;
                    });
                    -1 !== t && (a[t].badge = !0);
                }), this.setData({
                    radioList: a
                });
            }
        }
    },
    data: {
        radioStyle: "kp-checking-radio"
    },
    methods: {
        radioChange: function(e) {
            "id" in e.target.dataset && this.triggerEvent("onchange", {
                id: e.target.dataset.id,
                index: e.target.dataset.index
            });
        }
    }
});