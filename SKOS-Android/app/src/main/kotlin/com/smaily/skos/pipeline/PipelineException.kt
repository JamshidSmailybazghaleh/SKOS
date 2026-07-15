package com.smaily.skos.pipeline

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineException
 *
 * Base exception for all pipeline-related failures.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
open class PipelineException(

    message: String,

    cause: Throwable? = null

) : RuntimeException(message, cause)
