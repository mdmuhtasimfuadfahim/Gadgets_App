function cartController(){
 return{
     cart(req, res){
        res.render('customers/cart')
    },
    
    update(req, res){
        /*------------for the first time creating cart and adding basic obeject structure---------------*/
        if(!req.session.cart){
            req.session.cart = {
              product: {},
              totalQty: 0,
              totalPrice: 0
            }
        }

        
        let cart = req.session.cart

        /*-----------check if product doesn't exist in cart---------*/ 
        if(!cart.product[req.body._id]){
            cart.product[req.body._id]= {
                product: req.body,
                qty: 1
            }
             

            /*---------cart total---------*/ 
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
        } else{
            cart.product[req.body._id].qty = cart.product[req.body._id].qty + 1

            /*---------cart total---------*/ 
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
        }
       return res.json({totalQty: req.session.cart.totalQty})
    }
 }
}


module.exports = cartController