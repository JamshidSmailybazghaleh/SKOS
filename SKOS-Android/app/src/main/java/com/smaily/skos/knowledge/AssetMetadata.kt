package com.smaily.skos.knowledge

/**
 * اطلاعات تکمیلی دارایی دانشی
 */
data class AssetMetadata(

    val extension: String,

    val mimeType: String?,

    val language: String? = null,

    val author: String? = null,

    val title: String? = null,

    val keywords: List<String> = emptyList(),

    val description: String? = null

)
