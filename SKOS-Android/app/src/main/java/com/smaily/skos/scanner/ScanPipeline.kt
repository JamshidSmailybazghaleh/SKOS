package com.smaily.skos.scanner

import com.smaily.skos.engine.MissionResult
import com.smaily.skos.knowledge.KnowledgeAssetBuilder

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

            // مرحله اول
            val files = directoryWalker.walk(

                context.rootPath,

                statistics

            )

            // مرحله دوم
            files.forEach { file ->

                // استخراج Metadata
                val metadata = metadataExtractor.extract(file)

                // طبقه‌بندی فایل
                val category = FileClassifier.classify(

                    metadata,

                    statistics

                )

                // ساخت دارایی دانشی
                val asset = KnowledgeAssetBuilder.build(

                    metadata,

                    category

                )

                // در Sprint بعدی:
                // KnowledgeRegistry.register(asset)

            }

            return MissionResult(

                success = true,

                message = "Scan completed successfully.",

                processedFiles = statistics.files,

                processedFolders = statistics.folders,

                errors = 0

            )

        } catch (ex: Exception) {

            return MissionResult(

                success = false,

                message = ex.message ?: "Unknown error.",

                processedFiles = statistics.files,

                processedFolders = statistics.folders,

                errors = 1

            )

        }

    }

}
