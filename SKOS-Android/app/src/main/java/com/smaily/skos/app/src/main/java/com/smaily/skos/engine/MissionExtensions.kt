package com.smaily.skos.engine

/**
 * آیا مأموریت پایان یافته است؟
 */
fun MissionStatus.isFinished(): Boolean {

    return this == MissionStatus.COMPLETED ||
            this == MissionStatus.FAILED ||
            this == MissionStatus.CANCELLED

}

/**
 * آیا مأموریت در حال اجرا است؟
 */
fun MissionStatus.isRunning(): Boolean {

    return this == MissionStatus.RUNNING

}

/**
 * آیا مأموریت قابل اجرا است؟
 */
fun MissionStatus.canStart(): Boolean {

    return this == MissionStatus.QUEUED ||
            this == MissionStatus.READY

}
