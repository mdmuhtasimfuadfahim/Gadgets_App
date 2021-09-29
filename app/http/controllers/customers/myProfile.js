const axios = require('axios')
const User = require('../../../models/user')

function myProfile(){
    return{
        profile(req, res){
            res.render('customers/myprofile')
        },
        async getProfileData(req, res){
            axios.get(`${process.env.APP_BASE_URL}/customer/edit`, { params : { id : req.query.id }}).then((profileData) =>{
                console.log(profileData.data)
               res.render('updateForm', { profile : profileData.data})
           }).catch(err =>{
               res.send(err)
           })
        },

        showProfileData(req, res){
            if(req.query.id){
                const id = req.query.id
                console.log(id)
                User.findById(id).then(user =>{
                    if(!user){
                        res.status(404).send({ message: `Not Found Any User with this ${id}`})
                    }else{
                        console.log(user)
                        res.send(user)
                    }
                }).catch(err =>{
                    res.status(500).send({ message: `Error While Retriving User with this ${id}`})
                })
            }
            else{
                User.find().then(user =>{
                    res.send(user)
                }).catch(err =>{
                    res.status(500).send({ message: err.message || 'Error Occurred While Retriving User Information' })
                })
            }
        },
        updateProfileData(req, res){
            if(!req.body){
                return res.status(400).send({ message: 'Data to Update can not be Empty'})
            }
            
            const id = req.params.id
            User.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(user =>{
                if(!user){
                    res.status(404).send({ message: `Cannot Update User info. with ${id}. Maybe User not Found`})
                }else{
                    res.send(user)
                }
            }).catch(err =>{
                res.status(500).send({ message: 'Error in Updating Users Information'})
            })
        }
    }
}


module.exports = myProfile