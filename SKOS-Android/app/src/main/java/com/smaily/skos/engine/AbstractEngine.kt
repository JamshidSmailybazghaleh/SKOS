package com.smaily.skos.engine

import com.smaily.skos.common.ComponentStatus
import com.smaily.skos.common.ComponentType
import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext
import com.smaily.skos.common.Version

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Abstract Engine
 * ---------------------------------------------------------
 * Base implementation shared by every SKOS Engine.
 * ---------------------------------------------------------
 */
abstract class AbstractEngine(

    final override val name: String,

    final override val type: ComponentType,

    open val configuration: Configuration,

    open val runtime: RuntimeContext

) : Engine {

    final override val version: Version = Version.CURRENT

    final override var status: ComponentStatus =
        ComponentStatus.CREATED
        protected set

    override val priority: Int
        get() = 100

    override val supportsParallelExecution: Boolean
        get() = true

    final override fun initialize() {

        status = ComponentStatus.INITIALIZING

        onInitialize()

        status = ComponentStatus.INITIALIZED
    }

    final override fun start() {

        status = ComponentStatus.STARTING

        onStart()

        status = ComponentStatus.RUNNING
    }

    final override fun stop() {

        status = ComponentStatus.STOPPING

        onStop()

        status = ComponentStatus.STOPPED
    }

    final override fun shutdown() {

        onShutdown()

        status = ComponentStatus.STOPPED
    }

    final override fun execute() {

        if (!validate()) {
            throw IllegalStateException(
                "$name validation failed."
            )
        }

        onExecute()
    }

    final override fun reset() {

        onReset()

        status = ComponentStatus.CREATED
    }

    final override fun healthCheck(): Boolean {

        return status == ComponentStatus.RUNNING
    }

    override fun validate(): Boolean = true

    /**
     * Hook Methods
     */

    protected open fun onInitialize() {}

    protected open fun onStart() {}

    protected open fun onStop() {}

    protected open fun onShutdown() {}

    protected abstract fun onExecute()

    protected open fun onReset() {}
}
