package com.smaily.skos.common

import java.io.Serializable
import java.time.Instant
import java.util.UUID

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * SKOS Exception
 * ---------------------------------------------------------
 * Base exception class for the entire SKOS platform.
 * ---------------------------------------------------------
 */
open class SKOSException(

    override val message: String,

    val code: String = "SKOS-0000",

    val severity: Severity = Severity.ERROR,

    val component: ComponentType = ComponentType.UNKNOWN,

    override val cause: Throwable? = null

) : Exception(message, cause), Serializable {

    /**
     * Unique exception identifier.
     */
    val id: String = UUID.randomUUID().toString()

    /**
     * Time of occurrence.
     */
    val timestamp: Instant = Instant.now()

    /**
     * Returns a formatted description.
     */
    fun summary(): String {

        return buildString {

            appendLine("========== SKOS Exception ==========")
            appendLine("Id        : $id")
            appendLine("Code      : $code")
            appendLine("Severity  : $severity")
            appendLine("Component : $component")
            appendLine("Message   : $message")
            appendLine("Time      : $timestamp")

            cause?.let {
                appendLine("Cause     : ${it.message}")
            }

            appendLine("====================================")
        }
    }
}

/**
 * ---------------------------------------------------------
 * Exception Severity
 * ---------------------------------------------------------
 */
enum class Severity : Serializable {

    INFO,

    WARNING,

    ERROR,

    CRITICAL,

    FATAL
}
