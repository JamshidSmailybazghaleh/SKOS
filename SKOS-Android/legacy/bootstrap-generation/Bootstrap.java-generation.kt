package com.smaily.skos.bootstrap

import java.time.Duration
import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Bootstrap
 * ---------------------------------------------------------
 * Initializes the SKOS runtime environment.
 *
 * Version : Alpha 0.1
 * ---------------------------------------------------------
 */
class Bootstrap(

    private val configuration: BootstrapConfiguration

) {

    /**
     * Starts the bootstrap process.
     */
    fun start(): BootstrapContext {

        val context = BootstrapContext(
            configuration = configuration
        )

        context.status = BootstrapStatus.RUNNING

        val startTime = Instant.now()

        try {

            loadConfiguration(context)

            initializeKernel(context)

            initializeEngines(context)

            verifySystem(context)

            context.elapsedTimeMillis =
                Duration.between(startTime, Instant.now()).toMillis()

            context.complete()

        } catch (exception: Exception) {

            context.elapsedTimeMillis =
                Duration.between(startTime, Instant.now()).toMillis()

            context.fail(
                exception.message ?: "Unknown bootstrap error."
            )

            throw exception
        }

        return context
    }

    /**
     * Loads bootstrap configuration.
     */
    private fun loadConfiguration(
        context: BootstrapContext
    ) {

        context.moveTo(
            BootstrapStage.LOADING_CONFIGURATION,
            20,
            "Loading configuration..."
        )

    }

    /**
     * Initializes Kernel.
     */
    private fun initializeKernel(
        context: BootstrapContext
    ) {

        context.moveTo(
            BootstrapStage.INITIALIZING_KERNEL,
            45,
            "Initializing Kernel..."
        )

    }

    /**
     * Initializes registered engines.
     */
    private fun initializeEngines(
        context: BootstrapContext
    ) {

        context.moveTo(
            BootstrapStage.INITIALIZING_ENGINES,
            75,
            "Initializing Engines..."
        )

    }

    /**
     * Final verification.
     */
    private fun verifySystem(
        context: BootstrapContext
    ) {

        context.moveTo(
            BootstrapStage.VERIFYING_SYSTEM,
            95,
            "Verifying system..."
        )

    }

}
