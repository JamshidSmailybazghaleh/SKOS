package com.smaily.skos.scanner

import com.smaily.skos.engine.MissionResult

/**
 * Scan Pipeline
 *
 * مسئول اجرای مراحل مختلف اسکن
 */
class ScanPipeline(

    private val directoryWalker: DirectoryWalker,
    private val metadataExtractor: MetadataExtractor

) {

    fun execute(

        context: ScanContext

    ): MissionResult {

        val statistics = ScanStatistics()

        try {

            // مرحله ۱
            val files = directoryWalker.walk(

                context.rootPath,

                statistics

            )

            // مرحله ۲
            files.forEach { file ->

                metadataExtractor.extract(file)

            }

            return MissionResult(

                success = true,

                message = "Scan completed.",

                processedFiles = statistics.files,

                processedFolders = statistics.folders,

                errors = 0

            )

        } catch (ex: Exception) {

            return MissionResult(

                success = false,

                message = ex.message ?: "Unknown error."

            )

        }

    }

}
