/*------------controllers-----------*/ 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/adminOrderController')
const statusController = require('../app/http/controllers/admin/statusController')
const myProfile = require('../app/http/controllers/customers/myProfile')
const profileController = require('../app/http/controllers/admin/profileController')


/*------------middlewares----------*/
const guest = require('../app/http/middlewares/guest') 
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')


function initRoutes(app){
    /*------------home page controller----------*/ 
    app.get('/', homeController().index)
    
    /*-----------customers cart controller route-------------*/ 
    app.get('/cart', auth, cartController().cart)
    app.post('/upate-cart', auth, cartController().update)
    app.delete('/cart/delete/:id', cartController().delete)
    app.put('/cart/update/minus/:id', cartController().minusProduct)
    app.put('/cart/update/plus/:id', cartController().plusProduct)
    app.get('/customer/profile', auth, myProfile().profile)

    /*-----------customers edit profile routes------------*/
    app.get('/customer/edit_form', myProfile().getProfileData) 
    app.get('/customer/edit', myProfile().showProfileData)
    app.put('/customer/edit/:id', myProfile().updateProfileData)

    /*-----------auth controller routes--------*/
    app.get('/registration', guest, authController().registration),
    app.get('/login', guest, authController().login)
    app.post('/registration', authController().postRegistration)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
     
    /*-----------orders controller routes--------*/ 
    app.post('/orders', orderController().store)
    app.get('/customer/orders', orderController().index)


    /*-----------admin routes------------*/
    app.get('/admin/orders', admin, adminOrderController().index) 
    app.get('/customer/profiles/view', admin, profileController().profiles)
    app.post('/admin/order/status', admin, statusController().updateStatus)
    app.get('/admin/profile', admin, profileController().myProfile)
    app.post('/admin/status', admin, statusController().updateStatus)
}


module.exports = initRoutes