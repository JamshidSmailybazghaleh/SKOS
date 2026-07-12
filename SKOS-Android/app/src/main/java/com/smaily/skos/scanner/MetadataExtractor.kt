package com.smaily.skos.scanner

import androidx.documentfile.provider.DocumentFile

class MetadataExtractor {

    fun extract(document: DocumentFile): ScannedFile {

        return ScannedFile(

            name = document.name ?: "Unknown",

            uri = document.uri,

            mimeType = document.type,

            size = document.length(),

            isDirectory = document.isDirectory

        )

    }

}
