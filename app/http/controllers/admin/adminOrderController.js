const Order = require('../../../models/order')
const moment = require('moment')

function adminOrderController(){
    return{
        async index(req, res){
            const orders = await Order.find({ status: { $ne: 'confirmed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password')

            res.render('admin/orders', {orders : orders, moment : moment})
            // .exec((err, orders)=>{
            //     if(req.xhr){
            //         console.log(orders)
            //         return res.json(orders)
            //     }else{
            //         return res.render('admin/orders', {orders: orders, moment: moment})
            //     }

            // })
        }
    }
}


module.exports = adminOrderController