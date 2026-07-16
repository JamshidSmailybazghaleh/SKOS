package com.smaily.skos.workflow.steps

import com.smaily.skos.knowledge.KnowledgeNode
import com.smaily.skos.knowledge.KnowledgeRepository
import com.smaily.skos.workflow.WorkflowContext
import com.smaily.skos.workflow.WorkflowStep

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * StoreKnowledgeStep
 *
 * Persists knowledge nodes into the repository.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class StoreKnowledgeStep(

    private val repository: KnowledgeRepository

) : WorkflowStep {

    override val name: String =
        "Store Knowledge"

    override fun execute(
        context: WorkflowContext
    ) {

        val nodes =
            context.get<List<KnowledgeNode>>("knowledgeNodes")
                ?: error(
                    "Knowledge nodes not found in WorkflowContext."
                )

        repository.saveNodes(nodes)

        context.put(
            "storedNodeCount",
            nodes.size
        )
    }
}
