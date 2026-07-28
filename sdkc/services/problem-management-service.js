/*
====================================================
SKOS Mission Control

Problem Management Service

BUILD-000396

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class ProblemManagementService {


    constructor() {

        this.problems = [];

        this.rootCauses = [];

        this.solutions = [];

        this.initialized = false;

    }



    async initialize() {


        Logger.info(

            "Problem Management Service Initializing..."

        );


        this.initialized = true;


        return true;

    }





    createProblem(problem) {


        const record = {


            problemId:

                "PRB-" + Date.now(),


            title:

                problem.title,


            type:

                problem.type,


            description:

                problem.description || "",


            status:

                "OPEN",


            owner:

                problem.owner || "Operations",


            createdAt:

                new Date().toISOString()

        };



        this.problems.push(record);



        AuditService.record(

            "PROBLEM_CREATED",

            record

        );



        EventBusService.publish(

            "PROBLEM_CREATED",

            record,

            "problem-management-service"

        );



        return record;

    }





    analyzeRootCause(

        problemId,

        analysis

    ) {


        const problem =

            this.find(problemId);



        if (!problem) {

            throw new Error(

                "Problem Not Found."

            );

        }



        const rootCause = {


            problemId,


            cause:

                analysis.cause,


            evidence:

                analysis.evidence || [],


            analyzedBy:

                analysis.owner || "SYSTEM",


            timestamp:

                new Date().toISOString()

        };



        this.rootCauses.push(

            rootCause

        );



        problem.rootCause =

            analysis.cause;



        problem.status =

            "ANALYZED";



        AuditService.record(

            "ROOT_CAUSE_IDENTIFIED",

            rootCause

        );



        return rootCause;

    }





    registerSolution(

        problemId,

        solution

    ) {


        const record = {


            solutionId:

                "SOL-" + Date.now(),


            problemId,


            description:

                solution.description,


            type:

                solution.type || "PERMANENT",


            status:

                "PROPOSED",


            createdAt:

                new Date().toISOString()

        };



        this.solutions.push(

            record

        );



        return record;

    }





    applySolution(

        solutionId

    ) {


        const solution =

            this.solutions.find(

                item =>

                item.solutionId === solutionId

            );



        if (!solution) {

            throw new Error(

                "Solution Not Found."

            );

        }



        solution.status =

            "IMPLEMENTED";



        AuditService.record(

            "PROBLEM_SOLUTION_APPLIED",

            solution

        );



        EventBusService.publish(

            "IMPROVEMENT_TRIGGERED",

            solution,

            "problem-management-service"

        );



        return solution;

    }





    closeProblem(

        problemId

    ) {


        const problem =

            this.find(problemId);



        if(problem) {

            problem.status =

                "CLOSED";


            problem.closedAt =

                new Date().toISOString();

        }



        return problem;

    }





    find(

        problemId

    ) {


        return this.problems.find(

            item =>

            item.problemId === problemId

        );

    }





    list() {

        return this.problems;

    }





    status() {


        return {

            initialized:

                this.initialized,


            problems:

                this.problems.length,


            rootCauses:

                this.rootCauses.length,


            solutions:

                this.solutions.length

        };

    }


}



window.ProblemManagementService =

    new ProblemManagementService();



Object.freeze(

    window.ProblemManagementService

);
