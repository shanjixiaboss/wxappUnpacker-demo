Component({
    externalClasses: [ "kp-price__external" ],
    properties: {
        isShow: {
            type: Boolean,
            value: !0
        },
        useCustomStyle: {
            type: Boolean,
            value: !1
        },
        value: {
            type: null,
            value: 0
        },
        currency: {
            type: String,
            value: "￥"
        },
        unit: {
            type: String,
            value: "个"
        },
        isMultiUnit: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        triggerUnitSelect: function(e) {
            this.triggerEvent("unitSelect");
        }
    }
});