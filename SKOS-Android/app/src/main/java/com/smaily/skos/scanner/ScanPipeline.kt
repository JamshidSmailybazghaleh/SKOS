package com.smaily.skos.scanner

import com.smaily.skos.engine.MissionResult
import com.smaily.skos.knowledge.KnowledgeAssetBuilder
import com.smaily.skos.knowledge.KnowledgeRegistry

/**
 * Scan Pipeline
 *
 * مسئول اجرای کامل فرآیند اسکن
 */
class ScanPipeline(

    private val directoryWalker: DirectoryWalker,

    private val metadataExtractor: MetadataExtractor

) {

    /**
     * اجرای Pipeline اسکن
     */
    fun execute(

        context: ScanContext

    ): MissionResult {

        val statistics = ScanStatistics()

        return try {

            // مرحله 1 : پیمایش پوشه
            val files = directoryWalker.walk(

                context.rootPath,

                statistics

            )

            // مرحله 2 : پردازش فایل‌ها
            files.forEach { file ->

                // استخراج Metadata
                val metadata = metadataExtractor.extract(file)

                // طبقه‌بندی فایل
                val category = FileClassifier.classify(

                    metadata,

                    statistics

                )

                // تبدیل به Knowledge Asset
                val asset = KnowledgeAssetBuilder.build(

                    metadata,

                    category

                )

                // ثبت در Registry
                KnowledgeRegistry.register(

                    asset

                )

            }

            MissionResult(

                success = true,

                message = "Scan completed successfully.",

                processedFiles = statistics.files,

                processedFolders = statistics.folders,

                errors = 0

            )

        } catch (exception: Exception) {

            MissionResult(

                success = false,

                message = exception.message
                    ?: "Unknown scanner error.",

                processedFiles = statistics.files,

                processedFolders = statistics.folders,

                errors = 1

            )

        }

    }

}
