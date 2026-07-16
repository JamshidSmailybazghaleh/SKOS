package com.smaily.skos.search

import com.smaily.skos.knowledge.KnowledgeRepository

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeSearchService
 *
 * Executes searches against the knowledge repository using the
 * KnowledgeIndexer.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class KnowledgeSearchService(

    private val repository: KnowledgeRepository,
    private val indexer: KnowledgeIndexer

) {

    /**
     * Executes a search query.
     */
    fun search(
        query: SearchQuery
    ): List<SearchResult> {

        val nodeIds = indexer.search(query)

        val results = mutableListOf<SearchResult>()

        for (id in nodeIds) {

            val node = repository.findNode(id)

            if (node != null) {

                results.add(
                    SearchResult(
                        node = node,
                        score = 1.0
                    )
                )
            }
        }

        return results
            .sortedByDescending { it.score }
            .take(query.limit)
    }
}
