package com.smaily.skos.recognition

import com.smaily.skos.knowledge.KnowledgeAsset

/**
 * تمام نسخه‌های یک کتاب
 */
data class BookGroup(

    val groupId: String,

    val normalizedTitle: String,

    val assets: MutableList<KnowledgeAsset> = mutableListOf()

)
