package com.smaily.skos.scan

import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.core.runtime.AbstractEngine

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ScanEngine
 *
 * Executes scan requests using FileScanner.
 *
 * Responsibilities:
 * - Validate requests
 * - Invoke FileScanner
 * - Store latest result
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ScanEngine(

    descriptor: ComponentDescriptor,

    private val scanner: FileScanner = FileScanner()

) : AbstractEngine(descriptor) {

    /**
     * Latest scan result.
     */
    var lastResult: ScanResult? = null
        private set

    /**
     * Current request.
     */
    private var request: ScanRequest? = null

    /**
     * Sets the request.
     */
    fun setRequest(
        request: ScanRequest
    ) {
        this.request = request
    }

    /**
     * Executes the engine.
     */
    override fun onExecute() {

        val currentRequest =
            request
                ?: throw IllegalStateException(
                    "ScanRequest has not been set."
                )

        lastResult =
            scanner.scan(currentRequest)
    }
}
