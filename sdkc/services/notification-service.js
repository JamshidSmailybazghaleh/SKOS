/*
====================================================
SKOS Mission Control

Notification Service

BUILD-000380

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

class NotificationService {

    constructor() {

        this.notifications = [];

        this.channels = new Map();

        this.templates = new Map();

        this.initialized = false;

    }


    async initialize() {

        Logger.info(
            "Notification Service Initializing..."
        );

        this.registerDefaultChannels();

        this.initialized = true;

        return true;

    }


    registerChannel(
        name,
        handler
    ) {

        this.channels.set(
            name,
            handler
        );

    }


    registerTemplate(
        type,
        template
    ) {

        this.templates.set(
            type,
            template
        );

    }


    async send(notification) {

        const item = {

            notificationId:

                "NOT-" + Date.now(),

            type:

                notification.type,

            recipient:

                notification.recipient,

            channel:

                notification.channel ||
                "INTERNAL",

            message:

                notification.message,

            createdAt:

                new Date().toISOString(),

            status:

                "PENDING"

        };


        const sender =

            this.channels.get(
                item.channel
            );


        if (sender) {

            await sender(item);

            item.status = "SENT";

        }
        else {

            item.status = "QUEUED";

        }


        this.notifications.push(item);


        AuditService.record(

            "NOTIFICATION_SENT",

            item

        );


        return item;

    }


    async broadcast(
        type,
        message
    ) {

        return this.send({

            type,

            recipient:
                "ALL",

            channel:
                "DASHBOARD",

            message

        });

    }


    registerDefaultChannels() {


        this.registerChannel(

            "DASHBOARD",

            async notification => {

                Logger.info(

                    "Dashboard Notification: " +

                    notification.message

                );

            }

        );


        this.registerChannel(

            "INTERNAL",

            async notification => {

                Logger.info(

                    "Internal Notification: " +

                    notification.message

                );

            }

        );

    }


    getAll() {

        return this.notifications;

    }


    getByType(type) {

        return this.notifications.filter(

            item =>
                item.type === type

        );

    }


    status() {

        return {

            initialized:

                this.initialized,

            notifications:

                this.notifications.length,

            channels:

                this.channels.size

        };

    }

}


window.NotificationService =

    new NotificationService();


Object.freeze(
    window.NotificationService
);
