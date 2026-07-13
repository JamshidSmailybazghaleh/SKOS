package com.smaily.skos.knowledge

/**
 * موجودیت اصلی دارایی دانشی
 */
data class KnowledgeAsset(

    val id: String,

    val name: String,

    val path: String,

    val type: KnowledgeAssetType,

    val size: Long,

    val createdAt: Long,

    val updatedAt: Long,

    val metadata: AssetMetadata

)
