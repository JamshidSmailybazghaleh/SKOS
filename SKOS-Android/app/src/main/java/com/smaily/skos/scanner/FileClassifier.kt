package com.smaily.skos.scanner

import com.smaily.skos.model.asset.AssetCategory
import com.smaily.skos.model.asset.AssetMetadata
import com.smaily.skos.model.asset.AssetType

/**
 * ---------------------------------------------------------
 * SKOS
 * File Classifier
 * ---------------------------------------------------------
 *
 * Classifies an asset into Category and Type.
 *
 * Technology independent.
 * ---------------------------------------------------------
 */
class FileClassifier {

    fun classify(metadata: AssetMetadata): ClassificationResult {

        val extension = metadata.extension.lowercase()

        val type = when (extension) {

            "pdf" -> AssetType.PDF
            "doc" -> AssetType.DOC
            "docx" -> AssetType.DOCX
            "txt" -> AssetType.TXT
            "md" -> AssetType.MARKDOWN
            "html","htm" -> AssetType.HTML
            "xml" -> AssetType.XML
            "json" -> AssetType.JSON

            "jpg","jpeg" -> AssetType.JPG
            "png" -> AssetType.PNG
            "gif" -> AssetType.GIF
            "bmp" -> AssetType.BMP
            "webp" -> AssetType.WEBP

            "mp3" -> AssetType.MP3
            "wav" -> AssetType.WAV
            "flac" -> AssetType.FLAC

            "mp4" -> AssetType.MP4
            "mkv" -> AssetType.MKV
            "avi" -> AssetType.AVI

            "kt" -> AssetType.KOTLIN
            "java" -> AssetType.JAVA
            "py" -> AssetType.PYTHON
            "cpp","cc","cxx" -> AssetType.CPP
            "js" -> AssetType.JAVASCRIPT
            "ts" -> AssetType.TYPESCRIPT

            "zip" -> AssetType.ZIP
            "rar" -> AssetType.RAR
            "7z" -> AssetType.SEVEN_Z

            "apk" -> AssetType.APK

            else -> AssetType.UNKNOWN
        }

        val category = when (type) {

            AssetType.PDF,
            AssetType.DOC,
            AssetType.DOCX,
            AssetType.TXT,
            AssetType.HTML,
            AssetType.XML,
            AssetType.JSON,
            AssetType.MARKDOWN ->
                AssetCategory.DOCUMENT

            AssetType.JPG,
            AssetType.PNG,
            AssetType.GIF,
            AssetType.BMP,
            AssetType.WEBP ->
                AssetCategory.IMAGE

            AssetType.MP3,
            AssetType.WAV,
            AssetType.FLAC ->
                AssetCategory.AUDIO

            AssetType.MP4,
            AssetType.MKV,
            AssetType.AVI ->
                AssetCategory.VIDEO

            AssetType.KOTLIN,
            AssetType.JAVA,
            AssetType.PYTHON,
            AssetType.CPP,
            AssetType.JAVASCRIPT,
            AssetType.TYPESCRIPT ->
                AssetCategory.SOURCE_CODE

            AssetType.ZIP,
            AssetType.RAR,
            AssetType.SEVEN_Z ->
                AssetCategory.ARCHIVE

            AssetType.APK ->
                AssetCategory.EXECUTABLE

            else ->
                AssetCategory.UNKNOWN
        }

        return ClassificationResult(category, type)
    }
}

data class ClassificationResult(
    val category: AssetCategory,
    val type: AssetType
)
