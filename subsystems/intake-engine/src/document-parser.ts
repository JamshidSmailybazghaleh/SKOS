import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";

export interface ParsedDocument {

    raw: string;

    paragraphs: string[];

}

export class DocumentParser implements PipelineStep {

    public execute(

        context: PipelineContext

    ): PipelineContext {

        console.log("STEP 04 : Document Parsing");

        const text = context.rawContent ?? "";

        const paragraphs = text

            .split(/\n\s*\n/)

            .map(p => p.trim())

            .filter(p => p.length > 0);

        context.parsedDocument = {

            raw: text,

            paragraphs

        };

        console.log(

            context.parsedDocument

        );

        return context;

    }

}
