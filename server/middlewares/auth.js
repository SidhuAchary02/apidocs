import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({message: 'no token provided'});

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) return res.status(401).json({message: 'invalid token'});
        req.user = decoded;
        next();
    })
}