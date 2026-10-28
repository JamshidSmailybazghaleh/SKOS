class SKOSNote {
  constructor(intakeEngine = null) {
    this.id = "SKOS-NOTE";
    this.name = "SKOS Note";
    this.version = "1.0.0";
    this.status = "CREATED";
    this.intakeEngine = intakeEngine;
  }

  initialize() {
    this.status = "INITIALIZED";
    return { id: this.id, status: this.status };
  }

  receive(note = {}) {
    if (!this.intakeEngine) {
      throw new Error("Intake Engine not connected.");
    }

    return this.intakeEngine.execute({
      ...note,
      source: "SAMSUNG_NOTES",
      connectorId: this.id
    });
  }
}

module.exports = SKOSNote;
