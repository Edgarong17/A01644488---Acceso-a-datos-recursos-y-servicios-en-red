export interface HistoricalData {
    historicalData: {
        [date: string]: {
            cases: number;
            recovered: number;
            deaths: number;
        };
    };
}
