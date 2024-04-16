import { prisma } from "../lib/prisma.js";

export class BooksController {
  async createBook(request, reply) {
    const { title, genre, price, description, author, number_of_pages } =
      request.body;

      const slug = `${title}_${author}`.replace(/\s/g, '_').toLowerCase()

    const create_book = await prisma.books.create({
      data: {
        title,
        genre,
        price,
        description,
        author,
        number_of_pages,
        slug
      },
    });

    reply.send({ create_book })
  }

  async listBooks(request, reply) {
   const books = await prisma.books.findMany()

   reply.send({ books })
  }
}

