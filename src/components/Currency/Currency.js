var e = require("../../../utils/util");

Component({
    properties: {
        currencyUnit: {
            type: String,
            value: "￥"
        },
        money: {
            type: null,
            value: 0,
            observer: function() {
                this.updateFormatMoney();
            }
        },
        precision: {
            type: null,
            value: 0
        },
        unitSize: {
            type: Number,
            value: 24
        },
        prefixText: {
            type: String,
            value: ""
        }
    },
    data: {
        formatMoney: ""
    },
    attached: function() {
        this.updateFormatMoney();
    },
    methods: {
        updateFormatMoney: function() {
            var t = this.properties, i = t.money, o = t.precision, r = getApp().state.session.corporation.setting.product_price_precision;
            this.setData({
                formatMoney: (0, e.formatByPrecision)(i, o || r)
            });
        }
    }
});