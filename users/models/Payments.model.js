const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    date: Date,
    value: Number,
    description: String,
    balance: Number
});

module.exports = mongoose.model('Payments', PaymentSchema)