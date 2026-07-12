data class KnowledgeAsset(

    val id: String,

    val name: String,

    val path: String,

    val type: KnowledgeAssetType,

    val size: Long,

    val modifiedTime: Long,

    val hash: String? = null,

    val metadata: AssetMetadata? = null

)
