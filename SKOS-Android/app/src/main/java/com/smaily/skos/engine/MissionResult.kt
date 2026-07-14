package com.smaily.skos.engine

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Mission Result
 * ---------------------------------------------------------
 *
 * Represents the execution result of a mission.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class MissionResult(

    /**
     * Mission completed successfully.
     */
    val success: Boolean,

    /**
     * Final mission status.
     */
    val status: MissionStatus,

    /**
     * Optional human-readable message.
     */
    val message: String = "",

    /**
     * Number of processed items.
     */
    val processedItems: Int = 0,

    /**
     * Number of successful operations.
     */
    val successfulItems: Int = 0,

    /**
     * Number of failed operations.
     */
    val failedItems: Int = 0,

    /**
     * Mission execution start time.
     */
    val startedAt: Long = System.currentTimeMillis(),

    /**
     * Mission execution finish time.
     */
    val finishedAt: Long = System.currentTimeMillis(),

    /**
     * Optional exception.
     */
    val exception: Throwable? = null

) {

    /**
     * Execution duration in milliseconds.
     */
    val durationMillis: Long
        get() = finishedAt - startedAt

    /**
     * Returns true if execution finished without errors.
     */
    fun isSuccessful(): Boolean =
        success && status == MissionStatus.COMPLETED

    /**
     * Returns true if execution finished with warnings.
     */
    fun hasWarnings(): Boolean =
        status == MissionStatus.COMPLETED_WITH_WARNINGS

    /**
     * Returns true if execution failed.
     */
    fun hasFailed(): Boolean =
        status == MissionStatus.FAILED

    /**
     * Returns processing success rate.
     */
    fun successRate(): Double {

        if (processedItems == 0)
            return 0.0

        return successfulItems.toDouble() / processedItems.toDouble()
    }
}
