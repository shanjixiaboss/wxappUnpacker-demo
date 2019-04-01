Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        prefixStyleClass: {
            type: String,
            value: ""
        },
        thumbnailUrl: {
            type: String,
            value: "/assets/default.png"
        },
        hasVideo: {
            type: null,
            value: ""
        }
    },
    methods: {
        tapThumbnail: function() {
            this.triggerEvent("tapthumbnail");
        }
    }
});