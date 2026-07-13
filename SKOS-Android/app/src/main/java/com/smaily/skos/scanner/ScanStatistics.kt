package com.smaily.skos.scanner

data class ScanStatistics(

    var folders: Int = 0,

    var files: Int = 0,

    var books: Int = 0,

    var documents: Int = 0,

    var presentations: Int = 0,

    var spreadsheets: Int = 0,

    var images: Int = 0,

    var audio: Int = 0,

    var video: Int = 0,

    var archives: Int = 0,

    var sourceCode: Int = 0,

    var databases: Int = 0,

    var unknown: Int = 0

)
