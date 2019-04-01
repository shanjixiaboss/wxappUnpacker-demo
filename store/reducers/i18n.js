Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    setI18n: function(t, r) {
        if (r.currency) {
            t.currencyList = r.currency, t.currencyDict = {};
            var i = !0, n = !1, e = void 0;
            try {
                for (var o, u = t.currencyList[Symbol.iterator](); !(i = (o = u.next()).done); i = !0) {
                    var c = o.value;
                    t.currencyDict[c.currency_id] = c;
                }
            } catch (t) {
                n = !0, e = t;
            } finally {
                try {
                    !i && u.return && u.return();
                } finally {
                    if (n) throw e;
                }
            }
        }
        if (r.country_code) {
            t.countryCodeList = r.country_code, t.countryCodeDict = {};
            var y = !0, a = !1, d = void 0;
            try {
                for (var l, f = t.countryCodeList[Symbol.iterator](); !(y = (l = f.next()).done); y = !0) {
                    var v = l.value;
                    t.countryCodeDict[v.country_code_id] = v;
                }
            } catch (t) {
                a = !0, d = t;
            } finally {
                try {
                    !y && f.return && f.return();
                } finally {
                    if (a) throw d;
                }
            }
        }
        if (r.industry) {
            t.industryList = r.industry, t.industryDict = {};
            var s = !0, _ = !1, m = void 0;
            try {
                for (var h, D = t.industryList[Symbol.iterator](); !(s = (h = D.next()).done); s = !0) {
                    var L = h.value;
                    t.industryDict[L.industry_id] = L;
                }
            } catch (t) {
                _ = !0, m = t;
            } finally {
                try {
                    !s && D.return && D.return();
                } finally {
                    if (_) throw m;
                }
            }
        }
        if (r.unit) {
            t.unitList = r.unit, t.unitDict = {};
            var x = !0, z = !1, b = void 0;
            try {
                for (var p, w = t.unitList[Symbol.iterator](); !(x = (p = w.next()).done); x = !0) {
                    var S = p.value;
                    t.unitDict[S.unit_id] = S;
                }
            } catch (t) {
                z = !0, b = t;
            } finally {
                try {
                    !x && w.return && w.return();
                } finally {
                    if (z) throw b;
                }
            }
        }
        if (r.time_zone) {
            t.timezoneList = r.time_zone, t.timezoneDict = {};
            var C = !0, j = !1, I = void 0;
            try {
                for (var M, O = t.timezoneList[Symbol.iterator](); !(C = (M = O.next()).done); C = !0) {
                    var P = M.value;
                    t.timezoneDict[P.time_zone_id] = P;
                }
            } catch (t) {
                j = !0, I = t;
            } finally {
                try {
                    !C && O.return && O.return();
                } finally {
                    if (j) throw I;
                }
            }
        }
        return t;
    },
    i18n_country_data: function(t, r) {
        return t.country_map = r.map, t.country_dict = r.dict, t;
    }
};