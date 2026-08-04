/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Communication History
 * File      : communication-history.js
 *
 * Build     : BUILD-000806.1
 * Version   : 1.0.0
 *
 * Mission:
 * Record and manage SKOS communication history.
 *
 * ==========================================================
 */


class CommunicationHistory {


    constructor(options = {}) {


        this.name =
            "Communication History";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.records =
            [];


        this.maxRecords =
            options.maxRecords || 10000;


        this.counter =
            0;


        this.options =
            options;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.addRecord(

            "SYSTEM",

            "COMMUNICATION_HISTORY_INITIALIZED",

            {}

        );


        return true;

    }





    addRecord(

        source,

        event,

        data = {}

    ) {


        this.counter++;



        const record = {


            id:

                `COMM-${String(
                    this.counter
                ).padStart(6,"0")}`,


            source,


            event,


            data,


            timestamp:

                new Date()


        };



        this.records.push(

            record

        );



        if (

            this.records.length >
            this.maxRecords

        ) {


            this.records.shift();


        }



        return record;

    }





    getRecord(

        id

    ) {


        return this.records.find(

            record =>
                record.id === id

        );

    }





    getAll() {


        return this.records;

    }





    getBySource(

        source

    ) {


        return this.records.filter(

            record =>
                record.source === source

        );

    }





    getByEvent(

        event

    ) {


        return this.records.filter(

            record =>
                record.event === event

        );

    }





    search(

        keyword

    ) {


        if (!keyword) {


            return [];

        }



        return this.records.filter(

            record =>

                JSON.stringify(
                    record
                )
                .includes(keyword)

        );

    }





    getLatest(

        count = 10

    ) {


        return this.records.slice(

            -count

        );

    }





    clear() {


        this.records = [];

        return true;

    }





    getStatistics() {


        return {


            totalRecords:

                this.records.length,


            capacity:

                this.maxRecords,


            sources:

                new Set(

                    this.records.map(

                        item =>
                            item.source

                    )

                ).size


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


            records:

                this.records.length


        };

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.addRecord(

            "SYSTEM",

            "COMMUNICATION_HISTORY_SHUTDOWN",

            {}

        );


        return true;

    }


}



module.exports =
    CommunicationHistory;
