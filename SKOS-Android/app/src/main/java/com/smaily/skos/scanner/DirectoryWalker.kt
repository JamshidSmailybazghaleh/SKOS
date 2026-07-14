package com.smaily.skos.scanner

import java.io.File

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Directory Walker
 * ---------------------------------------------------------
 *
 * Traverses directories lazily using Kotlin Sequence.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
class DirectoryWalker {

    /**
     * Walks through a directory recursively.
     *
     * Files are produced lazily.
     */
    fun walk(
        root: File,
        configuration: ScanConfiguration
    ): Sequence<File> = sequence {

        if (!root.exists())
            return@sequence

        if (root.isFile) {

            yield(root)

            return@sequence
        }

        root.walkTopDown()

            .maxDepth(configuration.maxDepth)

            .forEach { file ->

                if (!configuration.includeHiddenFiles &&
                    file.isHidden
                ) {
                    return@forEach
                }

                if (file.isFile &&
                    file.length() <= configuration.maxFileSize
                ) {

                    yield(file)

                }
            }
    }
}
