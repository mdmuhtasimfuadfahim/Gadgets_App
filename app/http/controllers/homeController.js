const Product = require('../../models/product')
const User = require('../../models/user')
const moment = require('moment')

function homeController(){
    return{
        async index(req, res) {

            const product = await Product.find()
            return res.render('home', {product: product})

            // Product.find().then((Products)=>{
            //     console.log(Products)
            //     res.render('home', {Products: Products})
            // })
            
        },

        async customers(req, res){
            const users = await User.find()
            console.log(users)
            return res.render('admin/users', {users: users, moment: moment})
        }
    }
}

module.exports = homeController