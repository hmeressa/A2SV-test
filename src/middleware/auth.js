import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    try {
        const decoded = jwt.verify(token, 'kdghkdshgkdgjkh');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
export default authenticateToken;
