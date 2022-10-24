const {user_game_history} = require('../models');

module.exports={
    getAll: async (req,res,next)=>{
        try{
            const allRecords = await user_game_history.findAll();
            if (allRecords.length <= 0) {
                res.status(404).json({
                status: false,
                message: "data was not-found",
                data: null,
                });
            }
            return res.status(200).json({
                status: true,
                message: "get data successful!",
                data: allRecords
            });
        } catch(err){
            next(err)
        }
    },
    detailRecord: async (req, res) => {
        const { id } = req.params;
        const findRecord = await user_game_history.findOne({
            where: {
                id: id,
            }
        });
    
        if (!findRecord) {
            return res.status(404).json({
                status: false,
                message: "record was not-found",
                data: null,
        });
        }
        return res.status(200).json({
            status: true,
            message: "get data successful!",
            data: findRecord,
        });
    },
    createRecord: async(req,res,next)=>{
        try{
            const {playerOneId, playerOneScore, playerTwoId, playerTwoScore} = req.body;
            const totalRounds = await +playerOneScore + +playerTwoScore; 
            const record = await user_game_history.create({
                playerOneId, 
                playerOneScore,
                playerTwoId,
                playerTwoScore,
                totalRounds
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: record
            });
        }catch(err){
            next(err);
        }
    },
    updateRecord: async(req,res,next) =>{
        const {id} = req.params;
        try{
            const {newPlayerOneScore, newPlayerTwoScore} = req.body;
            const record = await user_game_history.findOne({ where: { id: id } });
            if (!record) {
                return res.status(404).json({
                    success: false,
                    message: 'Record not found!'
                })
            };
            const newRounds = await +newPlayerOneScore + +newPlayerTwoScore;
            const updatedBio = await record.update({
                playerOneScore: newPlayerOneScore,
                playerTwoScore: newPlayerTwoScore,
                totalRounds: newRounds
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
    deleteRecord: async(req,res,next)=>{
        const {id} = req.params;
        try{
            const record = await user_game_history.findOne({ where: { id: id } });
            if (!record) {
                return res.status(404).json({
                    success: false,
                    message: 'Record not found!'
                })
            };
            deletedRecord = await record.destroy();
            return res.status(200).json({
                status: true,
                message: 'success: record deleted',
                data: deletedRecord
            });
        } catch(err){
            next(err);
        }
    }
}