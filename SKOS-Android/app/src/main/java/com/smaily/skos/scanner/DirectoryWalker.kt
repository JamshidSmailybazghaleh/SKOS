package com.smaily.skos.scanner

import java.io.File

/**
 * پیمایش بازگشتی پوشه‌ها
 */
class DirectoryWalker(

    private val metadataExtractor: MetadataExtractor =
        MetadataExtractor()

) {

    /**
     * شروع پیمایش
     */
    fun walk(

        rootPath: String,

        statistics: ScanStatistics

    ): List<File> {

        val result = mutableListOf<File>()

        val root = File(rootPath)

        if (!root.exists()) {
            return result
        }

        if (!root.isDirectory) {
            return result
        }

        scanDirectory(

            directory = root,

            result = result,

            statistics = statistics

        )

        return result

    }

    /**
     * پیمایش بازگشتی پوشه‌ها
     */
    private fun scanDirectory(

        directory: File,

        result: MutableList<File>,

        statistics: ScanStatistics

    ) {

        if (!directory.exists()) return

        if (!directory.isDirectory) return

        statistics.folders++

        val children = directory.listFiles()
            ?: return

        for (child in children) {

            if (child.isDirectory) {

                scanDirectory(

                    directory = child,

                    result = result,

                    statistics = statistics

                )

            } else {

                result.add(child)

                // استخراج Metadata
                val metadata =
                    metadataExtractor.extract(child)

                // طبقه‌بندی فایل
                FileClassifier.classify(

                    metadata,

                    statistics

                )

            }

        }

    }

}
