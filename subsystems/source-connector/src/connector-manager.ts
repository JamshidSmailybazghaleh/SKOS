import { SourceConnector } from "./connector";

export class ConnectorManager {

    private readonly connectors: SourceConnector[] = [];

    public register(
        connector: SourceConnector
    ): void {

        this.connectors.push(connector);

    }

    public getConnectors(): SourceConnector[] {

        return this.connectors;

    }

}
