const multer = require('multer')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const path = require('path')

/*------------image upload operation---------*/
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/img'),
    filename: (req, file, cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
}) 

let upload = multer({
    storage,
}).single('image')

function authController(){

    return{
        login(req, res){
            res.render('auth/login')
        },
        registration (req, res) {
            res.render('auth/registration')
        },
        postRegistration(req, res){
            upload(req, res, async function (err) {
            const { name, email, phone, address, password, image } = req.body
            
            if(err){
                return res.status(500).send({ error: err.message})
            }

            if(!req.file){
                return res.json({ error: 'Somthing Went Wrong'})
            }
            
            /*---------validate request--------*/ 
            if(!name || !email || !phone ||!address || !password){
                req.flash('error', 'All Fields are Required for Registration')
                req.flash('name', name)
                req.flash('email', email)
                req.flash('phone', phone)
                req.flash('address', address)
                req.flash('password', password)
                return res.redirect('/registration')
            }

            /*----------check if email exists-----------*/
            User.exists({email: email}, (err, result)=>{
                if(result){
                    req.flash('error', 'This Email is Taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    req.flash('password', password)
                    return res.redirect('/registration')
                }
            })

            /*----------check if phone number exists-----------*/
            User.exists({phone: phone}, (err, result)=>{
                if(result){
                    req.flash('error', 'This Contact Number is Already Exists')
                    req.flash('name', name)
                    req.flash('email', email)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    req.flash('password', password)
                    return res.redirect('/registration')
                }
            })

            /*---------hash password----------*/
            const hashedPassword = await bcrypt.hash(password, 10)

            /*---------store user information into database--------*/
            const user = new User({
                image: '/img/' + req.file.filename,
                name: name,
                email: email,
                phone: phone,
                address: address,
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
        }) 
        }
    }

}

module.exports = authController