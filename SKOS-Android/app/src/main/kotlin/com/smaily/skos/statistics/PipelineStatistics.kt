package com.smaily.skos.statistics

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineStatistics
 *
 * Collects execution statistics for pipelines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class PipelineStatistics {

    /**
     * Total execution count.
     */
    var executionCount: Long = 0
        private set

    /**
     * Successful executions.
     */
    var successCount: Long = 0
        private set

    /**
     * Failed executions.
     */
    var failureCount: Long = 0
        private set

    /**
     * Last execution duration in milliseconds.
     */
    var lastExecutionTime: Long = 0
        private set

    /**
     * Registers a successful execution.
     */
    fun recordSuccess(durationMillis: Long) {
        executionCount++
        successCount++
        lastExecutionTime = durationMillis
    }

    /**
     * Registers a failed execution.
     */
    fun recordFailure(durationMillis: Long) {
        executionCount++
        failureCount++
        lastExecutionTime = durationMillis
    }

    /**
     * Resets all collected statistics.
     */
    fun reset() {
        executionCount = 0
        successCount = 0
        failureCount = 0
        lastExecutionTime = 0
    }
}
