import jwt from 'jsonwebtoken';

export function validateJwt(request, reply, done) {
    const { authentication } = request.headers
    
    const token = authentication.replace("Bearer ", "")

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        done()
    } catch(err) {
        reply.status(401)
        done(new Error('token inválido'))
    }   
}