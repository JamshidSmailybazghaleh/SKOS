import { GraphNode } from "./graph-node";
import { GraphEdge } from "./graph-edge";
import { GraphReport } from "./graph-report";

export class KnowledgeGraph {

    private readonly nodes =

        new Map<string, GraphNode>();

    private readonly edges: GraphEdge[] = [];

    public addNode(

        node: GraphNode

    ): void {

        this.nodes.set(

            node.id,

            node

        );

    }

    public addEdge(

        edge: GraphEdge

    ): void {

        this.edges.push(edge);

    }

    public getNode(

        id: string

    ): GraphNode | undefined {

        return this.nodes.get(id);

    }

    public getNodes(): GraphNode[] {

        return Array.from(

            this.nodes.values()

        );

    }

    public getEdges(): GraphEdge[] {

        return [...this.edges];

    }

    public report(): GraphReport {

        return {

            totalNodes:

                this.nodes.size,

            totalEdges:

                this.edges.length,

            generatedAt:

                Date.now()

        };

    }

}
