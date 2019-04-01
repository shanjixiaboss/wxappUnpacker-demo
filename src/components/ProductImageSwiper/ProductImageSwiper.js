Component({
    data: {
        listLength: 1,
        currentIndex: 1,
        showDownload: !0,
        showGuide: !1
    },
    properties: {
        previewList: {
            type: Array,
            observer: function(t, e) {
                this.setData({
                    listLength: t.length
                });
            }
        },
        list: {
            type: Array
        },
        hasVideo: {
            type: Boolean,
            value: !1
        },
        hasImg: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        this.properties.hasVideo && this.setData({
            showDownload: !1
        }), this.setData({
            showGuide: !getApp().kpApi.getStorageSync("downloadPosterGuide")
        });
    },
    methods: {
        handleSwiperChange: function(t) {
            var e = t.detail, i = !0;
            this.properties.hasVideo && 0 === e.current && (i = !1), this.setData({
                showDownload: i,
                currentIndex: e.current + 1
            });
        },
        onTapSwiper: function() {
            this.properties.hasVideo && 1 == this.data.currentIndex ? this.triggerEvent("tapVideoSnapshot") : ~this.data.list[0].indexOf("http") && getApp().kpApi.previewImage({
                urls: this.data.list,
                current: this.properties.hasVideo ? this.data.list[this.data.currentIndex - 2] : this.data.list[this.data.currentIndex - 1]
            });
        },
        handleDownload: function() {
            var t = this.properties.hasVideo ? this.data.currentIndex - 2 : this.data.currentIndex - 1;
            this.triggerEvent("tapDownload", {
                imgIndex: t
            });
        },
        closeGuide: function() {
            getApp().kpApi.getStorageSync("downloadPosterGuide") || (getApp().kpApi.setStorageSync("downloadPosterGuide", "foo"), 
            this.setData({
                showGuide: !1
            }));
        }
    }
});