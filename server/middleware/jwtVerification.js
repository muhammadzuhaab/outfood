import jwt from 'jsonwebtoken'
import ExpressAsyncHandler from 'express-async-handler';


export const userTokenValidation = ExpressAsyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Auhtorization

    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(200).json({status: false, message: 'Access denied!'})
        }
        try {
            const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (tokenData) {
                req.body._id = tokenData._id;
                next();
            } else {
                return res.status(200).json({status: false, message: 'User Login Data not matched to any user!!'})
            }

        } catch (err) {
            return res.status(200).json({status: false, message: 'Access Denied!'})
        }
    } else {
        return res.status(200).json({status: false, message: 'Token Providing Error!'})
    }

});