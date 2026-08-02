/**
 * ==========================================================
 * SKOS
 * Pipeline Integration Test
 * ==========================================================
 *
 * Build : BUILD-000035
 *
 * ==========================================================
 */


import { PipelineManager } 
from "../../subsystems/intake-engine/src/pipeline-manager";



describe(
    "SKOS Intake Pipeline Integration",
    () => {


        test(
            "Pipeline should process source document",
            () => {


                const manager =
                    new PipelineManager();



                const result =
                    manager.execute({

                        sourcePath:
                            "sample.pdf",


                        rawContent:
                            `
                            This is a sample document.

                            This document is used only
                            for pipeline integration testing.
                            `

                    });



                expect(
                    result.sourceType
                )
                .toBe(
                    "pdf"
                );



                expect(
                    result.rawContent
                )
                .toBeDefined();



            }
        );



    }
);
