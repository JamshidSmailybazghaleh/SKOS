/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Operational State Manager
 * File      : operational-state-manager.js
 *
 * Build     : BUILD-000904.1
 * Version   : 1.0.0
 *
 * Mission:
 * Maintain operational state of SKOS runtime.
 *
 * ==========================================================
 */


class OperationalStateManager {


    constructor(options = {}) {


        this.name =
            "SKOS Operational State Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.options =
            options;


        this.state = {


            system:
                "CREATED",


            readiness:
                false,


            boot:
                null,


            runtime:
                null


        };



        this.components =
            new Map();



        this.snapshots =
            [];


        this.history =
            [];


    }






    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "STATE_MANAGER_INITIALIZED"

        );


        return true;

    }







    setState(

        key,

        value

    ) {


        this.state[key] =
            value;



        this.recordEvent({

            type:
                "STATE_UPDATED",

            key,

            value

        });



        return true;

    }







    getState() {


        return {

            ...this.state

        };

    }







    registerComponent(

        id,

        data = {}

    ) {


        if (!id) {


            throw new Error(

                "Component id required."

            );

        }




        this.components.set(

            id,

            {


                status:
                    data.status ||
                    "REGISTERED",


                metadata:
                    data.metadata ||
                    {}

            }

        );



        return true;

    }








    updateComponent(

        id,

        status

    ) {


        const component =

            this.components.get(id);



        if (!component) {


            throw new Error(

                "Component not found."

            );

        }



        component.status =
            status;



        this.recordEvent({

            type:
                "COMPONENT_UPDATED",

            id,

            status

        });



        return true;

    }







    getComponent(

        id

    ) {


        return this.components.get(id);

    }







    removeComponent(

        id

    ) {


        return this.components.delete(id);

    }







    getComponents() {


        return Array.from(

            this.components.entries()

        )
        .map(

            ([id,data]) => ({

                id,

                ...data

            })

        );

    }








    isReady() {


        return (

            this.state.readiness === true

        );

    }








    createSnapshot() {


        const snapshot = {


            timestamp:

                new Date(),


            state:

                this.getState(),


            components:

                this.getComponents()

        };



        this.snapshots.push(

            snapshot

        );



        return snapshot;

    }








    getSnapshots() {


        return this.snapshots;

    }








    recordEvent(

        event

    ) {


        this.history.push({

            event,

            timestamp:

                new Date()

        });


    }








    getHistory() {


        return this.history;

    }








    reset() {


        this.state = {


            system:
                "RESET",


            readiness:
                false,


            boot:
                null,


            runtime:
                null

        };



        this.components.clear();


        this.snapshots = [];


        this.history = [];



        return true;

    }








    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "STATE_MANAGER_SHUTDOWN"

        );


        return true;

    }








    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            components:

                this.components.size,


            snapshots:

                this.snapshots.length


        };

    }


}



module.exports =
OperationalStateManager;
