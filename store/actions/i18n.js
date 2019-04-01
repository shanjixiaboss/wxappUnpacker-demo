function t(t) {
    for (var e = i({}, t), n = e.state, r = e.city, c = e.district, a = {}, o = 0; o < n.length; o++) {
        var s = n[o];
        s.city = {}, a[s.state_id] = s;
        for (var u = 0; u < r.length; u++) {
            var d = r[u];
            if (s.state_id === d.state_id) {
                d.district = {}, s.city[d.city_id] = d;
                for (var g = 0; g < c.length; g++) {
                    var _ = c[g];
                    d.city_id === _.city_id && (d.district[_.district_id] = _);
                }
            }
        }
    }
    return a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, e = {
    GET_I18N: "/gw/i18nlogic/get_i18n",
    GET_COUNTRY_MAP: "/gw/i18nlogic/get_country_map",
    GET_LOCATION: "/gw/i18nlogic/get_location"
}, n = {
    URL: e,
    state: {
        ready: !1,
        isI18NLoading: !1,
        currencyList: [],
        currencyDict: {},
        countryCodeList: [],
        countryCodeDict: {},
        industryList: [],
        industryDict: {},
        unitList: [],
        unitDict: {},
        timezoneList: [],
        timezoneDict: {}
    },
    actions: {
        reloadI18NFromServer: function() {
            var t = {
                language_id: "zh_cn"
            };
            return new Promise(function(i) {
                getApp().request({
                    loading: !1,
                    url: e.GET_I18N,
                    data: t
                }).then(function(t) {
                    getApp().commit("setI18n", t), i(t);
                }, function(t) {
                    reject(t);
                });
            });
        },
        getCountryMap: function() {
            var i = {};
            try {
                i = JSON.parse(JSON.stringify(getApp().state.cloudstore.storeProfile.addresses.address[0]));
            } catch (t) {
                i.country = "17230";
            }
            return 0 == i.country && (i.country = "17230"), new Promise(function(n, r) {
                if (getApp().state.i18n.country_map) n(getApp().state.i18n.country_map); else {
                    var c = {
                        country_id: i.country,
                        language_id: getApp().state.session.language_id
                    };
                    getApp().request({
                        url: e.GET_COUNTRY_MAP,
                        data: c
                    }).then(function(i) {
                        i && (getApp().commit("i18n_country_data", {
                            map: i,
                            dict: t(i)
                        }), n(i));
                    }).catch(function(t) {
                        r(t);
                    });
                }
            });
        },
        getLocation: function(t) {
            var i = {
                country_id: t.country_id,
                state_id: t.state_id,
                city_id: t.city_id,
                district_id: t.district_id,
                language_id: getApp().state.session.language_id
            };
            return new Promise(function(t, n) {
                getApp().request({
                    loading: !1,
                    url: e.GET_LOCATION,
                    data: i
                }).then(function(i) {
                    t(i);
                }).catch(function(t) {
                    n(t);
                });
            });
        },
        getWxLocation: function(t) {
            var i = Object.assign({}, {
                country_id: "17230",
                language_id: getApp().state.session.language_id
            }, t);
            return new Promise(function(t, n) {
                getApp().request({
                    loading: !1,
                    url: e.GET_LOCATION,
                    data: i
                }).then(function(i) {
                    t(i);
                }).catch(function(t) {
                    n(t);
                });
            });
        }
    }
};

exports.default = n;