package com.smaily.skos.workflow

/**
 * Represents a single workflow step.
 */
interface WorkflowStep {

    /**
     * Step name.
     */
    val name: String

    /**
     * Executes the step.
     */
    fun execute(
        context: WorkflowContext
    )
}
