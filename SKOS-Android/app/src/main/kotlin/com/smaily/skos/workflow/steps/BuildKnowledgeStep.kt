package com.smaily.skos.workflow.steps

import com.smaily.skos.knowledge.KnowledgeBuilder
import com.smaily.skos.parser.ParseResult
import com.smaily.skos.workflow.WorkflowContext
import com.smaily.skos.workflow.WorkflowStep

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * BuildKnowledgeStep
 *
 * Converts ParseResult into KnowledgeNode objects.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class BuildKnowledgeStep(

    private val knowledgeBuilder: KnowledgeBuilder

) : WorkflowStep {

    override val name: String =
        "Build Knowledge"

    override fun execute(
        context: WorkflowContext
    ) {

        val parseResult =
            context.get<ParseResult>("parseResult")
                ?: error(
                    "ParseResult not found in WorkflowContext."
                )

        val nodes =
            knowledgeBuilder.build(parseResult)

        context.put(
            "knowledgeNodes",
            nodes
        )
    }
}
