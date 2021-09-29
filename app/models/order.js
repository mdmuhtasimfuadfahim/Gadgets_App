const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    product:{type: Object, required: true},
    status: { type: String, default: 'order_placed'}
},{timestamps: true})

module.exports = mongoose.model('Order', orderSchema)