package com.smaily.skos.workflow

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * WorkflowExecutor
 *
 * High-level workflow execution facade.
 *
 * Responsibilities:
 * - Execute workflows
 * - Delegate execution to WorkflowEngine
 * - Future extension point for scheduling,
 *   monitoring and asynchronous execution.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class WorkflowExecutor(

    private val engine: WorkflowEngine = WorkflowEngine()

) {

    /**
     * Executes a workflow definition.
     */
    fun execute(
        definition: WorkflowDefinition
    ): WorkflowResult {

        return engine.execute(definition)
    }

    /**
     * Executes multiple workflows sequentially.
     */
    fun executeAll(
        workflows: Collection<WorkflowDefinition>
    ): List<WorkflowResult> {

        return workflows.map {
            execute(it)
        }
    }
}
