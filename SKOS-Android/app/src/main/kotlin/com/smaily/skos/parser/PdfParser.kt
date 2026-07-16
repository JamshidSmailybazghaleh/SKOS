package com.smaily.skos.parser

import org.apache.pdfbox.Loader
import org.apache.pdfbox.text.PDFTextStripper

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PdfParser
 *
 * Parses PDF documents using Apache PDFBox.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class PdfParser : AbstractParser() {

    override val name: String =
        "PDF Parser"

    override fun supports(
        request: ParseRequest
    ): Boolean {

        val fileName =
            request.source.fileName
                .toString()
                .lowercase()

        return fileName.endsWith(".pdf")
    }

    override fun doParse(
        request: ParseRequest
    ): ParseResult {

        Loader.loadPDF(request.source.toFile()).use { document ->

            val stripper = PDFTextStripper()

            val text = stripper.getText(document)

            val metadata = mapOf(
                "pages" to document.numberOfPages.toString()
            )

            return ParseResult.success(
                source = request.source,
                text = text,
                metadata = metadata
            )
        }
    }
}
