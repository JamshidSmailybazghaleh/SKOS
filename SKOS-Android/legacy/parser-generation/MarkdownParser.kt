package com.smaily.skos.parser

import java.nio.file.Files

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * MarkdownParser
 *
 * Parses Markdown documents.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class MarkdownParser : AbstractParser() {

    override val name: String =
        "Markdown Parser"

    override fun supports(
        request: ParseRequest
    ): Boolean {

        val fileName =
            request.source.fileName
                .toString()
                .lowercase()

        return fileName.endsWith(".md") ||
               fileName.endsWith(".markdown")
    }

    override fun doParse(
        request: ParseRequest
    ): ParseResult {

        val text =
            Files.readString(
                request.source
            )

        return ParseResult.success(
            source = request.source,
            text = text
        )
    }
}
