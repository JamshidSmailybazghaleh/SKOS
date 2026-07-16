package com.smaily.skos.parser

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractParser
 *
 * Base implementation for all SKOS parsers.
 *
 * Responsibilities:
 * - Request validation
 * - Execution timing
 * - Error handling
 * - Template Method implementation
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
abstract class AbstractParser : Parser {

    /**
     * Parses a source using the template method pattern.
     */
    final override fun parse(
        request: ParseRequest
    ): ParseResult {

        val started = System.currentTimeMillis()

        return try {

            validate(request)

            val result = doParse(request)

            result.copy(
                durationMillis =
                    System.currentTimeMillis() - started
            )

        } catch (ex: Exception) {

            ParseResult.failure(
                source = request.source,
                message = ex.message ?: "Parser execution failed.",
                error = ex
            )
        }
    }

    /**
     * Validates the parsing request.
     */
    protected open fun validate(
        request: ParseRequest
    ) {

        require(request.source.toFile().exists()) {
            "Source does not exist: ${request.source}"
        }
    }

    /**
     * Performs the actual parsing.
     */
    protected abstract fun doParse(
        request: ParseRequest
    ): ParseResult
}
