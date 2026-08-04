/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Notification Service
 * File      : notification-service.js
 *
 * Build     : BUILD-000804.1
 * Version   : 1.0.0
 *
 * Mission:
 * Manage SKOS notifications,
 * delivery status and notification history.
 *
 * ==========================================================
 */


class NotificationService {


    constructor(options = {}) {


        this.name =
            "Notification Service";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.notifications =
            [];


        this.history =
            [];


        this.channels =
            new Map();


        this.counter =
            0;


        this.options =
            options;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory(

            "NOTIFICATION_SERVICE_INITIALIZED"

        );


        return true;

    }





    registerChannel(

        channelId,

        handler

    ) {


        if (!channelId) {


            throw new Error(
                "Channel id required."
            );

        }



        if (
            typeof handler !==
            "function"
        ) {


            throw new Error(
                "Channel handler required."
            );

        }



        this.channels.set(

            channelId,

            handler

        );



        this.recordHistory(

            "CHANNEL_REGISTERED",

            {

                channelId

            }

        );



        return true;

    }





    createNotification(

        type,

        message,

        metadata = {}

    ) {


        this.counter++;



        const notification = {


            id:

                `NOTIFY-${String(
                    this.counter
                ).padStart(6,"0")}`,


            type,


            message,


            metadata,


            status:

                "CREATED",


            createdAt:

                new Date(),


            sentAt:

                null


        };



        this.notifications.push(

            notification

        );



        this.recordHistory(

            "NOTIFICATION_CREATED",

            notification

        );



        return notification;

    }





    send(

        notificationId,

        channelId

    ) {


        const notification =

            this.notifications.find(

                item =>
                    item.id === notificationId

            );



        if (!notification) {


            throw new Error(
                "Notification not found."
            );

        }



        const channel =
            this.channels.get(

                channelId

            );



        if (!channel) {


            throw new Error(
                "Channel not found."
            );

        }



        channel(

            notification

        );



        notification.status =
            "SENT";


        notification.sentAt =
            new Date();



        this.recordHistory(

            "NOTIFICATION_SENT",

            {

                notificationId,

                channelId

            }

        );



        return notification;

    }





    fail(

        notificationId,

        reason

    ) {


        const notification =

            this.notifications.find(

                item =>
                    item.id === notificationId

            );



        if (!notification) {


            throw new Error(
                "Notification not found."
            );

        }



        notification.status =
            "FAILED";


        notification.reason =
            reason || "Unknown";



        this.recordHistory(

            "NOTIFICATION_FAILED",

            notification

        );



        return notification;

    }





    getNotifications() {


        return this.notifications;

    }





    getSentNotifications() {


        return this.notifications.filter(

            item =>
                item.status === "SENT"

        );

    }





    getFailedNotifications() {


        return this.notifications.filter(

            item =>
                item.status === "FAILED"

        );

    }





    getHistory() {


        return this.history;

    }





    getStatistics() {


        return {


            total:

                this.notifications.length,


            sent:

                this.getSentNotifications()
                .length,


            failed:

                this.getFailedNotifications()
                .length,


            channels:

                this.channels.size,


            history:

                this.history.length


        };

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            notifications:

                this.notifications.length


        };

    }





    recordHistory(

        event,

        data = {}

    ) {


        this.history.push({

            event,


            data,


            timestamp:

                new Date()

        });

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordHistory(

            "NOTIFICATION_SERVICE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =
    NotificationService;
