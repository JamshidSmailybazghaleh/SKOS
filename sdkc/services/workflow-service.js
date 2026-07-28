/*
====================================================
SKOS Mission Control

Workflow Service

BUILD-000382

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class WorkflowService {


    constructor() {

        this.workflows = new Map();

        this.executions = new Map();

        this.initialized = false;

    }



    async initialize() {

        Logger.info(

            "Workflow Service Initializing..."

        );


        this.initialized = true;


        return true;

    }



    createWorkflow(workflow) {


        this.workflows.set(

            workflow.workflowId,

            workflow

        );


        return workflow;

    }



    async execute(

        workflowId,

        context = {}

    ) {


        const workflow =

            this.workflows.get(

                workflowId

            );


        if (!workflow) {

            throw new Error(

                "Workflow Not Found."

            );

        }



        const execution = {


            executionId:

                "EXE-" + Date.now(),


            workflowId,


            status:

                "RUNNING",


            startedAt:

                new Date().toISOString(),


            steps: []

        };



        this.executions.set(

            execution.executionId,

            execution

        );



        for (

            const step of workflow.steps

        ) {


            await this.executeStep(

                step,

                context,

                execution

            );


        }



        execution.status = "COMPLETED";


        execution.completedAt =

            new Date().toISOString();



        EventBusService.publish(

            "WORKFLOW_COMPLETED",

            execution,

            "workflow-service"

        );



        return execution;

    }



    async executeStep(

        step,

        context,

        execution

    ) {


        Logger.info(

            "Executing step: " + step

        );


        execution.steps.push({

            step,

            status:

                "COMPLETED",

            timestamp:

                new Date().toISOString()

        });



        return true;

    }



    getExecution(id) {


        return this.executions.get(

            id

        );

    }



    listWorkflows() {

        return Array.from(

            this.workflows.values()

        );

    }



    status() {

        return {

            initialized:

                this.initialized,


            workflows:

                this.workflows.size,


            executions:

                this.executions.size

        };

    }


}



window.WorkflowService =

    new WorkflowService();



Object.freeze(

    window.WorkflowService

);
