/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Publication
 * Module    : Digital Library Connector
 *
 * Build     : BUILD-000153
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { LibraryBook }
from "./library-book";

import { SyncResult }
from "./sync-result";

import { PublicationStatus }
from "./publication-status";

export class DigitalLibraryConnector {

    private readonly books:

        LibraryBook[] = [];

    /**
     * Register approved book.
     */
    public register(

        book: LibraryBook

    ): void {

        if (

            book.status ===

            PublicationStatus.APPROVED ||

            book.status ===

            PublicationStatus.QUEUED ||

            book.status ===

            PublicationStatus.PUBLISHED

        ) {

            this.books.push(book);

        }

    }

    /**
     * Synchronize.
     */
    public synchronize():

        SyncResult {

        return {

            success: true,

            totalBooks:

                this.books.length,

            synchronizedBooks:

                this.books.length

        };

    }

    /**
     * Get all books.
     */
    public getBooks():

        LibraryBook[] {

        return [...this.books];

    }

}
