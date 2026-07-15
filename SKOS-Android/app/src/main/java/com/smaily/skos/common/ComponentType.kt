package com.smaily.skos.common

import java.io.Serializable

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Component Type
 * ---------------------------------------------------------
 * Defines all major component categories inside SKOS.
 * ---------------------------------------------------------
 */
enum class ComponentType : Serializable {

    /**
     * System Bootstrap
     */
    BOOTSTRAP,

    /**
     * Core Kernel
     */
    KERNEL,

    /**
     * Mission Management
     */
    MISSION,

    /**
     * Storage Scanner
     */
    SCANNER,

    /**
     * Registry Engine
     */
    REGISTRY,

    /**
     * Knowledge Processing
     */
    PROCESSING,

    /**
     * Search Engine
     */
    SEARCH,

    /**
     * Knowledge Graph
     */
    GRAPH,

    /**
     * Artificial Intelligence
     */
    AI,

    /**
     * Publication Engine
     */
    PUBLICATION,

    /**
     * Cloud Synchronization
     */
    CLOUD,

    /**
     * Security Services
     */
    SECURITY,

    /**
     * Monitoring & Statistics
     */
    MONITORING,

    /**
     * User Interface
     */
    UI,

    /**
     * Undefined component.
     */
    UNKNOWN
}
