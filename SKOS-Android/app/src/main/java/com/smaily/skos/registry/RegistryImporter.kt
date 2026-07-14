package com.smaily.skos.registry

import java.io.File

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Importer
 * ---------------------------------------------------------
 *
 * Imports Registry snapshots from external sources.
 *
 * Supports:
 * - JSON
 * - XML
 * - CSV
 * - SQLite
 * - SKOS Archive (.ska)
 *
 * ---------------------------------------------------------
 */
interface RegistryImporter {

    /**
     * Imports a Registry Snapshot.
     */
    fun import(
        source: File,
        format: ExportFormat
    ): RegistrySnapshot
}
