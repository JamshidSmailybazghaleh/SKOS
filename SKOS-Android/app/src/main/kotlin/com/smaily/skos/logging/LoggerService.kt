package com.smaily.skos.logging

import java.time.Instant

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * LoggerService
 *
 * Central logging service for SKOS.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
open class LoggerService {

    /**
     * Writes an information message.
     */
    open fun info(message: String) {

        println(
            "[INFO] ${Instant.now()} : $message"
        )
    }

    /**
     * Writes a warning message.
     */
    open fun warn(message: String) {

        println(
            "[WARN] ${Instant.now()} : $message"
        )
    }

    /**
     * Writes an error message.
     */
    open fun error(
        message: String,
        throwable: Throwable? = null
    ) {

        println(
            "[ERROR] ${Instant.now()} : $message"
        )

        throwable?.printStackTrace()
    }

    /**
     * Writes a debug message.
     */
    open fun debug(message: String) {

        println(
            "[DEBUG] ${Instant.now()} : $message"
        )
    }
}
