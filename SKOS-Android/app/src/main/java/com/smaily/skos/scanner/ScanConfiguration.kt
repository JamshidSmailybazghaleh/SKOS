package com.smaily.skos.scanner

data class ScanConfiguration(

    val maxDepth: Int = Int.MAX_VALUE,

    val maxFileSizeMB: Long = 1024,

    val followLinks: Boolean = false,

    val stopOnError: Boolean = false

)
