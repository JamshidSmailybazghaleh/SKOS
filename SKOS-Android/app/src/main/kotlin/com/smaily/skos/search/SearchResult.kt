package com.smaily.skos.search

import com.smaily.skos.knowledge.KnowledgeNode

/**
 * Search result.
 */
data class SearchResult(

    /**
     * Matching node.
     */
    val node: KnowledgeNode,

    /**
     * Relevance score.
     */
    val score: Double
)
