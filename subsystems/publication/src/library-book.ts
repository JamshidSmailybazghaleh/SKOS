import { PublicationStatus }
from "./publication-status";

export interface LibraryBook {

    id: string;

    title: string;

    language: string;

    coverImage: string;

    sampleAvailable: boolean;

    status: PublicationStatus;

}
