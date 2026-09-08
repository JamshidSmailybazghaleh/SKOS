package com.smaily.skos.scanner

import androidx.documentfile.provider.DocumentFile

class FileScanner(

    private val walker: DirectoryWalker = DirectoryWalker()

) {

    fun scan(root: DocumentFile): List<ScannedFile> {

        if (!root.exists()) {
            return emptyList()
        }

        return walker.walk(root)

    }

}
