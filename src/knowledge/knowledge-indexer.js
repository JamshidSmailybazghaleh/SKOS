/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Indexer
 * File      : knowledge-indexer.js
 *
 * Build     : BUILD-000600.11
 * Version   : 1.0.0
 *
 * Mission:
 * Create searchable indexes for Knowledge Objects.
 * ==========================================================
 */


class KnowledgeIndexer {


    constructor() {


        this.name =
            "Knowledge Indexer";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.idIndex =
            new Map();


        this.textIndex =
            new Map();


        this.typeIndex =
            new Map();

    }




    index(object) {


        if (!object.id) {

            throw new Error(
                "Knowledge Object requires id."
            );

        }



        this.idIndex.set(

            object.id,

            object

        );



        this.indexText(
            object
        );


        this.indexType(
            object
        );


        return true;

    }




    indexText(object) {


        const text =

            (

                object.title
                ||
                ""

            )
            .toLowerCase();



        if (!text)
            return;



        const words =
            text.split(" ");



        words.forEach(word => {


            if (
                !this.textIndex.has(word)
            ) {

                this.textIndex.set(

                    word,

                    []

                );

            }



            this.textIndex
                .get(word)
                .push(object.id);


        });

    }




    indexType(object) {


        const type =
            object.type
            ||
            "UNKNOWN";



        if (
            !this.typeIndex.has(type)
        ) {

            this.typeIndex.set(

                type,

                []

            );

        }



        this.typeIndex
            .get(type)
            .push(object.id);


    }




    search(keyword) {


        const key =
            keyword.toLowerCase();



        const ids =
            this.textIndex.get(key)
            ||
            [];



        return ids.map(

            id =>
                this.idIndex.get(id)

        );

    }




    findByType(type) {


        const ids =
            this.typeIndex.get(type)
            ||
            [];



        return ids.map(

            id =>
                this.idIndex.get(id)

        );

    }




    remove(id) {


        this.idIndex.delete(id);



        for (
            const values of this.textIndex.values()
        ) {

            const index =
                values.indexOf(id);



            if (
                index !== -1
            ) {

                values.splice(
                    index,
                    1
                );

            }

        }



        for (
            const values of this.typeIndex.values()
        ) {

            const index =
                values.indexOf(id);



            if (
                index !== -1
            ) {

                values.splice(
                    index,
                    1
                );

            }

        }



        return true;

    }




    count() {


        return this.idIndex.size;

    }




    getStatus() {


        return {


            name:
                this.name,


            version:
                this.version,


            status:
                this.status,


            indexedObjects:
                this.idIndex.size,


            textTerms:
                this.textIndex.size,


            types:
                this.typeIndex.size


        };

    }


}



module.exports =
    KnowledgeIndexer;
