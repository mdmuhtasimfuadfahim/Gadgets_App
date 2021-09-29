const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return{
        store(req, res){

            /*-----------store orders into database---------*/ 
            const order  = new Order({
                customerId: req.user._id,
                product: req.session.cart.product,
            })

            console.log(order)

            order.save().then(result =>{
                Order.populate(result, {path: 'customerId'}, async (err, placedOrder) =>{
                    req.flash('success', 'Order Placed Successfully')
                    /*--------emit events-------*/
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
                    delete req.session.cart
                    return res.redirect('/customer/orders')
                })
            }).catch(err =>{
                return res.status(500).json({ message: 'Something went Wrong'});
            })
        },

        async index(req, res){
            const orders = await Order.find({ customerId: req.user._id}, null, {sort : {'createdAt': -1}})
            console.log(orders)

            res.header('Cache-Control', 'no-store')
            res.render('customers/orders', {orders: orders, moment: moment})
        }
    }
}

module.exports = orderController