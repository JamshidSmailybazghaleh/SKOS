package com.smaily.skos.scanner

import com.smaily.skos.model.asset.AssetMetadata
import java.io.File
import java.nio.file.Files
import java.security.MessageDigest
import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS
 * Metadata Extractor
 * ---------------------------------------------------------
 *
 * Extracts metadata from a file and converts it into
 * AssetMetadata.
 *
 * Does not modify the original file.
 * ---------------------------------------------------------
 */
class MetadataExtractor {

    fun extract(file: File): AssetMetadata {

        val attributes = try {
            Files.readAttributes(
                file.toPath(),
                "*"
            )
        } catch (_: Exception) {
            emptyMap<String, Any>()
        }

        return AssetMetadata(

            path = file.absolutePath,

            fileName = file.name,

            extension = file.extension.lowercase(),

            mimeType = Files.probeContentType(file.toPath()),

            size = file.length(),

            sha256 = calculateSha256(file),

            createdAt = attributes["creationTime"]
                ?.let { Instant.ofEpochMilli((it as java.nio.file.attribute.FileTime).toMillis()) },

            modifiedAt = Instant.ofEpochMilli(file.lastModified()),

            lastAccessedAt = attributes["lastAccessTime"]
                ?.let { Instant.ofEpochMilli((it as java.nio.file.attribute.FileTime).toMillis()) },

            hidden = file.isHidden,

            readable = file.canRead(),

            writable = file.canWrite(),

            executable = file.canExecute()
        )
    }

    /**
     * Calculates SHA-256 fingerprint.
     */
    private fun calculateSha256(file: File): String? {

        return try {

            val digest = MessageDigest.getInstance("SHA-256")

            file.inputStream().use { input ->

                val buffer = ByteArray(8192)

                while (true) {

                    val read = input.read(buffer)

                    if (read <= 0)
                        break

                    digest.update(buffer, 0, read)
                }
            }

            digest.digest()
                .joinToString("") {
                    "%02x".format(it)
                }

        } catch (_: Exception) {

            null
        }
    }
}
