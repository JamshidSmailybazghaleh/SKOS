package com.smaily.skos.workflow

import java.time.Duration
import java.time.Instant

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * WorkflowEngine
 *
 * Executes workflow definitions.
 *
 * Responsibilities:
 * - Workflow lifecycle
 * - Step execution
 * - Timing
 * - Error propagation
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class WorkflowEngine {

    /**
     * Executes a workflow.
     */
    fun execute(
        definition: WorkflowDefinition
    ): WorkflowResult {

        val context = WorkflowContext()

        val startedAt = Instant.now()

        var executedSteps = 0

        try {

            definition.steps().forEach { step ->

                step.execute(context)

                executedSteps++
            }

            val finishedAt = Instant.now()

            return WorkflowResult(

                workflowName = definition.name,

                success = true,

                executedSteps = executedSteps,

                startedAt = startedAt,

                finishedAt = finishedAt,

                duration = Duration.between(
                    startedAt,
                    finishedAt
                )
            )

        } catch (exception: Exception) {

            val finishedAt = Instant.now()

            return WorkflowResult(

                workflowName = definition.name,

                success = false,

                executedSteps = executedSteps,

                startedAt = startedAt,

                finishedAt = finishedAt,

                duration = Duration.between(
                    startedAt,
                    finishedAt
                ),

                exception = exception
            )
        }
    }
}
