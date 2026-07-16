package com.smaily.skos.parser

import java.nio.file.Path

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ParseRequest
 *
 * Immutable request object for parser engines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class ParseRequest(

    /**
     * Source to parse.
     */
    val source: Path,

    /**
     * Optional parser type.
     *
     * Example:
     * pdf, md, docx, html
     */
    val parserType: String? = null,

    /**
     * Character encoding.
     */
    val encoding: String = "UTF-8",

    /**
     * Ignore parsing errors when possible.
     */
    val ignoreErrors: Boolean = false,

    /**
     * Optional metadata.
     */
    val metadata: Map<String, String> = emptyMap()
)
