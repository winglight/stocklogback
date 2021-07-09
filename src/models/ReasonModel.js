import Parse from 'parse/node';
import debug from 'debug';
import {LogType} from "./LogModel";

export class ReasonModel extends Parse.Object {
    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super('ReasonModel');

        this.seq = 0;//顺序
        this.content = "";//理由
        this.score = 0;//分数;-1 - 负面；1 - 正面；0 - 中性
    }

    findAll() {
        var query = new Parse.Query(ReasonModel);
        // query.notEqualTo("contentType", 'img');
        return query.find();
    }

    findByUrl(url) {
        var query = new Parse.Query(ReasonModel);
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
                debug("Successfully deleted " + myObject.content);
            },
            error: function(myObject, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
                debug("deleted error:" + error);
            }
        });
    }

    update() {
        return this.save();
    }

}

Parse.Object.registerSubclass('ReasonModel', ReasonModel);
