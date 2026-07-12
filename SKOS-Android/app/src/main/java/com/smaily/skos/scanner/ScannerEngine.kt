package com.smaily.skos.scanner

import com.smaily.skos.engine.MissionResult

interface ScannerEngine {

    fun scanFolder(

        path: String

    ): MissionResult

}
