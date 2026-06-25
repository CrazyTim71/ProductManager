export interface AppConfigResponse {
    hourlyRate: number | string;
}

export interface RepairSavingsSummary {
    newPurchaseValue: number;
    laborCost: number;
    partsCost: number;
    repairValue: number;
    savedValue: number;
}
