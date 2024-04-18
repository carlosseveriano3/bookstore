import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import crypto from 'crypto';

import jwt from 'jsonwebtoken';

//É no controller que fica armazenado a lógica, que é o que a gente chama de
//regra de negócio, então é aí que os dados vão ser capturados

export class UserController {
  async createUser(request, reply) {
    const { name, email, password } = request.body;

    const cipher = crypto.createCipher('aes256', process.env.PASSWORD_ENCRIPT_KEY);
    cipher.update(password);
    const encryptedPassword = cipher.final('hex');

    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: encryptedPassword
      },
    });

    reply.send({ message: 'user created' });
  }

  async authenticateUser(request, reply) {
    const { email, password } = request.body

    const cipher = crypto.createCipher('aes256', process.env.PASSWORD_ENCRIPT_KEY);
    cipher.update(password);
    const encryptedPassword = cipher.final('hex');

    const user = await prisma.users.findFirst({
      where: {email, password: encryptedPassword},
      select: { id: true, name: true, email: true, admin: true },
    });

    if (user) {
      const token = jwt.sign({ data: user }, process.env.JWT_KEY)
  
      reply.send({ token });
    } else {
      reply.status(401).send({ message: 'user not found' });
    }

  }
}