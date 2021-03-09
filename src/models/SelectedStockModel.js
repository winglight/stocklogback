import Parse from 'parse/node';
import debug from 'debug';
import moment from 'moment';

export const Status = {
    SELECTED: "0",
    CANDIDATED: "1",
    POSITIONED: "2",
    SOLDOUT: "3",
};
export const StatusSelect = [
    { id: "0", name: '海选' },
    { id: "1", name: '精选' },
    { id: "2", name: '持仓' },
    { id: "3", name: '清仓' },
];
export const StrategyCategory = [
    { id: 'qa_gb_ranjl', name: 'QA版GB价量策略' },
    { id: 'good_bad', name: 'gb策略' },
    { id: 'gb_volat_true', name: '波动率反序' },
    { id: 'gb_volat_false', name: '波动率正序' },
    { id: 'con_gb_prev_3', name: '连续good=3策略(前)' },
    { id: 'con_gb_3', name: '连续good=3策略' },
    { id: 'con_good', name: '连续good策略' },
    { id: 'ema8_ema20_cross', name: 'EMA突破策略' },
    { id: '0', name: '---------' },
    { id: 'gb_volat_false', name: '波动率正序' },
];
export const HyperParams = [
    { id: "1,4,6,90,3", name:"1,4,6,90,3"},
    { id: "5,3,6,40,5", name:"5,3,6,40,5"},
    { id: "10,3,5,40,5", name:"10,3,5,40,5"},
    { id: "5,3,7,40,5", name:"5,3,7,40,5"},
    { id: "10,2,7,40,4", name:"10,2,7,40,4"},
    { id: "10,2,6,40,5", name:"10,2,6,40,5"},
    {id: "0", name:"----------"},
    { id: "5,1,5,50,4", name:"5,1,5,50,4"},
    { id: "7,1,5,50,4", name:"7,1,5,50,4"},
    { id: "7,2,5,60,4", name:"7,2,5,60,4"},
];
// export const StrategyCategory = [
//     { id: 'gb_volat_false', name: '波动率正序' },
//     { id: 'good_bad', name: 'gb策略' },
//     { id: 'con_gb_3', name: '连续good=3策略' },
//     { id: 'gb_volat_true', name: '波动率反序' },
//     { id: 'con_good', name: '连续good策略' },
// ];
// export const HyperParams = [
//
//     { id: "5,1,5,50,4", name:"5,1,5,50,4"},
//     { id: "5,1,6,50,4", name:"5,1,6,50,4"},
//     { id: "5,2,7,40,5", name:"5,2,7,40,5"},
//     { id: "10,2,6,40,4", name:"10,2,6,40,4"},
//     { id: "10,2,7,50,4", name:"10,2,7,50,4"},
//     { id: "10,2,7,40,4", name:"10,2,7,40,4"},
// ];

export class SelectedStockModel extends Parse.Object {
    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super('SelectedStockModel');

        // this.date;
        // this.strategy;//策略名称
        // this.hyper_params;//超参数组合
        // this.code;
        // this.name = "";
        // this.good_bad;//gb策略值
        // this.good10_count;//窗口期内good值合计
        // this.bad10_count;//窗口期内bad值合计
        // this.good;//当天good值
        // this.bad;//当天bad值
        // this.con_good;//截止当天连续good值为1的合计
        // this.volatility;//波动率
        // this.volat_price;//波动价格
        // this.totalCapital;//流通市值
        // this.price365_max;//过去365个交易日价格最大值
        // this.price50_max;//过去50个交易日价格平均值变更比例
        // this.price365_change;//过去365个交易日价格平均值变更比例
        // this.price50_change;//过去50个交易日价格平均值变更比例
        // this.vol50_change;//过去50个交易日成交量平均值变更比例
        // this.return_rate;//回报率
        // this.star = "D";//评级：A - 建议购买；B - 待观察；C - 不建议购买
        this.status = Status.SELECTED;
    }

    static findAll() {
        var query = new Parse.Query(SelectedStockModel);
        // query.notEqualTo("url", '');
        return query.find();
    }

    static findById(id) {
        var query = new Parse.Query(SelectedStockModel);
        // query.notEqualTo("url", '');
        return query.get(id);
    }

    static findByDateNSHCode(date, strategy, hyper_params, code) {
        var query = new Parse.Query(SelectedStockModel);
        query.equalTo("date", date);
        query.equalTo("strategy", strategy);
        query.equalTo("hyper_params", hyper_params);
        query.equalTo("code", code);
        return query.find();
    }

    delete() {
        this.destroy({
            success: function(myObject) {
                // The object was deleted from the Parse Cloud.
                debug("Successfully deleted " + myObject.name);
            },
            error: function(myObject, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
                debug("deleted error:" + error);
            }
        });
    }

    update() {
        this.set("name", this.name);

        return this.save();
    }

}

Parse.Object.registerSubclass('SelectedStockModel', SelectedStockModel);