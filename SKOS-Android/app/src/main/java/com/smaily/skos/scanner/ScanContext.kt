package com.smaily.skos.scanner

data class ScanContext(

    val rootPath: String,

    val recursive: Boolean = true,

    val skipHidden: Boolean = true,

    val calculateHash: Boolean = true,

    val buildKnowledgeAssets: Boolean = true

)
