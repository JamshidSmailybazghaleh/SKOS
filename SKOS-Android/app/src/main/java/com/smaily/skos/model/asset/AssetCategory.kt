package com.smaily.skos.model.asset

/**
 * ---------------------------------------------------------
 * SKOS
 * Asset Category
 * ---------------------------------------------------------
 *
 * High-level classification of every knowledge asset.
 *
 * Independent from file formats.
 */
enum class AssetCategory {

    /**
     * Unknown asset.
     */
    UNKNOWN,

    /**
     * Textual documents.
     */
    DOCUMENT,

    /**
     * Books.
     */
    BOOK,

    /**
     * Images.
     */
    IMAGE,

    /**
     * Audio recordings.
     */
    AUDIO,

    /**
     * Video files.
     */
    VIDEO,

    /**
     * Source code.
     */
    SOURCE_CODE,

    /**
     * Software project.
     */
    PROJECT,

    /**
     * Archive files.
     */
    ARCHIVE,

    /**
     * Dataset.
     */
    DATASET,

    /**
     * Database.
     */
    DATABASE,

    /**
     * Spreadsheet.
     */
    SPREADSHEET,

    /**
     * Presentation.
     */
    PRESENTATION,

    /**
     * Web resource.
     */
    WEB_RESOURCE,

    /**
     * Email.
     */
    EMAIL,

    /**
     * Scientific publication.
     */
    RESEARCH,

    /**
     * Artificial Intelligence model.
     */
    AI_MODEL,

    /**
     * Knowledge graph.
     */
    KNOWLEDGE_GRAPH,

    /**
     * Configuration.
     */
    CONFIGURATION,

    /**
     * Executable.
     */
    EXECUTABLE,

    /**
     * Other asset.
     */
    OTHER
}
