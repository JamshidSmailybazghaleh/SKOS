package com.smaily.skos.scanner

object FileClassifier {

    fun classify(

        name:String,

        statistics: ScanStatistics

    ){

        when{

            name.endsWith(".pdf",true) ->
                statistics.pdf++

            name.endsWith(".epub",true) ->
                statistics.epub++

            name.endsWith(".docx",true) ->
                statistics.docx++

            name.endsWith(".pptx",true) ->
                statistics.pptx++

            name.endsWith(".xlsx",true) ->
                statistics.xlsx++

            name.endsWith(".txt",true) ->
                statistics.txt++

            name.endsWith(".jpg",true) ||
            name.endsWith(".jpeg",true) ||
            name.endsWith(".png",true) ->
                statistics.images++

            name.endsWith(".mp3",true) ->
                statistics.audio++

            name.endsWith(".mp4",true) ->
                statistics.video++

            else ->
                statistics.unknown++

        }

        statistics.files++

    }

}
