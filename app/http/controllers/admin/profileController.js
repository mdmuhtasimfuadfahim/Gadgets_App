const Users = require('../../../models/user')
const moment = require('moment')

function profileController(){
    return{
        async profiles(req, res){
            const users = await Users.find({role: { $ne: 'admin'}})
            res.render('admin/customerProfiles', {users : users, moment: moment})
        }, 
        myProfile(req, res){
            res.render('admin/myProfile')
        }
    }
}


module.exports = profileController