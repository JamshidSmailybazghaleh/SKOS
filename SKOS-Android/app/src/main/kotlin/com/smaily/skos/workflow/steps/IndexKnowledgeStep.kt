package com.smaily.skos.workflow.steps

import com.smaily.skos.knowledge.KnowledgeNode
import com.smaily.skos.search.KnowledgeIndexer
import com.smaily.skos.workflow.WorkflowContext
import com.smaily.skos.workflow.WorkflowStep

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * IndexKnowledgeStep
 *
 * Adds knowledge nodes to the search index.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class IndexKnowledgeStep(

    private val indexer: KnowledgeIndexer

) : WorkflowStep {

    override val name: String =
        "Index Knowledge"

    override fun execute(
        context: WorkflowContext
    ) {

        val nodes =
            context.get<List<KnowledgeNode>>("knowledgeNodes")
                ?: error(
                    "Knowledge nodes not found in WorkflowContext."
                )

        nodes.forEach { node ->
            indexer.index(node)
        }

        context.put(
            "indexedNodeCount",
            nodes.size
        )
    }
}
