Component({
    data: {
        currentLength: 0
    },
    properties: {
        content: {
            type: String,
            observer: function(t, e) {
                this.setData({
                    currentLength: t.length
                });
            },
            value: ""
        },
        maxLength: {
            type: Number,
            value: 0
        }
    }
});