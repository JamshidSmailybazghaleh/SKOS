package com.smaily.skos.recognition

import com.smaily.skos.knowledge.KnowledgeAsset

data class MasterEditionResult(

    val master: KnowledgeAsset,

    val score: EditionScore,

    val alternatives: List<KnowledgeAsset>

)
