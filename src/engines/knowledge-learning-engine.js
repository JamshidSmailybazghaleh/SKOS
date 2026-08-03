/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Learning Engine
 * File        : knowledge-learning-engine.js
 *
 * Build       : BUILD-000435
 * Version     : 1.0.0
 *
 * Mission:
 * Enable knowledge learning through experience,
 * feedback, patterns, and continuous improvement signals.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeLearningEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Learning Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.experiences =
            new Map();


        this.patterns =
            new Map();


        this.feedback =
            [];


        this.learningCycles =
            [];


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_LEARNING_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Register learning experience
     */


    registerExperience(

        experienceId,

        data = {}

    ) {


        if (

            !experienceId

        ) {


            throw new Error(

                "Experience id required."

            );

        }



        const experience = {


            id:

                experienceId,


            input:

                data.input || null,


            outcome:

                data.outcome || null,


            success:

                data.success || false,


            confidence:

                data.confidence || 0,


            timestamp:

                new Date()

        };



        this.experiences.set(

            experienceId,

            experience

        );



        this.addHistory(

            "LEARNING_EXPERIENCE_REGISTERED",

            experience

        );



        return experience;

    }





    /**
     * Learn pattern from experience
     */


    learnPattern(

        patternId,

        pattern

    ) {


        if (

            !patternId

        ) {


            throw new Error(

                "Pattern id required."

            );

        }



        const record = {


            id:

                patternId,


            description:

                pattern.description || null,


            frequency:

                pattern.frequency || 0,


            reliability:

                pattern.reliability || 0,


            learned:

                true,


            createdAt:

                new Date()

        };



        this.patterns.set(

            patternId,

            record

        );



        this.addHistory(

            "PATTERN_LEARNED",

            record

        );



        return record;

    }





    /**
     * Add feedback
     */


    addFeedback(

        feedback

    ) {


        const record = {


            knowledgeId:

                feedback.knowledgeId || null,


            type:

                feedback.type || "GENERAL",


            value:

                feedback.value || null,


            timestamp:

                new Date()

        };



        this.feedback.push(

            record

        );



        this.addHistory(

            "LEARNING_FEEDBACK_RECEIVED",

            record

        );



        return record;

    }





    /**
     * Execute learning cycle
     */


    executeLearningCycle(

        data = {}

    ) {


        const cycle = {


            id:

                data.id ||

                `CYCLE-${Date.now()}`,


            experiences:

                data.experiences || [],


            improvements:

                data.improvements || [],


            status:

                "COMPLETED",


            timestamp:

                new Date()

        };



        this.learningCycles.push(

            cycle

        );



        this.addHistory(

            "LEARNING_CYCLE_COMPLETED",

            cycle

        );



        return cycle;

    }





    /**
     * Retrieve experience
     */


    getExperience(

        experienceId

    ) {


        return this.experiences.get(

            experienceId

        );

    }





    getExperiences() {


        return Array.from(

            this.experiences.values()

        );

    }





    getPatterns() {


        return Array.from(

            this.patterns.values()

        );

    }





    getFeedback() {


        return this.feedback;

    }





    getLearningCycles() {


        return this.learningCycles;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            experiences:

                this.experiences.size,


            patterns:

                this.patterns.size,


            feedback:

                this.feedback.length,


            cycles:

                this.learningCycles.length,


            successfulExperiences:

                this.getExperiences()

                    .filter(

                        item =>

                            item.success

                    )

                    .length


        };

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            experiences:

                this.experiences.size,


            patterns:

                this.patterns.size


        };

    }





    addHistory(

        event,

        data = {}

    ) {


        this.history.push(

            {

                event,


                data,


                timestamp:

                    new Date()

            }

        );



        this.recordEvent(

            event,

            data

        );

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_LEARNING_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeLearningEngine;
