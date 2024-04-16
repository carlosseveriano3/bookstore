-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "price" DECIMAL(2,0),
    "description" VARCHAR(500) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "number_of_pages" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bought_books" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Bought_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saved_books" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "Saved_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bought_books" ADD CONSTRAINT "fk_book" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bought_books" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Saved_books" ADD CONSTRAINT "fk_book" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Saved_books" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
