package com.smaily.skos.scanner

/**
 * طبقه‌بندی فایل‌ها بر اساس Metadata
 */
object FileClassifier {

    /**
     * تعیین دسته فایل و بروزرسانی آمار اسکن
     */
    fun classify(
        metadata: FileMetadata,
        statistics: ScanStatistics
    ): FileCategory {

        val extension = metadata.extension.lowercase()

        val mime = metadata.mimeType ?: ""

        val category = when {

            // ---------- BOOK ----------
            extension == "pdf" ||
            extension == "epub" ||
            extension == "mobi" ->

                FileCategory.BOOK

            // ---------- DOCUMENT ----------
            extension == "doc" ||
            extension == "docx" ||
            extension == "odt" ||
            extension == "rtf" ||
            extension == "txt" ->

                FileCategory.DOCUMENT

            // ---------- PRESENTATION ----------
            extension == "ppt" ||
            extension == "pptx" ||
            extension == "odp" ->

                FileCategory.PRESENTATION

            // ---------- SPREADSHEET ----------
            extension == "xls" ||
            extension == "xlsx" ||
            extension == "ods" ->

                FileCategory.SPREADSHEET

            // ---------- IMAGE ----------
            mime.startsWith("image/") ->

                FileCategory.IMAGE

            // ---------- AUDIO ----------
            mime.startsWith("audio/") ->

                FileCategory.AUDIO

            // ---------- VIDEO ----------
            mime.startsWith("video/") ->

                FileCategory.VIDEO

            // ---------- ARCHIVE ----------
            extension == "zip" ||
            extension == "rar" ||
            extension == "7z" ||
            extension == "tar" ||
            extension == "gz" ->

                FileCategory.ARCHIVE

            // ---------- SOURCE CODE ----------
            extension == "kt" ||
            extension == "java" ||
            extension == "cpp" ||
            extension == "c" ||
            extension == "h" ||
            extension == "xml" ||
            extension == "json" ||
            extension == "html" ||
            extension == "css" ||
            extension == "js" ||
            extension == "py" ->

                FileCategory.SOURCE_CODE

            // ---------- DATABASE ----------
            extension == "db" ||
            extension == "sqlite" ||
            extension == "sqlite3" ->

                FileCategory.DATABASE

            else ->

                FileCategory.UNKNOWN
        }

        when (category) {

            FileCategory.BOOK ->
                statistics.books++

            FileCategory.DOCUMENT ->
                statistics.documents++

            FileCategory.PRESENTATION ->
                statistics.presentations++

            FileCategory.SPREADSHEET ->
                statistics.spreadsheets++

            FileCategory.IMAGE ->
                statistics.images++

            FileCategory.AUDIO ->
                statistics.audio++

            FileCategory.VIDEO ->
                statistics.video++

            FileCategory.ARCHIVE ->
                statistics.archives++

            FileCategory.SOURCE_CODE ->
                statistics.sourceCode++

            FileCategory.DATABASE ->
                statistics.databases++

            FileCategory.UNKNOWN ->
                statistics.unknown++

        }

        statistics.files++

        return category

    }

}
