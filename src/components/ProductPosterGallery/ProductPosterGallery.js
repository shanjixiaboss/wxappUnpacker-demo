var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./productPoster"));

Component({
    properties: {
        wxaCodeData: {
            type: String,
            value: ""
        },
        wxaCodePath: {
            type: String,
            value: ""
        },
        posterData: {
            type: Object,
            value: null,
            observer: function() {
                this.init();
            }
        }
    },
    data: {
        posterViews: [ "style-a", "style-b", "style-c" ],
        posterStyle: "",
        imageUrl: "",
        imageAspectRatio: 0,
        canvasClasses: [ "canvas-a", "canvas-b", "canvas-c" ],
        canvasClass: "",
        iconTempFilePath: "",
        imageTempFilePath: ""
    },
    attached: function() {},
    ready: function() {
        console.log("ready");
    },
    detached: function() {
        console.log("detached 重置宽高比"), this.setData({
            imageAspectRatio: 0
        });
    },
    methods: {
        init: function() {
            var t = this.properties, e = t.posterData, a = (t.wxaCodeData, e.image), s = this.data.posterViews[0], i = this.data.canvasClasses[0];
            this.setData({
                imageUrl: a,
                posterStyle: s,
                canvasClass: i
            });
        },
        handleSwiperChange: function(t) {
            var e = t.detail, a = this.data.posterViews[e.current], s = this.data.canvasClasses[e.current];
            this.setData({
                posterStyle: a,
                canvasClass: s
            });
        },
        closeGallery: function() {
            this.triggerEvent("closeGallery");
        },
        setImageAspectRatio: function() {
            var t = this, e = 0, a = this.properties.posterData.image;
            return new Promise(function(s, i) {
                getApp().kpApi.getImageInfo({
                    src: a,
                    success: function(a) {
                        var i = a.width, o = a.height;
                        t.setData({
                            imageAspectRatio: i / o
                        }), 3 === (e += 1) && s();
                    }
                }), getApp().kpApi.downloadFile({
                    url: a,
                    success: function(a) {
                        var i = a.tempFilePath;
                        t.setData({
                            imageTempFilePath: i
                        }), 3 === (e += 1) && s();
                    }
                }), "/assets/corp_avatar.png" === t.data.posterData.corporationIcon ? (t.setData({
                    iconTempFilePath: t.data.posterData.corporationIcon
                }), e += 1) : getApp().kpApi.downloadFile({
                    url: t.data.posterData.corporationIcon,
                    success: function(a) {
                        var i = a.tempFilePath;
                        t.setData({
                            iconTempFilePath: i
                        }), 3 === (e += 1) && s();
                    }
                });
            });
        },
        handleSavePoster: function() {
            var t = this;
            getApp().kpApi.showLoading({
                title: "正在保存..."
            });
            var e = this.data, a = e.imageAspectRatio, s = e.imageTempFilePath;
            e.iconTempFilePath;
            a && s ? this._drawPoster() : this.setImageAspectRatio().then(function() {
                t._drawPoster();
            });
        },
        _drawPoster: function() {
            var a = this.properties, s = a.posterData, i = a.wxaCodeData, o = a.wxaCodePath, n = this.data.posterStyle, p = this.data, r = p.imageAspectRatio, c = p.imageTempFilePath, l = p.iconTempFilePath, h = getApp().kpApi.createCanvasContext("poster-canvas", this);
            new e.default(t({}, s, {
                wxaCodeData: i,
                wxaCodePath: o,
                ctx: h,
                imageAspectRatio: r,
                imageTempFilePath: c,
                iconTempFilePath: l
            }), n).draw(this._saveToAlbum.bind(this));
        },
        _saveToAlbum: function() {
            getApp().kpApi.canvasToTempFilePath({
                canvasId: "poster-canvas",
                success: function(t) {
                    var e = t.tempFilePath;
                    console.log("tempFilePath: ", e), getApp().kpApi.kpAuth("saveImageToPhotosAlbum", {
                        filePath: e,
                        success: function(t) {
                            getApp().kpApi.showToast({
                                title: "已保存到相册"
                            });
                        },
                        fail: function(t) {
                            getApp().kpApi.showToast({
                                title: "保存失败 " + t.errMsg,
                                icon: "none"
                            });
                        }
                    });
                },
                fail: function(t) {
                    console.log(t), getApp().kpApi.showToast({
                        title: "保存失败 " + t.errMsg,
                        icon: "none"
                    });
                }
            }, this);
        }
    }
});