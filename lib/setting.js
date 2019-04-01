function t() {
    return getApp().state.cloudstore.corporation.setting;
}

function n() {
    return 0 != (4 & t().store_flag);
}

function r() {
    var r = t();
    return n() && 0 != (32 & r.store_flag);
}

function e() {
    return 0 != (64 & t().store_flag);
}

function o() {
    return 0 != (1024 & t().store_flag);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    stockOn: n,
    stockStatusOn: r,
    stockQuantityOn: function() {
        return n() && !r();
    },
    priceOn: function() {
        return e() && (!o() || getApp().isCustomer());
    },
    moqOn: function() {
        return 0 != (512 & t().store_flag);
    },
    onStockOnOrder: function() {
        return 0 != (8 & t().store_flag);
    },
    hasTax: function() {
        return 0 != (16 & t().product_flag);
    }
};