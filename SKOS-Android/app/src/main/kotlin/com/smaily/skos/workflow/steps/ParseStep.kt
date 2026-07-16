package com.smaily.skos.workflow.steps

import com.smaily.skos.parser.ParseRequest
import com.smaily.skos.parser.ParserManager
import com.smaily.skos.workflow.WorkflowContext
import com.smaily.skos.workflow.WorkflowStep

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ParseStep
 *
 * Executes document parsing.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ParseStep(

    private val parserManager: ParserManager

) : WorkflowStep {

    override val name: String =
        "Parse Document"

    override fun execute(
        context: WorkflowContext
    ) {

        val request =
            context.get<ParseRequest>("request")
                ?: error("ParseRequest not found in WorkflowContext.")

        val result =
            parserManager.parse(request)

        context.put(
            "parseResult",
            result
        )
    }
}
