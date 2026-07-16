package com.smaily.skos.processing

import com.smaily.skos.knowledge.KnowledgeBuilder
import com.smaily.skos.knowledge.KnowledgeRepository
import com.smaily.skos.parser.ParseRequest
import com.smaily.skos.parser.ParserManager
import com.smaily.skos.search.KnowledgeIndexer

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeProcessingCoordinator
 *
 * Coordinates the complete knowledge processing pipeline.
 *
 * Processing Flow:
 *
 * Document
 *    │
 *    ▼
 * ParserManager
 *    │
 *    ▼
 * ParseResult
 *    │
 *    ▼
 * KnowledgeBuilder
 *    │
 *    ▼
 * KnowledgeRepository
 *    │
 *    ▼
 * KnowledgeIndexer
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class KnowledgeProcessingCoordinator(

    private val parserManager: ParserManager,

    private val knowledgeBuilder: KnowledgeBuilder,

    private val repository: KnowledgeRepository,

    private val indexer: KnowledgeIndexer

) {

    /**
     * Processes a document from start to finish.
     *
     * @return Number of knowledge nodes created.
     */
    fun process(
        request: ParseRequest
    ): Int {

        // Step 1
        val parseResult =
            parserManager.parse(request)

        // Step 2
        val nodes =
            knowledgeBuilder.build(parseResult)

        // Step 3
        repository.saveNodes(nodes)

        // Step 4
        nodes.forEach {
            indexer.index(it)
        }

        return nodes.size
    }
}
