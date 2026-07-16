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
/**
 * Returns true if any registered parser supports the request.
 */
fun canParse(
    request: ParseRequest
): Boolean {

    return parsers.any {
        it.supports(request)
    }
}
   /**
 * Registers multiple parsers.
 */
fun registerAll(
    parsers: Collection<Parser>
) {

    parsers.forEach(::register)
}
/**
 * Returns the number of registered parsers.
 */
fun parserCount(): Int {

    return parsers.size
}
/**
 * Returns all registered parsers.
 */
fun registeredParsers(): List<Parser> {

    return parsers.toList()
}
/**
 * Removes all registered parsers.
 */
fun clear() {

    parsers.clear()
}
/**
 * Returns the first parser that supports the request.
 */
fun findParser(
    request: ParseRequest
): Parser? {

    return parsers.firstOrNull {
        it.supports(request)
    }
}
}
