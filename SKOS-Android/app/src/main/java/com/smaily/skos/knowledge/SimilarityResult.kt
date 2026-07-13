package com.smaily.skos.knowledge

data class SimilarityResult(

    val duplicated: Boolean,

    val score: Double,

    val matchedAsset: KnowledgeAsset?

)
