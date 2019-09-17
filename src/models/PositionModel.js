import Parse from 'parse/node';
import debug from 'debug';
import moment from 'moment';

export class PositionModel extends Parse.Object {
    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super('PositionModel');

        this.date;//仓位日期
        this.strategy;//策略名称
        this.hyper_params;//超参数组合
        this.code;
        this.name = "";
        this.good_bad;//gb策略值
        this.good10_count;//窗口期内good值合计
        this.bad10_count;//窗口期内bad值合计
        this.good;//当天good值
        this.bad;//当天bad值
        this.con_good;//截止当天连续good值为1的合计
        this.volatility;//波动率
        this.volat_price;//波动价格
        this.totalCapital;//流通市值
        this.price365_max;//过去365个交易日价格最大值
        this.price50_max;//过去50个交易日价格平均值变更比例
        this.price365_change;//过去365个交易日价格平均值变更比例
        this.price50_change;//过去50个交易日价格平均值变更比例
        this.vol50_change;//过去50个交易日成交量平均值变更比例
        this.return_rate;//回报率
        this.status = Status.SELECTED;
    }

    static findAll() {
        var query = new Parse.Query(PositionModel);
        // query.notEqualTo("url", '');
        return query.find();
    }

    static findById(id) {
        var query = new Parse.Query(PositionModel);
        // query.notEqualTo("url", '');
        return query.get(id);
    }

    static findByDateNSHCode(date, strategy, hyper_params, code) {
        var query = new Parse.Query(PositionModel);
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

Parse.Object.registerSubclass('PositionModel', PositionModel);