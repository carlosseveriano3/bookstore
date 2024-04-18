import jwt from 'jsonwebtoken';

export function validateJwt(request, reply, done) {
    const { authorization } = request.headers
    
    const token = authorization?.replace("Bearer ", "")

    if (!token) {
        return reply.status(401).send({ message: 'token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        done()
    } catch(err) {
        reply.status(401)
        done(new Error('token inválido'))
    }   
}