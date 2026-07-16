package com.smaily.skos.parser

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Parser
 *
 * Root contract for all SKOS parsers.
 *
 * Responsibilities:
 * - Validate parsing request
 * - Parse the source
 * - Return a standardized ParseResult
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface Parser {

    /**
     * Returns the parser name.
     */
    val name: String

    /**
     * Returns true if this parser supports the request.
     */
    fun supports(
        request: ParseRequest
    ): Boolean

    /**
     * Parses the requested source.
     */
    fun parse(
        request: ParseRequest
    ): ParseResult
}
