package com.smaily.skos.common

import java.io.Serializable

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Global Configuration
 * ---------------------------------------------------------
 * Central configuration shared across the entire platform.
 * ---------------------------------------------------------
 */
data class Configuration(

    /**
     * General system information.
     */
    val system: SystemConfiguration = SystemConfiguration(),

    /**
     * Workspace configuration.
     */
    val workspace: WorkspaceConfiguration = WorkspaceConfiguration(),

    /**
     * Runtime configuration.
     */
    val runtime: RuntimeConfiguration = RuntimeConfiguration(),

    /**
     * Security configuration.
     */
    val security: SecurityConfiguration = SecurityConfiguration()

) : Serializable

data class SystemConfiguration(

    val applicationName: String = "SKOS Professional",

    val version: String = "0.2.0-Alpha",

    val build: String = "BUILD-000002",

    val environment: String = "DEVELOPMENT"

) : Serializable

data class WorkspaceConfiguration(

    val rootDirectory: String = "SKOS",

    val dataDirectory: String = "data",

    val cacheDirectory: String = "cache",

    val snapshotDirectory: String = "snapshots",

    val logDirectory: String = "logs"

) : Serializable

data class RuntimeConfiguration(

    val debugMode: Boolean = true,

    val loggingEnabled: Boolean = true,

    val autoSaveSnapshots: Boolean = true,

    val parallelExecution: Boolean = true,

    val workerThreads: Int = 4

) : Serializable

data class SecurityConfiguration(

    val validationEnabled: Boolean = true,

    val checksumEnabled: Boolean = true,

    val encryptionEnabled: Boolean = false

) : Serializable
