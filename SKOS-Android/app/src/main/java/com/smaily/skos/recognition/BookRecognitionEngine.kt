package com.smaily.skos.recognition

import com.smaily.skos.knowledge.KnowledgeAsset
import com.smaily.skos.knowledge.KnowledgeAssetType
import java.util.UUID

/**
 * موتور شناسایی کتاب‌های SKOS
 */
object BookRecognitionEngine {

    /**
     * گروه‌بندی تمام کتاب‌ها
     */
    fun buildGroups(

        assets: List<KnowledgeAsset>

    ): List<BookGroup> {

        val groups = mutableMapOf<String, BookGroup>()

        assets.forEach { asset ->

            if (asset.type != KnowledgeAssetType.BOOK)
                return@forEach

            val normalized = BookNormalizer.normalize(

                asset.name

            )

            val group = groups.getOrPut(normalized) {

                BookGroup(

                    groupId = UUID.randomUUID().toString(),

                    normalizedTitle = normalized

                )

            }

            group.assets.add(asset)

        }

        return groups.values.toList()

    }

    /**
     * تعداد کتاب‌ها
     */
    fun countBooks(

        assets: List<KnowledgeAsset>

    ): Int {

        return assets.count {

            it.type == KnowledgeAssetType.BOOK

        }

    }

    /**
     * تعداد گروه‌ها
     */
    fun countGroups(

        assets: List<KnowledgeAsset>

    ): Int {

        return buildGroups(

            assets

        ).size

    }

}
