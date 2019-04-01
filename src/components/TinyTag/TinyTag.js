var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../config/config.js"));

Component({
    data: {
        tagText: "",
        tagColor: "#ffffff"
    },
    properties: {
        tagName: null,
        tagType: null,
        color: String,
        text: String
    },
    ready: function() {
        this._setTagData();
    },
    methods: {
        _setTagData: function() {
            var a = this.data, e = null;
            if ("ORDER" === a.tagName) {
                var o = t.default.ORDER_TAG_LIST, r = a.tagType.split("-"), l = (r[0], r[1]);
                if (o[a.tagType]) e = o[a.tagType]; else for (var s = o.NormalOrCloud, g = 0; g < s.length; g++) {
                    if (0 != (l & s[g].status)) {
                        e = s[g];
                        break;
                    }
                    if (0 == s[g].status && 0 == l) {
                        e = s[g];
                        break;
                    }
                }
            } else a.tagType in t.default.COMP_TAG_LIST && (e = t.default.COMP_TAG_LIST[a.tagType]);
            e ? this.setData({
                tagTypes: e.types || "",
                tagText: e.text,
                tagColor: a.color ? a.color : e.color
            }) : a.text && this.setData({
                tagText: a.text,
                tagColor: a.color ? a.color : "#000000"
            });
        }
    }
});