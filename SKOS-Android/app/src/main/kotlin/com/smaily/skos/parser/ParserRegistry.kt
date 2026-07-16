package com.smaily.skos.parser

import java.util.concurrent.CopyOnWriteArrayList

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ParserRegistry
 *
 * Central registry for all available parsers.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ParserRegistry {

    private val parsers =
        CopyOnWriteArrayList<Parser>()

    /**
     * Registers a parser.
     */
    fun register(parser: Parser) {
        parsers.add(parser)
    }

    /**
     * Removes a parser.
     */
    fun unregister(parser: Parser) {
        parsers.remove(parser)
    }

    /**
     * Finds the first parser that supports the request.
     */
    fun find(
        request: ParseRequest
    ): Parser? =
        parsers.firstOrNull {
            it.supports(request)
        }

    /**
     * Returns all registered parsers.
     */
    fun all(): List<Parser> =
        parsers.toList()

    /**
     * Removes all parsers.
     */
    fun clear() {
        parsers.clear()
    }

    /**
     * Number of registered parsers.
     */
    fun size(): Int =
        parsers.size
}
