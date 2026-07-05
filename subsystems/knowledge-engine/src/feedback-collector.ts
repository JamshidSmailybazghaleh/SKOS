/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning Engine
 * Module    : Feedback Collector
 *
 * Build     : BUILD-000058
 * Sprint    : Sprint 05
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Feedback {

    id: string;

    source: string;

    category: string;

    message: string;

    score: number;

    createdAt: Date;

}

export class FeedbackCollector {

    private readonly feedbacks: Feedback[] = [];

    /**
     * Store feedback.
     */
    public collect(

        feedback: Feedback

    ): void {

        this.feedbacks.push(feedback);

    }

    /**
     * Return all feedback.
     */
    public getAll(): Feedback[] {

        return [...this.feedbacks];

    }

    /**
     * Number of feedback records.
     */
    public count(): number {

        return this.feedbacks.length;

    }

    /**
     * Remove all feedback.
     */
    public clear(): void {

        this.feedbacks.length = 0;

    }

}
