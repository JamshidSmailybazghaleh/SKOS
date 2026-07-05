/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Schema
 *
 * Build     : BUILD-000044
 * Sprint    : Sprint 03
 * Version   : 1.0.0
 *
 * Status    : Canonical
 * ==========================================================
 */

import { Entity } from "./entity-extractor";
import { Concept } from "./concept-extractor";
import { Relationship } from "./relationship-extractor";

export interface KnowledgeMetadata {

    version: string;

    createdAt: Date;

    updatedAt: Date;

    source: string;

    language: string;

}

export interface KnowledgeObjectSchema {

    id: string;

    title: string;

    summary: string;

    metadata: KnowledgeMetadata;

    entities: Entity[];

    concepts: Concept[];

    relationships: Relationship[];

    tags: string[];

}
