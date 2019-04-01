Component({
    properties: {
        title_left: null,
        title_right: null,
        pay_type_value: String,
        detail_left: String,
        tiny_tag: String,
        detail_right: String,
        callback: null,
        id: null
    },
    data: {},
    methods: {
        innerClickItem: function(t) {
            this.triggerEvent("callback", t);
        }
    }
});