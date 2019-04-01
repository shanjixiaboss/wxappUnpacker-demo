Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (n[e] = r[e]);
    }
    return n;
};

exports.default = {
    session_corporation: function(t, r) {
        return n({}, t, r);
    },
    session_app_login: function(t, r) {
        return n({}, t, r, {
            userInfo: r
        });
    },
    session_wx_info: function(t, r) {
        return n({}, t, {
            wxInfo: r
        });
    },
    session_state_data: function(t, r) {
        return n({}, t, r);
    },
    session_account: function(t, r) {
        return n({}, t, {
            account: r
        });
    },
    session_creatorStaff: function(t, r) {
        return n({}, t, {
            creatorStaff: r.staff
        });
    }
};