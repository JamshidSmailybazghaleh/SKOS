/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Registry
 * File      : knowledge-registry.js
 *
 * Build     : BUILD-000600.9
 * Version   : 1.0.0
 *
 * Mission:
 * Central registry for Knowledge Objects.
 * ==========================================================
 */


class KnowledgeRegistry {


    constructor() {


        this.name =
            "Knowledge Registry";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.registry =
            new Map();


    }




    register(object) {


        if (!object.id) {

            throw new Error(
                "Knowledge Object requires id."
            );

        }



        this.registry.set(

            object.id,

            object

        );


        return true;

    }




    unregister(id) {


        return (

            this.registry.delete(id)

        );

    }




    exists(id) {


        return (

            this.registry.has(id)

        );

    }




    get(id) {


        return (

            this.registry.get(id)

            ||

            null

        );

    }




    getAll() {


        return Array.from(

            this.registry.values()

        );

    }




    search(keyword) {


        const result = [];



        for (
            const object of this.registry.values()
        ) {


            const text =

                (

                    object.title
                    ||
                    ""

                )
                .toLowerCase();



            if (

                text.includes(

                    keyword.toLowerCase()

                )

            ) {


                result.push(object);

            }


        }



        return result;

    }




    count() {


        return this.registry.size;

    }




    clear() {


        this.registry.clear();


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


            objects:

                this.registry.size


        };

    }


}



module.exports =
    KnowledgeRegistry;
