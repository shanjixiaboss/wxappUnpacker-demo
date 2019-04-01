var t = require("../../../utils/util.js"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../lib/setting"));

Component({
    properties: {
        cid: {
            type: null
        },
        initialValue: {
            type: null
        },
        value: {
            type: null,
            observer: function(t, e) {
                Number(t) ? this.setData({
                    inputValue: Number(t)
                }) : this.setData({
                    inputValue: null
                });
            }
        },
        precision: {
            type: String,
            value: "0"
        },
        expandClickArea: {
            type: Boolean,
            value: !1
        },
        stock: {
            type: null,
            observer: function(t, a) {
                e.default.stockQuantityOn() && t ? this.setData({
                    placeholder: "" + t,
                    initPlaceholder: "" + t
                }) : this.setData({
                    placeholder: "0",
                    initPlaceholder: "0"
                });
            }
        }
    },
    data: {
        inputValue: null,
        placeholder: "0",
        initPlaceholder: "0"
    },
    methods: {
        changeNumber: function(e) {
            var a = e.target.dataset.type, i = +this.data.inputValue;
            if (0 == a) i = i >= 1 ? i - 1 : 0; else {
                if (1 != a) return;
                i++;
            }
            ("" + i).match(/\.+/g) && (i = (0, t.getRoundUpQuantityByPrecision)({
                val: i,
                precision: this.data.precision
            })), this.triggerDataEvent(i, e.currentTarget.dataset);
        },
        bindInputChange: (0, t.debounce)(function(e) {
            var a = void 0;
            /[^\d.]/g.test(e.detail.value) ? a = 0 : (a = e.detail.value.startsWith(".") ? "0" : e.detail.value, 
            "0" === this.data.precision && -1 !== a.indexOf(".") ? a = a.substr(0, a.indexOf(".")) : "0" !== this.data.precision && (a.match(/\.+/g) && a.match(/\./g).length > 1 && (a = a.substr(0, a.lastIndexOf("."))), 
            a.match(/\.+/g) && (a = (0, t.getRoundUpQuantityByPrecision)({
                val: a,
                precision: this.data.precision
            })))), this.triggerDataEvent(a, e.currentTarget.dataset);
        }, 500),
        bindInputBlur: function(t) {
            this.setData({
                placeholder: this.data.initPlaceholder
            }), t.detail.value && "0" !== t.detail.value || this.triggerDataEvent(0, t.currentTarget.dataset);
        },
        bindInputFocus: function(t) {
            this.setData({
                placeholder: " "
            }), 0 == t.detail.value && this.setData({
                inputValue: null
            });
        },
        triggerDataEvent: function(t, e) {
            var a = Number(t);
            0 === a ? this.setData({
                inputValue: null
            }) : this.setData({
                inputValue: a
            }), a !== Number(this.data.initialValue) && this.triggerEvent("onchange", Object.assign({
                value: a
            }, e));
        }
    }
});