package com.smaily.skos.scan

import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.util.stream.Collectors

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * FileScanner
 *
 * Scans the file system according to a ScanRequest.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class FileScanner {

    /**
     * Executes a file scan.
     */
    fun scan(request: ScanRequest): ScanResult {

        val started = System.currentTimeMillis()

        return try {

            val stream =
                if (request.recursive) {
                    Files.walk(
                        request.root,
                        request.maxDepth
                    )
                } else {
                    Files.list(request.root)
                }

            stream.use { paths ->

                val files = paths
                    .filter { Files.isRegularFile(it) }
                    .filter { path ->
                        request.includeHidden ||
                                !Files.isHidden(path)
                    }
                    .filter { path ->

                        if (request.extensions.isEmpty())
                            return@filter true

                        val fileName =
                            path.fileName
                                .toString()

                        request.extensions.any {

                            fileName.endsWith(
                                ".$it",
                                ignoreCase = true
                            )
                        }
                    }
                    .collect(Collectors.toList())

                val duration =
                    System.currentTimeMillis() - started

                ScanResult.success(
                    root = request.root,
                    files = files,
                    scannedDirectories = 0,
                    durationMillis = duration
                )
            }

        } catch (ex: IOException) {

            ScanResult.failure(
                root = request.root,
                message = ex.message ?: "Scan failed.",
                error = ex
            )
        }
    }
}
