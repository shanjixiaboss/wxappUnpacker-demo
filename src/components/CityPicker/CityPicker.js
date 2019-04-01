Component({
    properties: {
        pickerview: {
            type: null,
            observer: function(t, i) {
                if (void 0 !== i) if (null !== i) {
                    if (!t.isShow || !i.isShow) try {
                        this.getCountryMap(t.value);
                    } catch (t) {
                        this.getCountryMap();
                    }
                } else this.getCountryMap();
            }
        }
    },
    data: {
        isSelecting: !1,
        value: [ 0, 0, 0 ],
        state: null,
        city: null,
        district: null,
        origin_state: [],
        origin_city: [],
        origin_district: [],
        address: {
            state: "4849813853019570176",
            city: "4849813853024288768",
            district: "4849813853024291567"
        }
    },
    methods: {
        confirm: function(t) {
            this.triggerEvent("pickerviewEvent", Object.assign({}, this.data.address)), this.cancel();
        },
        cancel: function(t) {
            this.setData({
                "pickerview.isShow": !1
            });
        },
        getCountryMap: function(t) {
            var i = this;
            getApp().dispatch("getCountryMap").then(function(e) {
                i.data.state || (i.data.origin_state = e.state, i.data.origin_city = e.city, i.data.origin_district = e.district, 
                i.setData({
                    state: e.state
                }));
                var a = i.getIndex(t);
                i.setPickerByIndex(a), i.setData({
                    value: a
                });
            });
        },
        getIndex: function(t) {
            var i = [ 0, 0, 0 ];
            try {
                var e = getApp().state.i18n.country_dict, a = Object.keys(e);
                -1 !== a.indexOf(t.state) && (i[0] = a.indexOf(t.state)), -1 !== (a = Object.keys(e[t.state].city)).indexOf(t.city) && (i[1] = a.indexOf(t.city)), 
                -1 !== (a = Object.keys(e[t.state].city[t.city].district)).indexOf(t.district) && (i[2] = a.indexOf(t.district)), 
                this.setData({
                    address: t
                });
            } catch (t) {
                i = [ 0, 0, 0 ];
            }
            return this.data._val = i, i;
        },
        setPickerByIndex: function(t) {
            var i = t[0], e = t[1], a = t[2], s = getApp().state.i18n.country_dict;
            this.data.address.state = Object.keys(s)[i];
            var c = s[this.data.address.state], d = c.city, n = Object.keys(c.city);
            this.data.address.city = n[e] || n[n.length - 1];
            var r = d[this.data.address.city].district, o = Object.keys(r);
            this.data.address.district = o[a] || o[o.length - 1], this.setData({
                city: d,
                district: r,
                address: this.data.address
            });
        },
        bindchange: function(t) {
            if (!this.data.isSelecting) {
                this.data.isSelecting = !0, console.log(t);
                var i = t.detail.value, e = this.data.value;
                i[0] !== e[0] ? (console.log(this.data._value), e = [ i[0], 0, 0 ]) : i[1] !== e[1] ? (e[1] = i[1], 
                e[2] = 0) : i[2] !== e[2] && (e[2] = i[2]), this.data._value = e, this.setPickerByIndex(e), 
                this.data.isSelecting = !1, this.setData({
                    value: e
                });
            }
        }
    }
});