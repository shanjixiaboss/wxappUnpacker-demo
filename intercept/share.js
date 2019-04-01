Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../config/config.js")), t = require("../utils/util.js");

exports.default = {
    shareApp: function() {
        var r = this, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("-----params", s);
        var a = Object.assign({}, s);
        if (!a.title) try {
            a.title = this.state.session.corporation.corp_name ? this.state.session.corporation.corp_name : e.default.APP_NAME;
        } catch (t) {
            a.title = e.default.APP_NAME;
        }
        return s = function(t) {
            delete t.title, delete t.imageUrl, delete t.success, delete t.fail, delete t.complete;
            var s = {
                id: r.getCorpId() || e.default.getDefaultCorpId(),
                staff_id: r.getCreatorId() || "0",
                appShare: !0
            };
            return Object.assign({}, s, t);
        }(s), a.path = e.default.ROUTE_PATH.url + "?" + (0, t.obj2url)(s), console.log("-----share", a), 
        a;
    }
};