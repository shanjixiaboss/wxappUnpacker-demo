Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = {
    encode: function(e) {
        var r = "";
        return e && e.requirement.forEach(function(e, t) {
            r += "," + e.requirement_id + ":" + e.value_id;
        }), "SPECS" + r;
    },
    encodeSingle: function(e, r, t) {
        var n = [], i = !0, u = !1, o = void 0;
        try {
            for (var a, d = t[0].value[Symbol.iterator](); !(i = (a = d.next()).done); i = !0) {
                var l = a.value, c = "";
                c += "," + t[0].requirement_id + ":" + l.id, c += "," + t[1].requirement_id + ":" + e, 
                0 !== r && (c += "," + t[2].requirement_id + ":" + r), n.push("SPECS" + c);
            }
        } catch (e) {
            u = !0, o = e;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (u) throw o;
            }
        }
        return n;
    }
};