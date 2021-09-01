const User = require('../../models/user')
const bcrypt = require('bcrypt')
const path = require('path')
const passport = require('passport')

function authController(){
    const _getRedirectUrl = (req) =>{
        return req.user.role === 'admin' ? '/admin/orders' : 'customer/orders'
    }

    return{
        login(req, res){
            res.render('auth/login')
        },
        
        postLogin(req, res, next){

            const { email, password } = req.body

            /*---------validate request--------*/ 
            if(!email || !password){
                req.flash('error', 'All Fields are Required for Login')
                req.flash('email', email)
                req.flash('password', password)
                return res.redirect('/login')
            }

            passport.authenticate('local', (err, user, info) =>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }

                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.login(user, (err) =>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },

        registration (req, res) {
            res.render('auth/registration')
        },

        async postRegistration(req, res){
            const { username, email, password } = req.body
            
            /*---------validate request--------*/ 
            if(!username || !email || !password){
                req.flash('error', 'All Fields are Required for Registration')
                req.flash('username', username)
                req.flash('email', email)
                return res.redirect('/registration')
            }

            /*----------check if email exists-----------*/
            User.exists({email: email}, (err, result)=>{
                if(result){
                    req.flash('error', 'This Email is Taken')
                    req.flash('username', username)
                    req.flash('email', email)
                    return res.redirect('/registration')
                }
            })


            /*---------hash password----------*/
            const hashedPassword = await bcrypt.hash(password, 10)

            /*---------store user information into database--------*/
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword
            }) 

            console.log(user)

            user.save().then(request =>{
                req.flash('success', 'Registation done Successfully')
                return res.redirect('/')
            }).catch(err =>{
                console.log(err)
                req.flash('error', 'Something went Wrong')
                return res.redirect('/registration')
            })     
        },

        logout(req, res){
            req.logout()
            return res.redirect('/login')
        }
    }

}

module.exports = authController