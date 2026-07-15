package com.smaily.skos.core.types

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ComponentId
 *
 * Strongly typed identifier for every SKOS component.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
@JvmInline
value class ComponentId(
    val value: String
) {

    init {
        require(value.isNotBlank()) {
            "ComponentId cannot be blank."
        }
    }

    override fun toString(): String = value
}
