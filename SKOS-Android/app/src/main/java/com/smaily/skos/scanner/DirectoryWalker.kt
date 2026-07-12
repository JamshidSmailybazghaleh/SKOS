package com.smaily.skos.scanner

import androidx.documentfile.provider.DocumentFile

class DirectoryWalker(
    private val extractor: MetadataExtractor = MetadataExtractor()
) {

    fun walk(directory: DocumentFile): List<ScannedFile> {

        val results = mutableListOf<ScannedFile>()

        if (!directory.isDirectory) {
            return results
        }

        for (file in directory.listFiles()) {
            results.add(extractor.extract(file))
        }

        return results
    }
}
