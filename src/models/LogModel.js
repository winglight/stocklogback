import Parse from 'parse/node';
import debug from 'debug';
import {SelectedStockModel, Status} from "./SelectedStockModel";

//log类型
export const LogType = {
  UNCANDIDATE: "uncandidate",//未选中
  CANDIDATE: "candidate",//选中
  BID: "bid",//竞价
  ORDER: "order",//下单
  HOLD: "hold",//持有
  SELL: "sell",//卖出
};

//建议类型
export const SuggestionType = {
  NONE: "none",//买入
  BUY: "buy",//买入
  HOLD: "hold",//持有
  SELL: "sell",//卖出
};

export const LogSelect = [
    { id: "uncandidate", name: '未选中' },
    { id: "candidate", name: '选中' },
    { id: "bid", name: '竞价' },
    { id: "order", name: '下单' },
    { id: "hold", name: '持有' },
    { id: "sell", name: '卖出' },
];

export const SuggestionSelect = [
    { id: "none", name: '无' },
    { id: "buy", name: '买入' },
    { id: "hold", name: '持有' },
    { id: "sell", name: '卖出' },
];

export default class LogModel extends Parse.Object {
    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super('LogModel');

        this.selected_stock_id="";//父对象：选中股票id
        this.suggested_low_price = 0;//建议较低价格
        this.suggested_high_price = 0;//建议较高价格
        this.expected_low_price = 0;//止损价格
        this.expected_high_price = 0;//止盈价格
        this.current_price = 0;//当前价格
        this.suggested_action = SuggestionType.NONE;//推荐动作
        this.star = "D";//评级：A - 建议购买；B - 待观察；C - 不建议购买
        this.score = 0;//评分——来自理由的综合得分
        this.reason_ids = [];//理由，id数组
        this.logType = LogType.UNCANDIDATE;//log类型
    }

    findAll() {
        var query = new Parse.Query(LogModel);
        // query.notEqualTo("contentType", 'img');
        return query.find();
    }

    findByUrl(url) {
        var query = new Parse.Query(LogModel);
        query.equalTo("url", url);
        return query.find();
    }

    refreshDataFromParse() {
      return {
        'id': this.get("objectId"),
      }
    }

    deleteAll() {
        this.findAll().then(function(news) {
            // console.log("deleting " + JSON.stringify(posts));
            Parse.Object.destroyAll(news);
        }, function(error) {
            console.log("deleteAll error " + JSON.stringify(error));
        });
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

    save() {
        if(!this.id && this.logType === LogType.CANDIDATE){
            SelectedStockModel.findById(this.selected_stock_id)
                .then((stock) => {
                    // The object was retrieved successfully.
                    stock.status = Status.CANDIDATED
                    stock.save();
                }, (error) => {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and message.
                });
        }
        return this.save();
    }

}

Parse.Object.registerSubclass('LogModel', LogModel);
