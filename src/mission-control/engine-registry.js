/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Engine Registry
 * File      : engine-registry.js
 *
 * Build     : BUILD-000900.3
 * Version   : 1.0.0
 *
 * ==========================================================
 */


class EngineRegistry {


    constructor() {


        this.name =
            "Engine Registry";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.engines =
            new Map();


        this.executionOrder =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        return true;

    }





    register(

        engine

    ) {


        if (!engine) {


            throw new Error(

                "Engine required."

            );

        }



        if (!engine.name) {


            throw new Error(

                "Engine name required."

            );

        }



        const record = {


            instance:

                engine,


            priority:

                100,


            status:

                "REGISTERED"

        };



        this.engines.set(

            engine.name,

            record

        );



        this.executionOrder.push(

            engine.name

        );



        return true;

    }





    unregister(

        engineName

    ) {


        this.executionOrder =

            this.executionOrder.filter(

                item =>

                    item !== engineName

            );



        return this.engines.delete(

            engineName

        );

    }





    exists(

        engineName

    ) {


        return this.engines.has(

            engineName

        );

    }





    get(

        engineName

    ) {


        const record =

            this.engines.get(

                engineName

            );



        return record

            ?

            record.instance

            :

            undefined;

    }





    getAll() {


        return Array.from(

            this.engines.values()

        )

        .map(

            item =>

                item.instance

        );

    }





    getNames() {


        return Array.from(

            this.engines.keys()

        );

    }





    getCount() {


        return this.engines.size;

    }





    setPriority(

        engineName,

        priority

    ) {


        const record =

            this.engines.get(

                engineName

            );



        if (!record) {


            throw new Error(

                "Engine not found."

            );

        }



        record.priority =
            priority;



        return true;

    }





    getExecutionOrder() {


        return [

            ...this.executionOrder

        ]

        .sort(

            (a,b)=>{


                return (

                    this.engines.get(a)
                    .priority

                    -

                    this.engines.get(b)
                    .priority

                );

            }

        );

    }





    validate() {


        const problems = [];



        for (

            const [

                name,

                record

            ]

            of

            this.engines

        ) {


            const engine =
                record.instance;



            if (

                typeof engine.initialize !==

                "function"

            ) {


                problems.push(

                    name

                );

            }

        }



        return {


            valid:

                problems.length === 0,


            problems

        };

    }





    async startAll() {


        const order =

            this.getExecutionOrder();



        for (

            const name

            of

            order

        ) {


            const engine =

                this.get(name);



            if (

                engine &&

                typeof engine.initialize ===

                "function"

            ) {


                await engine.initialize();

            }

        }



        return true;

    }





    async stopAll() {


        const order =

            this.getExecutionOrder()

            .reverse();



        for (

            const name

            of

            order

        ) {


            const engine =

                this.get(name);



            if (

                engine &&

                typeof engine.shutdown ===

                "function"

            ) {


                await engine.shutdown();

            }

        }



        return true;

    }





    reset() {


        this.engines.clear();


        this.executionOrder = [];


        return true;

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


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


            engines:

                this.engines.size

        };

    }

}


module.exports =
    EngineRegistry;
