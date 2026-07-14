package com.smaily.skos.registry

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Exception
 * ---------------------------------------------------------
 *
 * Base exception for all Registry operations.
 *
 * ---------------------------------------------------------
 */
open class RegistryException(

    message: String,

    cause: Throwable? = null

) : Exception(message, cause)

/**
 * Asset already exists.
 */
class DuplicateAssetException(
    message: String
) : RegistryException(message)

/**
 * Asset not found.
 */
class AssetNotFoundException(
    message: String
) : RegistryException(message)

/**
 * Invalid asset.
 */
class InvalidAssetException(
    message: String
) : RegistryException(message)

/**
 * Validation failed.
 */
class ValidationException(
    message: String
) : RegistryException(message)

/**
 * Registry storage failure.
 */
class RegistryStorageException(
    message: String,
    cause: Throwable? = null
) : RegistryException(message, cause)

/**
 * Import failure.
 */
class RegistryImportException(
    message: String,
    cause: Throwable? = null
) : RegistryException(message, cause)

/**
 * Export failure.
 */
class RegistryExportException(
    message: String,
    cause: Throwable? = null
) : RegistryException(message, cause)
