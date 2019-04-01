Component({
    data: {
        isSelect: !1
    },
    properties: {
        status: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                this.setData({
                    isSelect: Boolean(t)
                });
            }
        }
    },
    methods: {
        toggleSelectStatus: function(t) {
            this.setData({
                isSelect: !this.data.isSelect
            }), this.triggerEvent("status", {
                status: this.data.isSelect
            });
        }
    }
});