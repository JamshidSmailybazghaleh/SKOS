package com.smaily.skos.knowledge

import com.smaily.skos.scanner.FileCategory
import com.smaily.skos.scanner.FileMetadata
import java.util.UUID

/**
 * تبدیل FileMetadata به KnowledgeAsset
 */
object KnowledgeAssetBuilder {

    /**
     * ساخت یک دارایی دانشی
     */
    fun build(

        metadata: FileMetadata,

        category: FileCategory

    ): KnowledgeAsset {

        val assetType = when (category) {

            FileCategory.BOOK ->
                KnowledgeAssetType.BOOK

            FileCategory.DOCUMENT ->
                KnowledgeAssetType.DOCUMENT

            FileCategory.PRESENTATION ->
                KnowledgeAssetType.PRESENTATION

            FileCategory.SPREADSHEET ->
                KnowledgeAssetType.SPREADSHEET

            FileCategory.IMAGE ->
                KnowledgeAssetType.IMAGE

            FileCategory.AUDIO ->
                KnowledgeAssetType.AUDIO

            FileCategory.VIDEO ->
                KnowledgeAssetType.VIDEO

            FileCategory.SOURCE_CODE ->
                KnowledgeAssetType.SOURCE_CODE

            FileCategory.DATABASE ->
                KnowledgeAssetType.DATABASE

            FileCategory.ARCHIVE ->
                KnowledgeAssetType.ARCHIVE

            FileCategory.UNKNOWN ->
                KnowledgeAssetType.UNKNOWN

        }

        val assetMetadata = AssetMetadata(

            extension = metadata.extension,

            mimeType = metadata.mimeType,

            language = null,

            author = null,

            title = metadata.name,

            keywords = emptyList(),

            description = null

        )

        return KnowledgeAsset(

            id = UUID.randomUUID().toString(),

            name = metadata.name,

            path = metadata.absolutePath,

            type = assetType,

            size = metadata.size,

            createdAt = metadata.lastModified,

            updatedAt = metadata.lastModified,

            metadata = assetMetadata

        )

    }

}
