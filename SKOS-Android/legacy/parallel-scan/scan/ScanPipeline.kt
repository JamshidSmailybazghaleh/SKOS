package com.smaily.skos.scan

import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext
import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.logging.LoggerService
import com.smaily.skos.pipeline.AbstractPipeline
import com.smaily.skos.statistics.PipelineStatistics


/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ScanPipeline
 *
 * First operational pipeline of SKOS.
 *
 * Responsibilities:
 * - Receive scan request
 * - Execute ScanEngine
 * - Store scan result
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class ScanPipeline(

    descriptor: ComponentDescriptor,

    configuration: Configuration,

    runtimeContext: RuntimeContext,

    logger: LoggerService,

    statistics: PipelineStatistics,

    private val scanEngine: ScanEngine

) : AbstractPipeline(

    descriptor,
    configuration,
    runtimeContext,
    logger,
    statistics

) {


    /**
     * Scan request.
     */
    private var request: ScanRequest? = null


    /**
     * Scan result.
     */
    var result: ScanResult? = null
        private set



    /**
     * Assigns scan request.
     */
    fun setRequest(
        request: ScanRequest
    ) {

        this.request = request
    }



    /**
     * Executes pipeline stage.
     */
    override fun executeStage(): Boolean {


        val currentRequest =
            request
                ?: throw IllegalStateException(
                    "ScanRequest not provided."
                )


        scanEngine.setRequest(
            currentRequest
        )


        scanEngine.execute()


        result =
            scanEngine.lastResult


        return false
    }



    override fun beforeExecution() {

        logger.info(
            "ScanPipeline preparing execution."
        )
    }



    override fun afterExecution() {

        logger.info(
            "ScanPipeline finished."
        )
    }
}
