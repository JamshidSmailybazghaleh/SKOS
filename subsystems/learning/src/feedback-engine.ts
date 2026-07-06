/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning
 * Module    : Feedback Engine
 *
 * Build     : BUILD-000127
 * Sprint    : Sprint 19
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Feedback {

    id: string;

    source: string;

    score: number;

    comment: string;

    timestamp: number;

}

export class FeedbackEngine {

    private readonly feedbacks: Feedback[] = [];

    /**
     * Register feedback.
     */
    public record(

        feedback: Feedback

    ): void {

        this.feedbacks.push(feedback);

    }

    /**
     * Retrieve all feedback.
     */
    public getAll(): Feedback[] {

        return [...this.feedbacks];

    }

    /**
     * Calculate average score.
     */
    public averageScore(): number {

        if (this.feedbacks.length === 0) {

            return 0;

        }

        const total = this.feedbacks.reduce(

            (sum, item) => sum + item.score,

            0

        );

        return total / this.feedbacks.length;

    }

}
