package com.smaily.skos.pipeline

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineResult
 *
 * Represents the final result of a pipeline execution.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class PipelineResult(

    /**
     * Indicates whether execution completed successfully.
     */
    val successful: Boolean,

    /**
     * Execution duration in milliseconds.
     */
    val durationMillis: Long,

    /**
     * Optional execution message.
     */
    val message: String = "",

    /**
     * Optional output data.
     */
    val data: Any? = null,

    /**
     * Optional execution error.
     */
    val error: Throwable? = null
) {

    /**
     * Returns true if execution failed.
     */
    val failed: Boolean
        get() = !successful

    companion object {

        /**
         * Creates a successful result.
         */
        fun success(
            durationMillis: Long,
            message: String = "",
            data: Any? = null
        ): PipelineResult {

            return PipelineResult(
                successful = true,
                durationMillis = durationMillis,
                message = message,
                data = data
            )
        }

        /**
         * Creates a failed result.
         */
        fun failure(
            durationMillis: Long,
            error: Throwable,
            message: String = ""
        ): PipelineResult {

            return PipelineResult(
                successful = false,
                durationMillis = durationMillis,
                message = message,
                error = error
            )
        }
    }
}
