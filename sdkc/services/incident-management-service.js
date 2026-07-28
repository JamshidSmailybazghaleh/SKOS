/*
====================================================
SKOS Mission Control

Incident Management Service

BUILD-000395

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class IncidentManagementService {


    constructor() {

        this.incidents = [];

        this.assignments = [];

        this.initialized = false;

    }



    async initialize() {


        Logger.info(

            "Incident Management Service Initializing..."

        );


        this.initialized = true;


        return true;

    }




    createIncident(

        incident

    ) {


        const record = {


            incidentId:

                "INC-" + Date.now(),


            title:

                incident.title,


            type:

                incident.type,


            severity:

                incident.severity || "P3",


            description:

                incident.description || "",


            status:

                "OPEN",


            owner:

                incident.owner || "Operations",


            createdAt:

                new Date().toISOString()

        };



        this.incidents.push(

            record

        );



        AuditService.record(

            "INCIDENT_CREATED",

            record

        );



        EventBusService.publish(

            "INCIDENT_CREATED",

            record,

            "incident-management-service"

        );



        return record;

    }





    assign(

        incidentId,

        team

    ) {


        const assignment = {


            incidentId,


            team,


            assignedAt:

                new Date().toISOString()

        };



        this.assignments.push(

            assignment

        );



        return assignment;

    }





    updateStatus(

        incidentId,

        status

    ) {


        const incident =

            this.find(

                incidentId

            );



        if (!incident) {

            throw new Error(

                "Incident Not Found."

            );

        }



        incident.status = status;



        if (

            status === "RESOLVED"

        ) {


            incident.resolvedAt =

                new Date().toISOString();

        }



        AuditService.record(

            "INCIDENT_STATUS_UPDATED",

            incident

        );



        return incident;

    }





    resolve(

        incidentId,

        solution

    ) {


        const incident =

            this.find(

                incidentId

            );



        if (!incident) {

            throw new Error(

                "Incident Not Found."

            );

        }



        incident.status =

            "RESOLVED";


        incident.solution =

            solution;


        incident.resolvedAt =

            new Date().toISOString();



        EventBusService.publish(

            "INCIDENT_RESOLVED",

            incident,

            "incident-management-service"

        );



        return incident;

    }





    close(

        incidentId

    ) {


        const incident =

            this.find(

                incidentId

            );



        if (incident) {

            incident.status =

                "CLOSED";

        }


        return incident;

    }





    find(

        incidentId

    ) {


        return this.incidents.find(

            item =>

            item.incidentId === incidentId

        );

    }





    list() {


        return this.incidents;

    }





    getOpenIncidents() {


        return this.incidents.filter(

            item =>

            item.status !== "CLOSED"

        );

    }





    status() {


        return {

            initialized:

                this.initialized,


            incidents:

                this.incidents.length,


            open:

                this.getOpenIncidents().length

        };

    }


}



window.IncidentManagementService =

    new IncidentManagementService();



Object.freeze(

    window.IncidentManagementService

);
