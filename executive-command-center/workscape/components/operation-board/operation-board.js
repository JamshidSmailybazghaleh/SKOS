/*
==========================================================
SKOS Executive Command Center
Operation Board Component
Version : 1.0.0
Component : Operation Board
==========================================================
*/


class OperationBoard {


    constructor(){

        this.summary = {};

        this.operationList = null;

        this.executionStatus = null;

        this.workflowStatus = null;

        this.operations = [];

    }



    initialize(){


        this.summary = {

            running:
                document.getElementById(
                    "running-operations"
                ),

            pending:
                document.getElementById(
                    "pending-operations"
                ),

            completed:
                document.getElementById(
                    "completed-operations"
                ),

            failed:
                document.getElementById(
                    "failed-operations"
                )

        };



        this.operationList =
            document.getElementById(
                "operation-list"
            );



        this.executionStatus =
            document.getElementById(
                "execution-status"
            );



        this.workflowStatus =
            document.getElementById(
                "workflow-status"
            );



        this.render();


        this.registerEvents();



        console.info(
            "[Operation Board] Initialized"
        );


    }





    registerEvents(){


        /*
        Future:

        Operation Control
        Start / Stop
        Workflow Actions
        Automation Trigger
        */

    }





    render(){


        this.renderSummary();


        this.renderOperations();


        this.renderMonitoring();


    }





    renderSummary(){


        this.summary.running.innerHTML = `

            <h3>Running</h3>

            <p>0 Operations</p>

        `;



        this.summary.pending.innerHTML = `

            <h3>Pending</h3>

            <p>0 Operations</p>

        `;



        this.summary.completed.innerHTML = `

            <h3>Completed</h3>

            <p>0 Operations</p>

        `;



        this.summary.failed.innerHTML = `

            <h3>Failed</h3>

            <p>No Errors</p>

        `;


    }





    renderOperations(){


        this.operationList.innerHTML = `


            <div class="operation-item operation-pending">


                <div>


                    <strong>

                        No Operation Loaded

                    </strong>


                    <p>

                        Waiting for execution data...

                    </p>


                </div>


            </div>


        `;


    }





    renderMonitoring(){


        this.executionStatus.innerHTML = `


            <h3>

                Execution Status

            </h3>


            <p>

                Execution Engine Ready.

            </p>


        `;



        this.workflowStatus.innerHTML = `


            <h3>

                Workflow Status

            </h3>


            <p>

                Workflow Engine Waiting.

            </p>


        `;


    }





    load(operations){


        this.operations = operations;


        this.refresh();


    }





    refresh(){


        console.info(

            "[Operation Board] Refresh"

        );


        this.render();


    }





    shutdown(){


        console.info(

            "[Operation Board] Shutdown"

        );


    }


}



/* ==========================================
   Bootstrap
========================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const operationBoard =
            new OperationBoard();


        operationBoard.initialize();


    }

);
