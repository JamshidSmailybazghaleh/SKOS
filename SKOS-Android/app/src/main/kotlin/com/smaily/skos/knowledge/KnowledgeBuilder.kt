package com.smaily.skos.knowledge

import com.smaily.skos.parser.ParseResult

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeBuilder
 *
 * Converts ParseResult into KnowledgeNodes.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class KnowledgeBuilder {

    /**
     * Builds knowledge nodes from parsed content.
     */
    fun build(
        result: ParseResult
    ): List<KnowledgeNode> {

        if (result.failed || result.isEmpty()) {
            return emptyList()
        }

        val node = KnowledgeNode(
            title = result.metadata["title"]
                ?: result.source.fileName.toString(),
            content = result.text,
            type = NodeType.DOCUMENT,
            metadata = result.metadata
        )

        return listOf(node)
    }
}
