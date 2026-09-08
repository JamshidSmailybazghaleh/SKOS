package com.smaily.skos.parser

import org.apache.poi.xwpf.usermodel.XWPFDocument
import java.nio.file.Files

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * DocxParser
 *
 * Parses Microsoft Word (.docx) documents.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class DocxParser : AbstractParser() {

    override val name: String =
        "DOCX Parser"

    override fun supports(
        request: ParseRequest
    ): Boolean {

        val fileName =
            request.source.fileName
                .toString()
                .lowercase()

        return fileName.endsWith(".docx")
    }

    override fun doParse(
        request: ParseRequest
    ): ParseResult {

        Files.newInputStream(request.source).use { input ->

            XWPFDocument(input).use { document ->

                val text = buildString {

                    document.paragraphs.forEach {

                        append(it.text)
                        append('\n')
                    }
                }

                val metadata = mapOf(
                    "paragraphs" to document.paragraphs.size.toString()
                )

                return ParseResult.success(
                    source = request.source,
                    text = text,
                    metadata = metadata
                )
            }
        }
    }
}
