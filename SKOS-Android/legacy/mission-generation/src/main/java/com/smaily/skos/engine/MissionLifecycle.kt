package com.smaily.skos.engine

/**
 * چرخه استاندارد اجرای مأموریت
 */
object MissionLifecycle {

    val FLOW = listOf(

        MissionStatus.QUEUED,

        MissionStatus.WAITING,

        MissionStatus.READY,

        MissionStatus.RUNNING,

        MissionStatus.COMPLETED

    )

}
