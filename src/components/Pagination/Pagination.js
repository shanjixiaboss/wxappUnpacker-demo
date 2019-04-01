Component({
    properties: {
        pagination: {
            type: Number,
            value: 1
        },
        hasNext: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        prev: function(e) {
            this.triggerEvent("prev", {});
        },
        next: function(e) {
            this.triggerEvent("next", {});
        }
    }
});