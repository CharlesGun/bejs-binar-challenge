const {user_game} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    SIGNATURE_KEY
} = process.env;


module.exports = {
    register: async (req, res, next)=>{
        try {
            const {username, password, nickname} = req.body;

            const existUsername = await user_game.findOne({where:{
                username: username
            }})

            if(existUsername){
                return res.status(409).json({
                    status: false,
                    message: 'Username sudah terpakai'
                })
            }

            const encryptedPass = await bcrypt.hash(password, 10);

            const user = await user_game.create({
                username,
                password: encryptedPass,
                nickname
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: {
                    name: user.username,
                    nickname: user.nickname
                }
            });

        }catch(err){
            next(err);
        }
    },

    login: async (req, res, next)=>{
        try{
            const {username, password} = req.body;
            const user = await user_game.findOne({
                where:{
                username: username
            }})

            if(!user){
                return res.status(400).json({
                    status: false,
                    message: 'Macam tak betul'
                });
            }

            const verify = await bcrypt.compare(password, user.password);
            if(!verify){
                return res.status(400).json({
                    status: false,
                    message: 'Macam tak betul'
                });
            }

            payload = {
                id: user.id,
                username: user.username,
                nickname: user.nickname
            }
            const token = jwt.sign(payload, SIGNATURE_KEY)
            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    token: token
                }
            });
        }catch(err){
            next(err)
        }
    }
}