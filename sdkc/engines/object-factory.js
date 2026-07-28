/*
====================================================
SKOS Mission Control

SDKC Object Factory

File:
object-factory.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ObjectFactory = {

    counters: {},


    initialize() {

        Logger.info(
            "Object Factory Initializing..."
        );

        return true;

    },


    create(type, title, metadata = {}) {

        const id =

            this.generateId(type);


        const now =

            new Date().toISOString();


        const object = {

            id: id,

            type: type,

            title: title,

            description:
                metadata.description || "",


            version: "1.0",


            status: "DRAFT",


            repository: "SDKC",


            metadata: {

                author:
                    metadata.author || "",

                language:
                    metadata.language || "",

                category:
                    metadata.category || "",

                tags:
                    metadata.tags || [],

                created: now,

                modified: now,

                checksum: ""

            },


            content: {},


            relations: []

        };


        Logger.info(

            "Knowledge Object Created: " +

            id

        );


        return object;

    },


    createBook(title, metadata = {}) {

        return this.create(

            "BOOK",

            title,

            metadata

        );

    },


    createDocument(title, metadata = {}) {

        return this.create(

            "DOCUMENT",

            title,

            metadata

        );

    },


    createArticle(title, metadata = {}) {

        return this.create(

            "ARTICLE",

            title,

            metadata

        );

    },


    createProject(title, metadata = {}) {

        return this.create(

            "PROJECT",

            title,

            metadata

        );

    },


    createModule(title, metadata = {}) {

        return this.create(

            "MODULE",

            title,

            metadata

        );

    },


    generateId(type) {


        if (!this.counters[type]) {

            this.counters[type] = 1;

        }

        else {

            this.counters[type]++;

        }


        return (

            type +

            "-" +

            String(

                this.counters[type]

            ).padStart(6, "0")

        );

    },


    reset() {

        this.counters = {};

    },


    status() {

        return "READY";

    }

};


window.ObjectFactory = ObjectFactory;


Object.freeze(ObjectFactory);
