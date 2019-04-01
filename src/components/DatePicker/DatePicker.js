new Date();

Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                t && (this.setData({
                    startItem: !0,
                    endItem: !1
                }), this.setPickerViewDate(new Date(this.data.startDate)));
            }
        },
        startDate: {
            type: null,
            observer: function(t) {
                this.setData({
                    startDateStr: this.formatDate(new Date(t))
                });
            }
        },
        endDate: {
            type: null,
            observer: function(t) {
                this.setData({
                    endDateStr: this.formatDate(new Date(t))
                });
            }
        }
    },
    data: {
        startYear: 2011,
        dateArr: [],
        years: [],
        months: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
        months_bak: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
        days: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ],
        days_bak: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ],
        startItem: !0,
        endItem: !1,
        limitDate: 365
    },
    ready: function() {
        for (var t = [], e = this.data.startYear; e <= new Date().getFullYear(); e++) t.push(e);
        this.setData({
            years: t
        });
    },
    methods: {
        chooseButtonClick: function(t) {
            if ("confirm" === t.currentTarget.id) {
                if (new Date(this.data.startDate).getTime() - new Date(this.data.endDate).getTime() > 0) return void getApp().kpApi.showToast({
                    icon: "none",
                    title: "结束日期不能早于起始日期, 请重新选择"
                });
                var e = 24 * this.data.limitDate * 60 * 60 * 1e3;
                if (new Date(this.data.endDate).getTime() - new Date(this.data.startDate).getTime() > e) return void getApp().kpApi.showToast({
                    icon: "none",
                    title: "查询日期最大间隔为" + this.data.limitDate + "天"
                });
                var a = {
                    startDate: this.setStartDate(this.data.startDate),
                    endDate: this.setLastDate(this.data.endDate)
                };
                getApp().event.trigger("pickerviewdate", t.currentTarget.id, a);
            } else "cancel" === t.currentTarget.id && getApp().event.trigger("pickerviewdate", t.currentTarget.id);
        },
        setPickerViewDate: function(t) {
            var e = this.getIndexByDate(t), a = e._yearIndex, s = e._monthIndex, n = e._dayIndex;
            this.setData({
                dateArr: [ a, s, n ],
                months: this.data.months,
                days: this.data.days
            });
        },
        startOrEndDateItem: function(t) {
            "startDate" !== t.currentTarget.id || this.data.startItem ? "endDate" !== t.currentTarget.id || this.data.endItem || (this.setData({
                startItem: !1,
                endItem: !0
            }), this.setPickerViewDate(new Date(this.data.endDate))) : (this.setData({
                startItem: !0,
                endItem: !1
            }), this.setPickerViewDate(new Date(this.data.startDate)));
        },
        pickerViewChange: function(t) {
            var e = this.getDateByIndex(t.detail.value), a = e._year, s = e._month, n = e._day;
            this.updateTopDate(new Date(a + "/" + s + "/" + n));
        },
        monthButtomChange: function(t) {
            var e = null, a = void 0, s = void 0, n = void 0;
            "thisMonth" === t.currentTarget.id ? e = new Date() : "lastMonth" === t.currentTarget.id && (e = function(t) {
                var e = t.getFullYear(), a = t.getMonth();
                return 0 === a && (a = 12, e--), new Date(e + "/" + a + "/01");
            }(new Date())), a = e.getFullYear(), s = e.getMonth() + 1, n = this.getDaysByDate(e), 
            this.setData({
                startItem: !0,
                endItem: !1,
                startDate: this.formatDate(new Date(a + "/" + s + "/01")),
                endDate: this.formatDate(new Date(a + "/" + s + "/" + n))
            }), this.setPickerViewDate(new Date(this.data.startDate));
        },
        getIndexByDate: function(t) {
            var e = this.data.years.indexOf(t.getFullYear()), a = this.data.months.indexOf(this.addZero(t.getMonth() + 1));
            this.updateDays(new Date(t)), -1 === (a = this.data.months.indexOf(this.addZero(t.getMonth() + 1))) && (a = this.data.months.length - 1);
            var s = this.data.days.indexOf(this.addZero(t.getDate()));
            return -1 === s && (s = this.data.days.length - 1), {
                _yearIndex: e,
                _monthIndex: a,
                _dayIndex: s
            };
        },
        getDateByIndex: function(t) {
            var e = this.data.years[t[0]], a = this.data.months[t[1]];
            return this.updateDays(new Date(e + "/" + Number(a) + "/01")), {
                _year: e,
                _month: a = this.data.months[t[1]] || this.data.months[this.data.months.length - 1],
                _day: this.data.days[t[2]] || this.data.days[this.data.days.length - 1]
            };
        },
        updateTopDate: function(t) {
            this.data.startItem ? this.setData({
                startDate: this.formatDate(t, "yyyy-MM-dd"),
                months: this.data.months,
                days: this.data.days
            }) : this.setData({
                endDate: this.formatDate(t, "yyyy-MM-dd"),
                months: this.data.months,
                days: this.data.days
            });
        },
        getDaysByDate: function(t) {
            var e = t.getFullYear(), a = t.getMonth() + 1;
            return new Date().getFullYear() === e && new Date().getMonth() + 1 === a ? new Date().getDate() : (12 === Number(a) && (a = 0, 
            e++), new Date(new Date(e + "/" + (Number(a) + 1) + "/01").getTime() - 864e5).getDate());
        },
        updateDays: function(t) {
            var e = t.getFullYear(), a = t.getMonth() + 1, s = null;
            e === new Date().getFullYear() ? this.data.months = this.data.months_bak.slice(0, new Date().getMonth() + 1) : this.data.months = this.data.months_bak, 
            e === new Date().getFullYear() && a === new Date().getMonth() + 1 ? this.data.days = this.data.days_bak.slice(0, new Date().getDate()) : (12 === Number(a) && (a = 0, 
            e++), s = new Date(new Date(e + "/" + (Number(a) + 1) + "/01").getTime() - 864e5).getDate(), 
            this.data.days = this.data.days_bak.slice(0, s));
        },
        closeCalendar: function() {
            getApp().event.trigger("pickerviewdate");
        },
        formatDate: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd", a = {
                "y+": t.getFullYear(),
                "M+": this.addZero(t.getMonth() + 1),
                "d+": this.addZero(t.getDate()),
                "H+": this.addZero(t.getHours()),
                "m+": this.addZero(t.getMinutes()),
                "s+": this.addZero(t.getSeconds())
            };
            for (var s in a) e = e.replace(new RegExp(s, "g"), a[s]);
            return e;
        },
        addZero: function(t) {
            return t < 10 ? "0" + t : t.toString();
        },
        setStartDate: function(t) {
            var e = new Date();
            return t && (e = new Date(t)), e.setHours(0), e.setMinutes(0), e.setSeconds(0), 
            e.getTime();
        },
        setLastDate: function(t) {
            var e = new Date();
            return t && (e = new Date(t)), e.setHours(23), e.setMinutes(59), e.setSeconds(59), 
            e.getTime();
        }
    }
});