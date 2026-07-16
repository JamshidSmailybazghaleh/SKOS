package com.smaily.skos.workflow

import java.time.Duration
import java.time.Instant

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * WorkflowResult
 *
 * Represents the result of a workflow execution.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class WorkflowResult(

    /**
     * Workflow name.
     */
    val workflowName: String,

    /**
     * Indicates whether execution succeeded.
     */
    val success: Boolean,

    /**
     * Number of executed steps.
     */
    val executedSteps: Int,

    /**
     * Workflow start time.
     */
    val startedAt: Instant,

    /**
     * Workflow finish time.
     */
    val finishedAt: Instant,

    /**
     * Total execution duration.
     */
    val duration: Duration,

    /**
     * Execution exception, if any.
     */
    val exception: Exception? = null

) {

    /**
     * Returns true if execution failed.
     */
    val failed: Boolean
        get() = !success

    /**
     * Returns execution duration in milliseconds.
     */
    val durationMillis: Long
        get() = duration.toMillis()

    /**
     * Returns true when workflow completed without errors.
     */
    fun isSuccessful(): Boolean =
        success
}
