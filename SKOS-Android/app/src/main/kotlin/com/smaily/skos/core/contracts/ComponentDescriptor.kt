package com.smaily.skos.core.contracts

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
 * - Version information
 * - Author/vendor information
 * - Component classification
 * - Dependency declaration
 * - Feature flags
 *
 * This class contains metadata only and must not include
 * runtime or business logic.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class ComponentDescriptor(

    /**
     * Unique component identifier.
     *
     * Examples:
     * kernel
     * pipeline
     * registry
     * knowledge
     */
    val id: String,

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
     *
     * Example:
     * 1.0.0
     */
    val version: String,

    /**
     * Short description.
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
     */
    val category: String,

    /**
     * Optional component tags.
     */
    val tags: Set<String> = emptySet(),

    /**
     * Component dependencies.
     *
     * Contains component identifiers only.
     */
    val dependencies: Set<String> = emptySet(),

    /**
     * Indicates whether the component is enabled.
     */
    val enabled: Boolean = true,

    /**
     * Indicates experimental status.
     */
    val experimental: Boolean = false
)
