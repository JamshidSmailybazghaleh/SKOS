/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Runtime
 * File : knowledge-runtime.test.js
 *
 * Build : BUILD-000600.2
 * Version : 1.0.0
 * ==========================================================
 */


const KnowledgeRuntime =
    require("../../src/knowledge/knowledge-runtime");



class MockSDKC {


    constructor() {

        this.savedObjects = [];

        this.connected = true;

    }



    isConnected() {

        return this.connected;

    }



    saveKnowledgeObject(object) {

        this.savedObjects.push(
            object
        );

        return true;

    }

}



describe(
"Knowledge Runtime Tests",
() => {


    let runtime;


    beforeEach(() => {

        runtime =
            new KnowledgeRuntime();

    });



    test(
    "Should create Knowledge Runtime",
    () => {


        expect(
            runtime
        ).toBeDefined();



        expect(
            runtime.name
        ).toBe(
            "Knowledge Runtime"
        );


    });



    test(
    "Should initialize runtime",
    () => {


        expect(
            runtime.initialize()
        )
        .toBe(true);



        expect(
            runtime.status
        )
        .toBe(
            "READY"
        );


    });



    test(
    "Should attach SDKC connector",
    () => {


        const sdkc =
            new MockSDKC();


        expect(
            runtime.attachSDKC(sdkc)
        )
        .toBe(true);



        expect(
            runtime.sdkc
        )
        .toBe(sdkc);


    });



    test(
    "Should register Knowledge Object",
    () => {


        runtime.initialize();



        const object = {

            id:
                "KO-000001",

            type:
                "CONCEPT",

            title:
                "Knowledge Runtime"

        };



        expect(
            runtime.registerKnowledgeObject(
                object
            )
        )
        .toBe(true);



        expect(
            runtime.objects.size
        )
        .toBe(1);


    });



    test(
    "Should reject invalid Knowledge Object",
    () => {


        expect(

            () =>
                runtime.registerKnowledgeObject({})

        )
        .toThrow();


    });



    test(
    "Should retrieve Knowledge Object",
    () => {


        const object = {

            id:
                "KO-000002",

            title:
                "SKOS"

        };


        runtime.registerKnowledgeObject(
            object
        );



        expect(

            runtime.getKnowledgeObject(
                "KO-000002"
            )

        )
        .toEqual(object);


    });



    test(
    "Should update Knowledge State",
    () => {


        runtime.registerKnowledgeObject({

            id:
                "KO-000003"

        });



        expect(

            runtime.updateKnowledgeState(
                "KO-000003",
                "ACTIVE"
            )

        )
        .toBe(true);



        expect(

            runtime.getKnowledgeState(
                "KO-000003"
            )

        )
        .toBe(
            "ACTIVE"
        );


    });



    test(
    "Should persist object through SDKC",
    () => {


        const sdkc =
            new MockSDKC();



        runtime.attachSDKC(
            sdkc
        );


        runtime.initialize();



        runtime.registerKnowledgeObject({

            id:
                "KO-000004",

            title:
                "SDKC Knowledge"

        });



        expect(
            sdkc.savedObjects.length
        )
        .toBe(1);


    });



    test(
    "Should list Knowledge Objects",
    () => {


        runtime.registerKnowledgeObject({

            id:
                "KO-A"

        });



        runtime.registerKnowledgeObject({

            id:
                "KO-B"

        });



        expect(

            runtime.listKnowledgeObjects()
                .length

        )
        .toBe(2);


    });



    test(
    "Should return runtime status",
    () => {


        runtime.initialize();



        const status =
            runtime.getStatus();



        expect(
            status.status
        )
        .toBe(
            "READY"
        );



        expect(
            status.objectCount
        )
        .toBe(0);


    });



    test(
    "Should shutdown runtime",
    () => {


        runtime.initialize();



        expect(
            runtime.shutdown()
        )
        .toBe(true);



        expect(
            runtime.status
        )
        .toBe(
            "SHUTDOWN"
        );


    });


});
