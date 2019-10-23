const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Transactionschema = new Schema({
    description: String,
    date: Date,
    value: Number,
    type: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentsInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payments'
    },
    receiptsInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receipts'
    }
});

module.exports = mongoose.model('Transactions', Transactionschema)