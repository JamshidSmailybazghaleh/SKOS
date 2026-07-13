package com.smaily.skos.scanner

import com.smaily.skos.engine.MissionResult

/**
 * موتور اصلی اسکن SKOS
 */
interface ScannerEngine {

    /**
     * شروع اسکن یک پوشه
     */
    fun scanFolder(

        path: String

    ): MissionResult

    /**
     * توقف اسکن
     */
    fun stop()

    /**
     * توقف موقت
     */
    fun pause()

    /**
     * ادامه اسکن
     */
    fun resume()

    /**
     * آیا اسکن در حال اجرا است؟
     */
    fun isRunning(): Boolean

}
