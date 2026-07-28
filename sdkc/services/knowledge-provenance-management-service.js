/*
====================================================
SKOS Mission Control

Knowledge Provenance Management Service

BUILD-000421

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class KnowledgeProvenanceManagementService {


    constructor() {


        this.records = [];

        this.history = [];

        this.sources = [];

        this.initialized = false;


    }





    async initialize() {


        Logger.info(

            "Knowledge Provenance Management Service Initializing..."

        );


        this.initialized = true;


        return true;

    }





    createProvenance(data) {


        const provenance = {


            provenanceId:

                "PROV-" + Date.now(),


            knowledgeId:

                data.knowledgeId,


            origin:

                data.origin || "UNKNOWN",


            creator:

                data.creator || "SYSTEM",


            source:

                data.source || null,


            createdAt:

                new Date().toISOString(),


            currentVersion:

                "1.0"


        };



        this.records.push(

            provenance

        );



        AuditService.record(

            "KNOWLEDGE_PROVENANCE_CREATED",

            provenance

        );



        return provenance;

    }





    addHistoryEvent(data) {


        const event = {


            eventId:

                "PH-" + Date.now(),


            knowledgeId:

                data.knowledgeId,


            action:

                data.action,


            actor:

                data.actor,


            description:

                data.description || "",


            timestamp:

                new Date().toISOString()


        };



        this.history.push(

            event

        );



        return event;

    }





    registerSource(data) {


        const source = {


            sourceId:

                "PSRC-" + Date.now(),


            knowledgeId:

                data.knowledgeId,


            name:

                data.name,


            type:

                data.type || "REFERENCE",


            relationship:

                data.relationship || "USED_BY",


            createdAt:

                new Date().toISOString()


        };



        this.sources.push(

            source

        );



        return source;

    }





    updateVersion(data) {


        const record =

            this.records.find(

                item =>

                item.knowledgeId === data.knowledgeId

            );



        if(record) {


            record.currentVersion =

                data.version;


        }



        return record;

    }





    getLineage(knowledgeId) {


        return {


            provenance:

                this.records.filter(

                    item =>

                    item.knowledgeId === knowledgeId

                ),


            history:

                this.history.filter(

                    item =>

                    item.knowledgeId === knowledgeId

                ),


            sources:

                this.sources.filter(

                    item =>

                    item.knowledgeId === knowledgeId

                )


        };

    }





    status() {


        return {


            initialized:

                this.initialized,


            provenanceRecords:

                this.records.length,


            historyEvents:

                this.history.length,


            sources:

                this.sources.length


        };

    }


}



window.KnowledgeProvenanceManagementService =

    new KnowledgeProvenanceManagementService();



Object.freeze(

    window.KnowledgeProvenanceManagementService

);
