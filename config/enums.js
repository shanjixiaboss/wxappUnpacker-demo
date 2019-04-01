function t(t, E, e) {
    return E in t ? Object.defineProperty(t, E, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[E] = e, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var E;

exports.default = {
    ERROR_CODE: (E = {
        100280212: "未开放游客",
        100060105: "该账号已被使用",
        100280349: "个人信息不完整",
        100280372: "游客最多只能下一个游客单",
        100270120: "系统繁忙, 请重新保存",
        101020101: "发送过于频繁，请稍候再试",
        101020106: "发送过于频繁 (每小时最多5条)",
        101020107: "发送过于频繁 (每天最多10条)",
        101020303: "发送过于频繁，请稍候再试",
        101020306: "发送过于频繁 (每小时最多5条)",
        101020307: "发送过于频繁 (每天最多10条)",
        100160401: "帐号密码错误",
        101020201: "验证码错误",
        100162098: "成员被停用",
        100160408: "该账号名下无企业",
        100281002: "客户已经被删除了，游客身份需要重新登录",
        100281001: "游客转成正式客户",
        100060106: "邮箱账号已存在"
    }, t(E, "100060105", "手机账号已存在"), t(E, 100133702, "商家已经更新过订单，请取消编辑后再重新编辑"), t(E, 100200821, "数据过期"), 
    t(E, 100200802, "该订单已出库"), t(E, 100280346, "下单少于最低下单金额"), E),
    SMS_SERVICETYPE: {
        REGISTER: 0,
        LOGIN: 1,
        CLOUDLOGIN: 2,
        MODIFYPIN: 3,
        MODIFYACCOUNT: 4,
        BINDCORPORATION: 5,
        WIPE_DATA: 6
    },
    STATUS: {
        0: "NULL_ORDER_STATUS",
        65536: "DELIVERED",
        131072: "OBSOLETED",
        262144: "EXCHANGE",
        524288: "AUTO_DELIVERE"
    },
    ORDER_TYPE: {
        NORMAL: "NORMAL",
        DRAFT: "DRAFT",
        CLOUD: "CLOUD",
        REJECT: "REJECT",
        CLOUD_DRAFT: "CLOUD_DRAFT",
        CLOUD_GUEST_DRAFT: "CLOUD_GUEST_DRAFT"
    },
    RECORD_TYPE: {
        0: "RECEIVABLE",
        1: "RECEIVED",
        2: "SENDABLE",
        3: "SENDED",
        4: "EXPENSE",
        5: "OBSOLETED_OUT"
    },
    COMP_TAG_LIST: {
        LAST_PRICE: {
            text: "上次价",
            color: "#7f7f7f",
            types: 1
        },
        "0_65536": {
            text: "单据修改",
            color: "#fc9001"
        },
        "0_131072": {
            text: "单据作废",
            color: "#000000"
        }
    },
    ORDER_TAG_LIST: {
        "DRAFT-0": {
            text: "草稿单",
            color: "#f25d5d"
        },
        "CLOUD_DRAFT-0": {
            text: "待确认云单",
            color: "#fc9001"
        },
        "CLOUD_GUEST_DRAFT-0": {
            text: "待确认云单",
            color: "#fc9001"
        },
        NormalOrCloud: [ {
            status: 131072,
            text: "单据作废",
            color: "#000000"
        }, {
            status: 524288,
            text: "已出库",
            color: "#FFF"
        }, {
            status: 65536,
            text: "已出库",
            color: "#FFF"
        }, {
            status: 262144,
            text: "待出库",
            color: "#1c84e8"
        }, {
            status: 2097152,
            text: "待出库",
            color: "#1c84e8"
        }, {
            status: 0,
            text: "待出库",
            color: "#1c84e8"
        } ]
    }
};