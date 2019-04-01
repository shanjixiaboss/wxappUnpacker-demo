function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, i, a) {
        return i && t(e.prototype, i), a && t(e, a), e;
    };
}(), i = {
    "style-a": {
        canvasw: 375,
        canvash: 667,
        imagex: 20,
        imagey: 166,
        imagew: 335,
        imageh: 335,
        codex: 142,
        codey: 525,
        codew: 90,
        codeh: 90,
        iconw: 40,
        iconh: 40,
        iconx: 20,
        icony: 35,
        titlex: 70,
        titley: 64,
        infox: 20,
        infoy: 92.5,
        infow: 335
    },
    "style-b": {
        canvasw: 375,
        canvash: 527,
        imagex: 0,
        imagey: 0,
        imagew: 375,
        imageh: 375,
        codex: 265,
        codey: 400,
        codew: 85,
        codeh: 85,
        iconw: 30,
        iconh: 30,
        iconx: 22.5,
        icony: 395,
        titlex: 62.5,
        titley: 414,
        infox: 22.5,
        infoy: 447.5,
        infow: 210
    },
    "style-c": {
        canvasw: 375,
        canvash: 667,
        imagex: 0,
        imagey: 0,
        imagew: 375,
        imageh: 500,
        codex: 265,
        codey: 525,
        codew: 85,
        codeh: 85,
        iconw: 30,
        iconh: 30,
        iconx: 22.5,
        icony: 520,
        titlex: 62.5,
        titley: 539,
        infox: 22.5,
        infoy: 572.5,
        infow: 210
    }
}, a = function() {
    function a(e, o) {
        t(this, a);
        var c = e.wxaCodeData, s = e.wxaCodePath, n = e.ctx, h = e.image, l = e.qrcodeText, r = e.productName, x = e.corporationName, d = e.corporationIcon, f = e.imageAspectRatio, g = e.imageTempFilePath, m = e.iconTempFilePath;
        this.ctx = n, this.style = i[o], this.wxaCodeData = c, this.wxaCodePath = s, this.image = h, 
        this.qrcodeText = l, this.productName = r, this.corporationName = x, this.corporationIcon = d, 
        this.imageAspectRatio = f, this.imageTempFilePath = g, this.iconTempFilePath = m;
    }
    return e(a, [ {
        key: "draw",
        value: function(t) {
            this._setBackground(), this._setTitle(), this._drawImage(), this._drawWXACode(), 
            this._textProductInfo(), this.ctx.draw(!1, t);
        }
    }, {
        key: "_setBackground",
        value: function() {
            var t = this.style, e = t.canvasw, i = t.canvash;
            this.ctx.setFillStyle("#fff"), this.ctx.fillRect(0, 0, e, i), this.ctx.setFillStyle("rgba(0,0,0,.5)"), 
            this.ctx.setFontSize(12), this.ctx.setTextAlign("center"), this.ctx.fillText("长按识别小程序，马上下单！", e / 2, i - 24);
        }
    }, {
        key: "_drawImage",
        value: function() {
            var t = this.style, e = t.imagex, i = t.imagey, a = t.imagew, o = t.imageh;
            this.ctx.setFillStyle("#f8f8f8"), this.ctx.fillRect(e, i, a, o);
            var c = void 0, s = void 0, n = void 0, h = void 0;
            this.imageAspectRatio >= 1 ? (n = a, c = e, s = i + (o - (h = a / this.imageAspectRatio)) / 2) : (h = o, 
            s = i, c = e + (a - (n = o * this.imageAspectRatio)) / 2), this.ctx.drawImage(this.imageTempFilePath, c, s, n, h);
        }
    }, {
        key: "_drawWXACode",
        value: function() {
            var t = this.style, e = t.codex, i = t.codey, a = t.codew, o = t.codeh;
            this.ctx.drawImage(this.wxaCodePath, e, i, a, o);
        }
    }, {
        key: "_setTitle",
        value: function() {
            var t = this.style, e = t.iconx, i = t.icony, a = t.iconw, o = t.iconh, c = t.titlex, s = t.titley;
            this.ctx.drawImage(this.iconTempFilePath, e, i, a, o), this.ctx.setFillStyle("rgba(0,0,0,.9)"), 
            this.ctx.setFontSize(18), this.ctx.setTextAlign("left");
            var n = this.corporationName;
            n.length >= 9 && (n = n.substring(0, 9).replace(/.$/, "...")), this.ctx.fillText(n, c, s);
        }
    }, {
        key: "_textProductInfo",
        value: function() {
            var t = this.style, e = t.infow, i = t.infox, a = t.infoy;
            this.ctx.setTextAlign("left"), this.ctx.setFillStyle("rgba(0,0,0,.9)"), this.ctx.setFontSize(15);
            var o = this.ctx.measureText("一").width, c = Math.floor(e / o);
            if (this.productName.length > c) {
                var s = this.productName.substring(0, 2 * c - 1), n = s.substring(0, c);
                this.ctx.fillText(n, i, a);
                var h = s.substring(c);
                h.length === c && (h = h.replace(/.$/, "...")), this.ctx.fillText(h, i, a + 22.5);
            } else this.ctx.fillText(this.productName, i, a);
        }
    } ]), a;
}();

exports.default = a;