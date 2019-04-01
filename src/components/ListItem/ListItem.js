Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        prefixStyleClass: {
            type: String,
            value: ""
        },
        needSelect: {
            type: Boolean,
            value: !1
        },
        isLeftSlided: {
            type: Boolean,
            value: !1
        },
        selectStatus: {
            type: Boolean,
            value: !1
        },
        thumbnailUrl: {
            type: String,
            value: "/assets/default.png"
        },
        hasLine: {
            type: Boolean,
            value: !0
        },
        hasVideo: {
            type: null,
            value: ""
        },
        messageFlexEnd: {
            type: Boolean,
            value: !1
        },
        markValue: {
            type: String
        },
        isOrderDetail: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        tapThumbnail: function() {
            this.triggerEvent("tapthumbnail");
        }
    }
});