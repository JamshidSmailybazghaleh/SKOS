package com.smaily.skos.bootstrap

import java.io.Serializable

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Bootstrap Configuration
 * ---------------------------------------------------------
 * Responsible for initializing the SKOS runtime.
 *
 * Version : Alpha 0.1
 * Author  : SKOS Architecture
 * ---------------------------------------------------------
 */

data class BootstrapConfiguration(

    /**
     * System Information
     */
    val system: SystemConfiguration = SystemConfiguration(),

    /**
     * Workspace Configuration
     */
    val workspace: WorkspaceConfiguration = WorkspaceConfiguration(),

    /**
     * Engine Configuration
     */
    val engines: EngineConfiguration = EngineConfiguration(),

    /**
     * Runtime Configuration
     */
    val runtime: RuntimeConfiguration = RuntimeConfiguration(),

    /**
     * Security Configuration
     */
    val security: SecurityConfiguration = SecurityConfiguration()

) : Serializable

/**
 * ---------------------------------------------------------
 * System Configuration
 * ---------------------------------------------------------
 */
data class SystemConfiguration(

    val applicationName: String = "SKOS Professional",

    val versionName: String = "0.1.0-Alpha",

    val buildNumber: Int = 1,

    val environment: Environment = Environment.DEVELOPMENT

) : Serializable

/**
 * ---------------------------------------------------------
 * Workspace Configuration
 * ---------------------------------------------------------
 */
data class WorkspaceConfiguration(

    val workspaceDirectory: String = "SKOS",

    val snapshotDirectory: String = "snapshots",

    val logDirectory: String = "logs",

    val cacheDirectory: String = "cache",

    val temporaryDirectory: String = "temp"

) : Serializable

/**
 * ---------------------------------------------------------
 * Engine Configuration
 * ---------------------------------------------------------
 */
data class EngineConfiguration(

    val missionEnabled: Boolean = true,

    val scannerEnabled: Boolean = true,

    val registryEnabled: Boolean = true,

    val processingEnabled: Boolean = true,

    val searchEnabled: Boolean = false,

    val graphEnabled: Boolean = false,

    val aiEnabled: Boolean = false,

    val publicationEnabled: Boolean = false

) : Serializable

/**
 * ---------------------------------------------------------
 * Runtime Configuration
 * ---------------------------------------------------------
 */
data class RuntimeConfiguration(

    val debugMode: Boolean = true,

    val loggingEnabled: Boolean = true,

    val autoSnapshot: Boolean = true,

    val autoScan: Boolean = false,

    val parallelProcessing: Boolean = true,

    val maxWorkerThreads: Int = 4

) : Serializable

/**
 * ---------------------------------------------------------
 * Security Configuration
 * ---------------------------------------------------------
 */
data class SecurityConfiguration(

    val validationEnabled: Boolean = true,

    val verifyChecksums: Boolean = true,

    val verifyDigitalSignature: Boolean = false,

    val encryptedSnapshots: Boolean = false

) : Serializable

/**
 * ---------------------------------------------------------
 * Runtime Environment
 * ---------------------------------------------------------
 */
enum class Environment {

    DEVELOPMENT,

    TEST,

    PRODUCTION

}
