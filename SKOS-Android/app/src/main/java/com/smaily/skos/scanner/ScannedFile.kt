package com.smaily.skos.scanner

import android.net.Uri

data class ScannedFile(

    val name: String,

    val uri: Uri,

    val mimeType: String?,

    val size: Long,

    val isDirectory: Boolean

)
