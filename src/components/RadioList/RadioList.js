Component({
    properties: {
        nowrap: {
            type: Boolean,
            value: !1
        },
        customClass: {
            type: String,
            value: ""
        },
        radioList: {
            type: Array,
            value: []
        },
        itemKey: {
            type: String,
            value: ""
        },
        itemName: {
            type: String,
            value: ""
        },
        checked: {
            type: Number
        }
    },
    methods: {
        radioChange: function(e) {
            "index" in e.target.dataset && this.triggerEvent("onchange", {
                index: e.target.dataset.index
            });
        }
    }
});