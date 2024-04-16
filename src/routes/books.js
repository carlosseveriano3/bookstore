import { BooksController } from "../controllers/book.js";

export async function BooksRouter(app) {
    const booksController = new BooksController();

    app.post('/books', async (request, reply) => {
        return await booksController.createBook(request, reply); 
    });

    app.get('/books', async (request, reply) => {
        return await booksController.listBooks(request, reply);
    });
}