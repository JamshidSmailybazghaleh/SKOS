package com.smaily.skos.scanner

data class FileMetadata(

    val name: String,

    val absolutePath: String,

    val extension: String,

    val size: Long,

    val lastModified: Long,

    val mimeType: String?,

    val isHidden: Boolean,

    val isReadable: Boolean,

    val isWritable: Boolean

)
