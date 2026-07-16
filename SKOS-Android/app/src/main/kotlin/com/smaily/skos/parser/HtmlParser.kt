package com.smaily.skos.parser

import org.jsoup.Jsoup

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * HtmlParser
 *
 * Parses HTML documents.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class HtmlParser : AbstractParser() {

    override val name: String =
        "HTML Parser"

    override fun supports(
        request: ParseRequest
    ): Boolean {

        val fileName =
            request.source.fileName
                .toString()
                .lowercase()

        return fileName.endsWith(".html") ||
               fileName.endsWith(".htm")
    }

    override fun doParse(
        request: ParseRequest
    ): ParseResult {

        val document =
            Jsoup.parse(
                request.source.toFile(),
                request.encoding
            )

        val text =
            document.text()

        val metadata = mapOf(
            "title" to document.title()
        )

        return ParseResult.success(
            source = request.source,
            text = text,
            metadata = metadata
        )
    }
}
