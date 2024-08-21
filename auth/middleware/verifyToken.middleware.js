import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized user'
        });
    }

    try {
        const decodeToke = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}