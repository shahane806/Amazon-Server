
import jwt from 'jsonwebtoken';
const verifyToken =  (req,res,next)=>{
    try {
        const verifiedToken = jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET);
        if(verifiedToken){
            next();
        }
    } catch (error) {
        console.log(error)
    }
}
export default verifyToken;