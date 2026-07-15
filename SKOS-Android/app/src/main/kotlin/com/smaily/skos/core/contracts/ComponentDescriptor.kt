package com.smaily.skos.core.contracts

import com.smaily.skos.core.types.ComponentId
import com.smaily.skos.core.types.Version

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ComponentDescriptor
 *
 * Immutable metadata describing a SKOS component.
 *
 * Responsibilities:
 * - Unique component identification
 * - Component display information
 * - Semantic version
 * - Description
 * - Author and vendor information
 * - Category classification
 * - Component dependencies
 * - Feature flags
 *
 * This class contains metadata only and must not contain
 * any runtime or business logic.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class ComponentDescriptor(

    /**
     * Unique component identifier.
     */
    val id: ComponentId,

    /**
     * Internal component name.
     */
    val name: String,

    /**
     * Human-readable display name.
     */
    val displayName: String,

    /**
     * Semantic version.
     */
    val version: Version,

    /**
     * Short component description.
     */
    val description: String,

    /**
     * Component author.
     */
    val author: String,

    /**
     * Organization or vendor.
     */
    val vendor: String,

    /**
     * Component category.
     *
     * Examples:
     * Kernel
     * Engine
     * Service
     * Runtime
     * Pipeline
     */
    val category: String,

    /**
     * Optional tags.
     */
    val tags: Set<String> = emptySet(),

    /**
     * Component dependencies.
     *
     * References other components by their identifiers.
     */
    val dependencies: Set<ComponentId> = emptySet(),

    /**
     * Indicates whether the component is enabled.
     */
    val enabled: Boolean = true,

    /**
     * Indicates whether the component is experimental.
     */
    val experimental: Boolean = false
)
