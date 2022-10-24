const jwt = require('jsonwebtoken');

const {
    SIGNATURE_KEY
} = process.env;

module.exports = {
    isLogin: (req,res,next)=>{
        try{
            const token = req.headers['authorization'];
            if(!token){
                return res.status(401).json({
                    status: false,
                    message: 'Macam tak betul',
                    data: null
                })
            }

            const decoded = jwt.verify(token, SIGNATURE_KEY);
            req.user = decoded;
            next();
        } catch(err){
            if(err.message == 'jwt malformed'){
                return res.status(401).json({
                    status: false,
                    message: err.message,
                    data: null
                })
            }

            next(err);

        }
    }
}