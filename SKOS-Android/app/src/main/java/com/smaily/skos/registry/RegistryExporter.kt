package com.smaily.skos.registry

import java.io.File

/**
 * Exports Registry into external formats.
 */
interface RegistryExporter {

    /**
     * Export Registry Snapshot.
     */
    fun export(
        snapshot: RegistrySnapshot,
        destination: File,
        format: ExportFormat
    )
}
