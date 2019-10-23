const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Bankschema = new Schema({
    name: String,
    founds: Number,
    type: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creditCarInfo: {
        billDay: Number,
        bestBuyDay: Number,
        limit: Number,
        limitParcel: Number,
        flag: Number
    }
});

module.exports = mongoose.model('Banks', Bankschema)