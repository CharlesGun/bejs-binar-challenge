const {user_game_biodata} = require('../models');

module.exports={
    getAll: async (req,res,next)=>{
        try{
            const allUsers = await user_game_biodata.findAll();
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
            next(err)
        }
    },
    detailBio: async (req, res) => {
        const { id } = req.params;
        const findUser = await user_game_biodata.findOne({
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
    createBio: async(req,res,next)=>{
        try{
            const {name,email,region} = req.body;

            const existEmail = await user_game_biodata.findOne({where:{
                email: email
            }})

            if(existEmail){
                return res.status(409).json({
                    status: false,
                    message: 'Email sudah terpakai'
                })
            }
            const user = await user_game_biodata.create({
                name,
                email,
                region
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: {
                    name: user.name,
                    email: user.email,
                    region: user.region
                }
            });
        
        }catch(err){
            next(err);
        }
    },
    updateEmail: async(req,res,next) =>{
        try{
            const {oldEmail, newEmail, confirmEmail} = req.body;
            if (newEmail !== confirmEmail) {
                return res.status(422).json({
                    status: false,
                    message: 'new email and confirm new email doesnt match!'
                });
            }

            const user = await user_game_biodata.findOne({ where: { email: oldEmail } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                })
            };
            const updatedBio = await user.update({
                email: newEmail
            });
    
            return res.status(200).json({
                status: true,
                message: 'success',
                data: updatedBio
            });
        } catch(err){
            next(err);
        }
    },
    deleteBio: async(req,res,next)=>{
        const {id} = req.params;
        try{
            const user = await user_game_biodata.findOne({ where: { id: id } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                })
            };
            const{confirmEmail} = req.body;
            if (user.email !== confirmEmail) {
                return res.status(422).json({
                    status: false,
                    message: 'Wrong email!'
                });
            }
            deletedBio = await user.destroy();
            return res.status(200).json({
                status: true,
                message: 'success: bio deleted',
                data: deletedBio
            });

        } catch(err){
            next(err);
        }
    }
}