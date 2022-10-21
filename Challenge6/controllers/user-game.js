const {user_game} = require('../models');
const bcrypt = require('bcrypt');

module.exports={
    getAll: async (req,res)=>{
        try{
            const allUsers = await user_game.findAll();
            if (allUsers.length <= 0) {
                res.status(404).json({
                status: false,
                message: "data was not-found",
                data: null,
                });
            }
            return res.status(200).json({
                status: true,
                message: "get data successful!",
                data: allUsers
            });
        } catch(err){
            console.log(err)
        }
    },
    detailUser: async (req, res) => {
        const { id } = req.params;
        const findUser = await user_game.findOne({
            where: {
                id: id,
            },
        });
    
        if (!findUser) {
            return res.status(404).json({
                status: false,
                message: "data was not-found",
                data: null,
        });
        }
    
        return res.status(200).json({
            status: true,
            message: "get data successful!",
            data: findUser,
        });
    },
    whoami: (req,res)=>{
        const me = req.user
        
        try{
            return res.status(200).json({
                statu: true,
                message: 'success',
                data: me
            });
        }catch(err){
            console.log(err);
        }
    },
    changePass: async (req,res)=>{
        const me = req.user
        try{
            const {oldPass, newPass, confirmPass} = req.body;
            if (newPass !== confirmPass) {
                return res.status(422).json({
                    status: false,
                    message: 'new password and confirm new password doesnt match!'
                });
            }

            const user = await user_game.findOne({ where: { id: me.id } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                })
            };
                
            const correct = await bcrypt.compare(oldPass, user.password);
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: 'old password does not match!'
                });
            }
    
            const encryptedPassword = await bcrypt.hash(newPass, 10);
            const updatedUser = await user.update({
                password: encryptedPassword
            });
    
            return res.status(200).json({
                status: true,
                message: 'success'
            });
        } catch(err){
            console.log(err);
        }
    },
    deleteUser: async(req,res)=>{
        const me = req.user;
        const {id} = req.user.id
        try{
            const user = await user_game.findOne({ where: { id: me.id } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                })
            };
            const{confirmPass} = req.body;
            const correct = await bcrypt.compare(confirmPass, user.password);
            if (!correct) {
                return res.status(422).json({
                    status: false,
                    message: 'your password and confirm password doesnt match!'
                });
            }
            deletedUser = await user.destroy();
            return res.status(200).json({
                status: true,
                message: 'success: user deleted',
                data: deletedUser
            });

        } catch(err){
            console.log(err);
        }
    }
}