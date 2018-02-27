/**
 * Created by Administrator on 2018\1\22 0022.
 */


var mongoose = require('mongoose');

var ConsumeSchema = new mongoose.Schema({
    money: String,
    scene: String,
    pay_way: String,
    useAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }

});

ConsumeSchema.pre('save', function (next) {
    if (this.isNew) {
        this.useAt = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next()
});

ConsumeSchema.statics = {
    select: function (cb) {
        return this.find().sort('updateAt').exec(cb);
    },
    findById: function (id, cb) {
        return this.find({_id: id}).exec(cb);
    }
};

module.exports = ConsumeSchema;