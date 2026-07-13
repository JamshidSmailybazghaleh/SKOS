package com.smaily.skos.scanner

import java.io.File

/**
 * پیمایش بازگشتی پوشه‌ها
 */
class DirectoryWalker {

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

        scanDirectory(

            root,

            result,

            statistics

        )

        return result

    }

    /**
     * پیمایش بازگشتی
     */
    private fun scanDirectory(

        directory: File,

        result: MutableList<File>,

        statistics: ScanStatistics

    ) {

        if (!directory.exists())
            return

        if (!directory.isDirectory)
            return

        statistics.folders++

        val children = directory.listFiles()
            ?: return

        children.forEach { file ->

            if (file.isDirectory) {

                scanDirectory(

                    file,

                    result,

                    statistics

                )

            } else {

                result.add(file)

                FileClassifier.classify(

                    file.name,

                    statistics

                )

            }

        }

    }

}
