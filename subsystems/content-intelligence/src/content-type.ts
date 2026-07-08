/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Content Type
 *
 * Build     : BUILD-000167
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Primary content type.
 */
export enum ContentType {

    Unknown = "unknown",

    Book = "book",

    BookCover = "book-cover",

    BookSample = "book-sample",

    Manuscript = "manuscript",

    PDF = "pdf",

    Word = "word",

    Markdown = "markdown",

    Image = "image",

    Archive = "archive",

    Audio = "audio",

    Video = "video",

    Presentation = "presentation",

    Spreadsheet = "spreadsheet",

    SourceCode = "source-code"

}

/**
 * Publication lifecycle.
 */
export enum PublicationStatus {

    Draft = "draft",

    UnderPreparation = "under-preparation",

    CoverReady = "cover-ready",

    SampleReady = "sample-ready",

    ReadyForPublication = "ready-for-publication",

    PublicationQueue = "publication-queue",

    Published = "published",

    Archived = "archived"

}

/**
 * Supported languages.
 */
export enum ContentLanguage {

    Unknown = "unknown",

    Persian = "fa",

    English = "en",

    Gilaki = "glk",

    Arabic = "ar",

    Multilingual = "multi"

}

/**
 * Knowledge Asset category.
 */
export interface ContentDefinition {

    /**
     * Unique identifier.
     */
    id: string;

    /**
     * Display title.
     */
    title: string;

    /**
     * Primary content type.
     */
    type: ContentType;

    /**
     * Language.
     */
    language: ContentLanguage;

    /**
     * Publication state.
     */
    publication: PublicationStatus;

    /**
     * Optional description.
     */
    description?: string;

}
