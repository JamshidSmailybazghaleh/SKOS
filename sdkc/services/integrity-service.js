/*
====================================================
SKOS Mission Control

Integrity Service

File:
integrity-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const IntegrityService = {


    async initialize() {

        Logger.info(
            "Integrity Service Initializing..."
        );

        return true;

    },


    generateChecksum(object) {


        if (!object) {

            return null;

        }


        const content =

            JSON.stringify(object);


        let hash = 0;


        for (
            let i = 0;
            i < content.length;
            i++
        ) {

            const char =

                content.charCodeAt(i);


            hash =

                (

                    (hash << 5) -

                    hash +

                    char

                );


            hash = hash & hash;

        }


        return String(hash);

    },


    async updateChecksum(object) {


        const checksum =

            this.generateChecksum(object);


        if (!checksum) {

            return false;

        }


        object.metadata.checksum =

            checksum;


        object.metadata.modified =

            new Date()
            .toISOString();


        return true;

    },


    verify(object) {


        if (!object) {

            return false;

        }


        const currentChecksum =

            object.metadata.checksum;


        const generatedChecksum =

            this.generateChecksum(object);


        return (

            currentChecksum ===

            generatedChecksum

        );

    },


    compare(object, checksum) {


        const current =

            this.generateChecksum(object);


        return (

            current === checksum

        );

    },


    getStatus(object) {


        return {

            id:

                object.id,


            checksum:

                object.metadata.checksum,


            valid:

                this.verify(object)

        };

    },


    status() {

        return "READY";

    }

};


window.IntegrityService =

    IntegrityService;


Object.freeze(
    IntegrityService
);
