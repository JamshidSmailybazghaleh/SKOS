package com.smaily.skos.parser

import java.nio.file.Path

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ParseResult
 *
 * Represents the result of a parsing operation.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class ParseResult(

    /**
     * Indicates whether parsing completed successfully.
     */
    val successful: Boolean,

    /**
     * Parsed source.
     */
    val source: Path,

    /**
     * Extracted plain text.
     */
    val text: String = "",

    /**
     * Extracted metadata.
     */
    val metadata: Map<String, String> = emptyMap(),

    /**
     * Parsing duration.
     */
    val durationMillis: Long = 0,

    /**
     * Optional message.
     */
    val message: String = "",

    /**
     * Optional parsing error.
     */
    val error: Throwable? = null
) {

    /**
     * Returns true if parsing failed.
     */
    val failed: Boolean
        get() = !successful

    /**
     * Returns true if extracted text is empty.
     */
    fun isEmpty(): Boolean =
        text.isBlank()

    companion object {

        /**
         * Creates a successful parsing result.
         */
        fun success(
            source: Path,
            text: String,
            metadata: Map<String, String> = emptyMap(),
            durationMillis: Long = 0
        ): ParseResult {

            return ParseResult(
                successful = true,
                source = source,
                text = text,
                metadata = metadata,
                durationMillis = durationMillis
            )
        }

        /**
         * Creates a failed parsing result.
         */
        fun failure(
            source: Path,
            message: String,
            error: Throwable? = null
        ): ParseResult {

            return ParseResult(
                successful = false,
                source = source,
                message = message,
                error = error
            )
        }
    }
}
