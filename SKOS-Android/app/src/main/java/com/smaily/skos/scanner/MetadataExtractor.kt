package com.smaily.skos.scanner

import android.webkit.MimeTypeMap
import java.io.File

/**
 * استخراج اطلاعات پایه فایل
 */
class MetadataExtractor {

    fun extract(

        file: File

    ): FileMetadata {

        val extension = file.extension.lowercase()

        val mime = MimeTypeMap
            .getSingleton()
            .getMimeTypeFromExtension(extension)

        return FileMetadata(

            name = file.name,

            absolutePath = file.absolutePath,

            extension = extension,

            size = file.length(),

            lastModified = file.lastModified(),

            mimeType = mime,

            isHidden = file.isHidden,

            isReadable = file.canRead(),

            isWritable = file.canWrite()

        )

    }

}
