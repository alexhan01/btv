const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paramSchema = new Schema({
    symbol: { type: String, required: true },
    starttime: { type: Date, required: true },
    endtime: { type: Date, required: true },
    strategy: { type: String, required: false},
}, {
    timestamps: true,
});

const Param = mongoose.model('Param', paramSchema);

module.exports = Param;