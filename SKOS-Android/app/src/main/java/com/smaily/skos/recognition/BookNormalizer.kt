package com.smaily.skos.recognition

object BookNormalizer {

    fun normalize(

        name: String

    ): String {

        return name

            .substringBeforeLast(".")

            .replace("_", " ")

            .replace("-", " ")

            .replace(Regex("\\(.*?\\)"), "")

            .replace(Regex("v\\d+"), "")

            .replace(Regex("\\d{4}"), "")

            .trim()

            .lowercase()

    }

}
