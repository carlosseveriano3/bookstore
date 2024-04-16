import { UserController } from '../controllers/users.js';

export async function UserRoutes(app) {
  const userController = new UserController();

  app.post('/user', async (request, reply) => {
    return await userController.createUser(request, reply);
  });

  app.post('/login', async (request, reply) => {
    return await userController.authenticateUser(request, reply);
  })
}