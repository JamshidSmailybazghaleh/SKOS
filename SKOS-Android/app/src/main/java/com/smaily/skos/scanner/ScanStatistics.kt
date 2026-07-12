package com.smaily.skos.scanner

data class ScanStatistics(

    var folders:Int = 0,

    var files:Int = 0,

    var pdf:Int = 0,

    var epub:Int = 0,

    var docx:Int = 0,

    var pptx:Int = 0,

    var xlsx:Int = 0,

    var txt:Int = 0,

    var images:Int = 0,

    var audio:Int = 0,

    var video:Int = 0,

    var unknown:Int = 0

)
