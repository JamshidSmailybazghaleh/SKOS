package com.smaily.skos.workflow.steps

import com.smaily.skos.search.KnowledgeSearchService
import com.smaily.skos.search.SearchQuery
import com.smaily.skos.search.SearchResult
import com.smaily.skos.workflow.WorkflowContext
import com.smaily.skos.workflow.WorkflowStep

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * SearchStep
 *
 * Executes a knowledge search.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class SearchStep(

    private val searchService: KnowledgeSearchService

) : WorkflowStep {

    override val name: String =
        "Search Knowledge"

    override fun execute(
        context: WorkflowContext
    ) {

        val query =
            context.get<SearchQuery>("searchQuery")
                ?: error(
                    "SearchQuery not found in WorkflowContext."
                )

        val results: List<SearchResult> =
            searchService.search(query)

        context.put(
            "searchResults",
            results
        )

        context.put(
            "resultCount",
            results.size
        )
    }
}
