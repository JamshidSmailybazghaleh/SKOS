import { PublicationStage } from "./publication-stage";

export interface PublicationRecord {

    id: string;

    title: string;

    language: string;

    stage: PublicationStage;

    lastUpdated: number;

}
