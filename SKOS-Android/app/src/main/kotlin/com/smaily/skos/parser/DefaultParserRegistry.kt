package com.smaily.skos.parser

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * DefaultParserRegistry
 *
 * Registers all built-in parsers.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class DefaultParserRegistry : ParserRegistry() {

    init {

        register(MarkdownParser())

        register(PdfParser())

        register(DocxParser())

        // Future Parsers

        // register(HtmlParser())

        // register(XmlParser())

        // register(JsonParser())

        // register(TextParser())
    }
}
