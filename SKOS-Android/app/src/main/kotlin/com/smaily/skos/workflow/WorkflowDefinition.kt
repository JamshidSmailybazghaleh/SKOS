package com.smaily.skos.workflow

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * WorkflowDefinition
 *
 * Defines an executable workflow.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class WorkflowDefinition(

    /**
     * Workflow name.
     */
    val name: String

) {

    /**
     * Ordered workflow steps.
     */
    private val steps =
        mutableListOf<WorkflowStep>()

    /**
     * Adds a workflow step.
     */
    fun addStep(
        step: WorkflowStep
    ): WorkflowDefinition {

        steps.add(step)

        return this
    }

    /**
     * Adds multiple workflow steps.
     */
    fun addSteps(
        workflowSteps: Collection<WorkflowStep>
    ): WorkflowDefinition {

        steps.addAll(workflowSteps)

        return this
    }

    /**
     * Returns all workflow steps.
     */
    fun steps(): List<WorkflowStep> {

        return steps.toList()
    }

    /**
     * Number of workflow steps.
     */
    fun stepCount(): Int {

        return steps.size
    }

    /**
     * Returns true if no steps exist.
     */
    fun isEmpty(): Boolean {

        return steps.isEmpty()
    }

    /**
     * Removes all workflow steps.
     */
    fun clear() {

        steps.clear()
    }
}
