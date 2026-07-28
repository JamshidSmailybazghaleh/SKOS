/*
====================================================
SKOS Mission Control

Book Service

File:
book-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const BookService = {

    books: [],

    async initialize() {

        Logger.info(
            "Book Service Initializing..."
        );

        return true;

    },

    async loadBook(bookId) {

        Logger.info(
            "Loading Book: " + bookId
        );

        try {

            const response = await fetch(

                CONFIG.paths.data +

                "books/" +

                bookId +

                ".json"

            );

            if (!response.ok) {

                throw new Error(
                    "Book not found."
                );

            }

            const book =

                await response.json();

            this.books.push(book);

            if (window.EventBus) {

                EventBus.publish(

                    "book.loaded",

                    book

                );

            }

            return book;

        }

        catch (error) {

            Logger.error(
                error.message
            );

            return null;

        }

    },

    getBook(bookId) {

        return this.books.find(

            book =>

            book.id === bookId

        );

    },

    listBooks() {

        return this.books;

    },

    unloadBook(bookId) {

        this.books =

            this.books.filter(

                book =>

                book.id !== bookId

            );

        Logger.info(

            "Book Unloaded: " +

            bookId

        );

    },

    clear() {

        this.books = [];

    }

};

window.BookService = BookService;

Object.freeze(BookService);
