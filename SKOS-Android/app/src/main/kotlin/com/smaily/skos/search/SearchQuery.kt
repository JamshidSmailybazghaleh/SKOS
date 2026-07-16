package com.smaily.skos.search

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * SearchQuery
 *
 * Represents a search request.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class SearchQuery(

    /**
     * Search text.
     */
    val text: String,

    /**
     * Maximum number of results.
     */
    val limit: Int = 20,

    /**
     * Case-sensitive search.
     */
    val caseSensitive: Boolean = false,

    /**
     * Search in tags.
     */
    val includeTags: Boolean = true,

    /**
     * Search in metadata.
     */
    val includeMetadata: Boolean = false
)
