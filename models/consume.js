/**
 * Created by Administrator on 2018\1\22 0022.
 */

var mongoose = require('mongoose');
var ConsumeSchema = require('../schemas/consume');
var Consume = mongoose.model('consume', ConsumeSchema);

module.exports = Consume;