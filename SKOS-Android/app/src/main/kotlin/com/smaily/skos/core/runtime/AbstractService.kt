package com.smaily.skos.core.runtime

import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.core.contracts.Service
import com.smaily.skos.core.lifecycle.ComponentState

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractService
 *
 * Base implementation for all infrastructure services.
 *
 * Services provide shared capabilities to engines and
 * other components.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
abstract class AbstractService(

    descriptor: ComponentDescriptor

) : AbstractComponent(descriptor), Service {

    /**
     * Indicates whether this service is available.
     */
    final override fun isAvailable(): Boolean {

        return state != ComponentState.FAILED &&
               state != ComponentState.DISPOSED
    }
}
