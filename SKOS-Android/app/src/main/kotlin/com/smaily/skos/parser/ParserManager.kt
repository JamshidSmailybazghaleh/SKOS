package com.smaily.skos.parser

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ParserManager
 *
 * Coordinates parser selection and execution.
 *
 * Responsibilities:
 * - Select the appropriate parser
 * - Execute parsing
 * - Return standardized ParseResult
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ParserManager(

    private val registry: ParserRegistry

) {

    /**
     * Parses the requested source.
     */
    fun parse(
        request: ParseRequest
    ): ParseResult {

        val parser =
            registry.find(request)
                ?: return ParseResult.failure(
                    source = request.source,
                    message = "No suitable parser found."
                )

        return parser.parse(request)
    }

    /**
     * Returns true if a parser exists for the request.
     */
    fun canParse(
        request: ParseRequest
    ): Boolean {

        return registry.find(request) != null
    }
}
