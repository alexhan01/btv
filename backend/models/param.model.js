const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paramSchema = new Schema({
    symbol: { type: String, required: true },
    starttime: { type: Date, required: true },
    endtime: { type: Date, required: true },
    strategy: { type: String, required: true},
    cash: { type: Number, required: true},
}, {
    timestamps: true,
});

const Param = mongoose.model('Param', paramSchema);

module.exports = Param;