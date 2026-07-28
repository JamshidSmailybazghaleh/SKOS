/*
====================================================
SKOS Mission Control

Scheduler Service

BUILD-000383

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class SchedulerService {


    constructor() {

        this.tasks = new Map();

        this.executions = [];

        this.initialized = false;

    }



    async initialize() {

        Logger.info(

            "Scheduler Service Initializing..."

        );


        this.initialized = true;


        return true;

    }



    createTask(task) {


        if (!task.taskId) {

            task.taskId =
                "TASK-" + Date.now();

        }


        task.status =

            task.status || "ACTIVE";


        this.tasks.set(

            task.taskId,

            task

        );


        return task;

    }



    async execute(taskId) {


        const task =

            this.tasks.get(taskId);



        if (!task) {

            throw new Error(

                "Task Not Found."

            );

        }



        const execution = {


            executionId:

                "JOB-" + Date.now(),


            taskId,


            startedAt:

                new Date().toISOString(),


            status:

                "RUNNING"

        };



        this.executions.push(

            execution

        );



        /*
        اجرای واقعی Task
        در نسخه‌های بعدی:
        Worker Engine
        */

        execution.status =

            "COMPLETED";


        execution.completedAt =

            new Date().toISOString();



        task.lastRun =

            execution.completedAt;



        EventBusService.publish(

            "TASK_COMPLETED",

            execution,

            "scheduler-service"

        );



        AuditService.record(

            "SCHEDULE_TASK_EXECUTED",

            execution

        );



        return execution;

    }



    async schedule(taskId, cron) {


        const task =

            this.tasks.get(taskId);



        if (!task) {

            throw new Error(

                "Task Not Found."

            );

        }



        task.schedule = cron;



        return task;

    }



    listTasks() {

        return Array.from(

            this.tasks.values()

        );

    }



    getExecutions() {

        return this.executions;

    }



    status() {

        return {

            initialized:

                this.initialized,


            tasks:

                this.tasks.size,


            executions:

                this.executions.length

        };

    }


}



window.SchedulerService =

    new SchedulerService();



Object.freeze(

    window.SchedulerService

);
