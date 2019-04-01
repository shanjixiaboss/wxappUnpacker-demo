Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("product"));

exports.default = {
    tagFormatter: function(t) {
        var e = [], n = [], a = [], i = [];
        (t = JSON.parse(JSON.stringify(t))).sort(function(r, t) {
            return +r.order_id - +t.order_id;
        });
        var d = !0, o = !1, l = void 0;
        try {
            for (var u, s = t[Symbol.iterator](); !(d = (u = s.next()).done); d = !0) {
                var f = u.value;
                "0" === f.parent_id ? "NULL" === f.type ? n.push(f) : e.push(f) : a.push(f);
            }
        } catch (r) {
            o = !0, l = r;
        } finally {
            try {
                !d && s.return && s.return();
            } finally {
                if (o) throw l;
            }
        }
        if (a.length) {
            var h = !0, y = !1, c = void 0;
            try {
                for (var v, p = a[Symbol.iterator](); !(h = (v = p.next()).done); h = !0) {
                    var g = v.value, _ = !1, m = !0, w = !1, b = void 0;
                    try {
                        for (var x, O = n[Symbol.iterator](); !(m = (x = O.next()).done); m = !0) {
                            var S = x.value;
                            if (g.parent_id === S.tag_id) {
                                S.hasOwnProperty("children") || (S.children = []), S.hasOwnProperty("descendantIds") || (S.descendantIds = []), 
                                S.children.push(g), S.descendantIds.push(g.tag_id), _ = !0;
                                break;
                            }
                        }
                    } catch (r) {
                        w = !0, b = r;
                    } finally {
                        try {
                            !m && O.return && O.return();
                        } finally {
                            if (w) throw b;
                        }
                    }
                    _ || i.push(g);
                }
            } catch (r) {
                y = !0, c = r;
            } finally {
                try {
                    !h && p.return && p.return();
                } finally {
                    if (y) throw c;
                }
            }
        }
        if (i.length) {
            var I = !0, P = !1, N = void 0;
            try {
                for (var k, F = i[Symbol.iterator](); !(I = (k = F.next()).done); I = !0) {
                    var J = k.value, L = !0, M = !1, j = void 0;
                    try {
                        for (var q, E = n[Symbol.iterator](); !(L = (q = E.next()).done); L = !0) {
                            var Q = q.value;
                            if (Q.hasOwnProperty("children")) {
                                var R = !0, T = !1, U = void 0;
                                try {
                                    for (var z, A = Q.children[Symbol.iterator](); !(R = (z = A.next()).done); R = !0) {
                                        var B = z.value;
                                        if (J.parent_id === B.tag_id) {
                                            B.hasOwnProperty("children") || (B.children = []), B.hasOwnProperty("descendantIds") || (B.descendantIds = []), 
                                            B.children.push(J), B.descendantIds.push(J.tag_id), Q.descendantIds.push(J.tag_id);
                                            break;
                                        }
                                    }
                                } catch (r) {
                                    T = !0, U = r;
                                } finally {
                                    try {
                                        !R && A.return && A.return();
                                    } finally {
                                        if (T) throw U;
                                    }
                                }
                            }
                        }
                    } catch (r) {
                        M = !0, j = r;
                    } finally {
                        try {
                            !L && E.return && E.return();
                        } finally {
                            if (M) throw j;
                        }
                    }
                }
            } catch (r) {
                P = !0, N = r;
            } finally {
                try {
                    !I && F.return && F.return();
                } finally {
                    if (P) throw N;
                }
            }
        }
        return i.length && i.forEach(function(t) {
            t.icon_url = r.default.imagesFormatter({
                list: t.images ? t.images.image : [],
                thumb: !0,
                returnQuantity: 1
            });
        }), {
            tree: n,
            defaultTag: e,
            onlyRoot: !a.length
        };
    }
};