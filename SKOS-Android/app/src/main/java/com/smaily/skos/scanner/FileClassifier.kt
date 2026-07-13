package com.smaily.skos.scanner

object FileClassifier {

    fun classify(

        metadata: FileMetadata,

        statistics: ScanStatistics

    ): FileCategory {

        val extension = metadata.extension.lowercase()

        val mime = metadata.mimeType ?: ""

        val category = when {

            extension == "pdf" ||
            extension == "epub" ||
            extension == "mobi" ->

                FileCategory.BOOK

            extension == "doc" ||
            extension == "docx" ||
            extension == "odt" ->

                FileCategory.DOCUMENT

            extension == "ppt" ||
            extension == "pptx" ->

                FileCategory.PRESENTATION

            extension == "xls" ||
            extension == "xlsx" ->

                FileCategory.SPREADSHEET

            mime.startsWith("image") ->

                FileCategory.IMAGE

            mime.startsWith("audio") ->

                FileCategory.AUDIO

            mime.startsWith("video") ->

                FileCategory.VIDEO

            extension == "zip" ||
            extension == "rar" ||
            extension == "7z" ->

                FileCategory.ARCHIVE

            extension == "kt" ||
            extension == "java" ||
            extension == "cpp" ||
            extension == "xml" ||
            extension == "json" ->

                FileCategory.SOURCE_CODE

            extension == "db" ||
            extension == "sqlite" ->

                FileCategory.DATABASE

            else ->

                FileCategory.UNKNOWN

        }

        when (category) {

            FileCategory.BOOK ->
                statistics.pdf++

            FileCategory.DOCUMENT ->
                statistics.docx++

            FileCategory.PRESENTATION ->
                statistics.pptx++

            FileCategory.SPREADSHEET ->
                statistics.xlsx++

            FileCategory.IMAGE ->
                statistics.images++

            FileCategory.AUDIO ->
                statistics.audio++

            FileCategory.VIDEO ->
                statistics.video++

            FileCategory.UNKNOWN ->
                statistics.unknown++

            else -> {}

        }

        statistics.files++

        return category

    }

}
