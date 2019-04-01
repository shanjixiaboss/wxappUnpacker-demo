Component({
    properties: {
        root: {
            type: Object,
            value: null,
            observer: function() {
                this.initMenus();
            }
        }
    },
    data: {
        menus: [],
        options: [],
        activeLevel: 0,
        expanding: !1,
        maskHeight: 0,
        level2Menus: [],
        isScrollX: !1,
        activeTagId: "",
        scrollId: "kpc-cm-scroll-top",
        showRank: !1
    },
    attached: function() {
        this.initMenus();
    },
    ready: function() {
        var e = this;
        wx.createSelectorQuery().select(".product-scroll-view-container").boundingClientRect(function(t) {
            t && e.setData({
                maskHeight: t.height - 44
            });
        }).exec();
    },
    methods: {
        initMenus: function() {
            var e = [], t = [], a = !1;
            switch (this._menuType()) {
              case "Text":
                e = this._setTextMenus(this._root());
                break;

              case "Array":
                e = this._setArrayMenus(this._root());
                break;

              case "Object":
                e = this._setObjectMenus(e, 2, this._root()), a = !0, t = this._setLevel2Menus();
            }
            this.setData({
                menus: e,
                level2Menus: t,
                isScrollX: a,
                activeTagId: "",
                scrollId: "kpc-cm-scroll-top",
                expanding: !1,
                activeLevel: 0
            });
        },
        tapMenu: function(e) {
            var t = e.currentTarget.dataset.menu, a = this.properties.root, n = 0, i = !1, r = [];
            switch (a.menuType) {
              case "Text":
                break;

              case "Array":
                if (0 === (n = this._updateActive(t))) {
                    var s = {
                        name: a.name,
                        tag_id: this._root().map(function(e) {
                            return e.tag_id;
                        }).join(",")
                    };
                    this.triggerEvent("tapOption", {
                        targetTag: s
                    });
                } else this.triggerEvent("tapOption", {
                    targetTag: t
                });
                break;

              case "Object":
                i = 0 !== (n = this._updateActive(t)), r = this._setOptions(t);
            }
            this.setData({
                options: r,
                expanding: i,
                activeLevel: n
            });
        },
        tapOption: function(e) {
            var t = e.currentTarget.dataset.option, a = this.data.menus, n = !1, i = "", r = "kpc-cm-scroll-top";
            a = this._updateMenu(a, t.level, t.name), this._tagHasChildren(t) ? a = this._setObjectMenus(a, t.level + 1, t) : 2 === t.level && "全部" === t.name ? (n = !0, 
            a = this._setObjectMenus(a, 2, this._root())) : 2 === t.level && (n = !0, i = t.tagValue.tag_id, 
            r = "scroll-to-" + t.tagValue.tag_id), this.triggerEvent("tapOption", {
                targetTag: t.tagValue
            }), this.setData({
                activeTagId: i,
                menus: a,
                isScrollX: n,
                scrollId: r,
                activeLevel: 0,
                expanding: !1
            });
        },
        tapLevel2Menu: function(e) {
            var t = e.currentTarget.dataset.menu;
            if (t.children && t.children.length) {
                var a = this.data.menus;
                a = this._updateMenu(a, 2, t.name), a = this._setObjectMenus(a, 3, t), this.setData({
                    menus: a,
                    activeLevel: 0,
                    expanding: !1,
                    isScrollX: !1,
                    activeTagId: t.tag_id
                });
            } else {
                var n = t.tag_id;
                if (this.data.activeTagId === t.tag_id) {
                    n = "", this.setData({
                        isScrollX: !0,
                        activeTagId: n,
                        activeLevel: 0,
                        expanding: !1
                    });
                    var i = this.properties.root.menuValue;
                    return this.triggerEvent("tapOption", {
                        targetTag: i
                    });
                }
                this.setData({
                    isScrollX: !0,
                    activeTagId: n,
                    activeLevel: 0,
                    expanding: !1
                });
            }
            this.triggerEvent("tapOption", {
                targetTag: t.tagValue
            });
        },
        toggleLevel2Menus: function(e) {
            var t = this, a = this.properties.root.menuValue, n = a.children.find(function(e) {
                return e.tag_id === t.data.activeTagId;
            }), i = a, r = {
                level: 2,
                name: n && n.name || "全部",
                children: a.children,
                tagValue: i
            }, s = this._updateActive(r), l = 0 !== s, c = this._setOptions(r);
            this.setData({
                options: c,
                expanding: l,
                activeLevel: s
            });
        },
        _setTextMenus: function(e) {
            return [ {
                name: e,
                tag_id: "",
                level: 0,
                withExpandIcon: !1
            } ];
        },
        _setArrayMenus: function(e) {
            return e.map(function(e, t) {
                return {
                    name: e.name,
                    tag_id: e.tag_id,
                    level: t + 2,
                    withExpandIcon: !1
                };
            });
        },
        _setObjectMenus: function(e, t, a) {
            if (this._tagHasChildren(a)) {
                var n = 2 === t ? a : a.tagValue, i = {
                    level: t,
                    name: "全部",
                    children: a.children,
                    tagValue: n,
                    withExpandIcon: !0
                };
                e.splice(t - 2, 4 - t, i);
            } else e.splice(t - 2, 4 - t);
            return e;
        },
        _setLevel2Menus: function() {
            var e = this._root();
            return this._tagHasChildren(e) ? e.children.map(function(e) {
                return {
                    level: 2,
                    name: e.name,
                    children: e.children,
                    tag_id: e.tag_id,
                    tagValue: e
                };
            }) : [];
        },
        _setOptions: function(e) {
            var t = [], a = e.level;
            return e.children.forEach(function(n) {
                var i = e.name == n.name;
                t.push({
                    level: a,
                    active: i,
                    name: n.name,
                    children: n.children,
                    tagValue: n
                });
            }), t.unshift({
                level: a,
                name: "全部",
                active: "全部" === e.name,
                tagValue: e.tagValue
            }), t;
        },
        _updateMenu: function(e, t, a) {
            return e.find(function(e) {
                return e.level === t;
            }).name = a, e;
        },
        _updateActive: function(e) {
            return this.data.activeLevel === e.level ? 0 : e.level;
        },
        _tagHasChildren: function(e) {
            return e && e.children && e.children.length > 0;
        },
        _root: function() {
            return this.properties.root.menuValue;
        },
        _menuType: function() {
            return this.properties.root && this.properties.root.menuType;
        }
    }
});