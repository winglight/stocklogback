import Parse from 'parse/node';
import debug from 'debug';
import moment from 'moment';

export class PositionModel extends Parse.Object {
    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super('PositionModel');

        this.date;//仓位日期
        this.totalBalance;//总资产
        this.cashBalance;//现金资产
        this.marketBalance;//市值资产
        this.positionLog=[];//持有log
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