package com.smaily.skos.engine

import com.smaily.skos.common.ComponentType
import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Scanner Engine
 * ---------------------------------------------------------
 * Coordinates the scanning pipeline.
 * ---------------------------------------------------------
 */
class ScannerEngine(

    configuration: Configuration,
    runtime: RuntimeContext

) : AbstractEngine(

    name = "Scanner Engine",
    type = ComponentType.SCANNER,
    configuration = configuration,
    runtime = runtime

) {

    override val priority: Int
        get() = 20

    override val supportsParallelExecution: Boolean
        get() = true

    override fun validate(): Boolean {
        return true
    }

    override fun onInitialize() {
        // Initialize scanner resources
    }

    override fun onStart() {
        // Prepare scanner
    }

    override fun onExecute() {

        /*
         * Future implementation:
         *
         * ScanPipeline.execute()
         *
         */

    }

    override fun onStop() {
        // Stop scanner
    }

    override fun onShutdown() {
        // Release scanner resources
    }

    override fun onReset() {
        // Reset scanner state
    }

}
