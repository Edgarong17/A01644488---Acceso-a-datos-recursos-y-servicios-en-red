export interface CovidCountry {
    country: string;
    cases: number;
    recovered: number;
    deaths: number;
    population: number;
    countryInfo: {
        _id: number;
        iso2: string;
        iso3: string;
        lat: number;
        long: number;
        flag: string;
    };
}