import axios from "axios";
import {CovidCountry} from "../../Modelo/CovidCountry";
import { HistoricalData } from "../../Modelo/HistoricalData";

const API_BASE_URL = "https://disease.sh/v3/covid-19";

export class CovidApiService 
{


    static async getAllCountries(): Promise<CovidCountry[]> 
    {
        const response = await axios.get<CovidCountry[]>(`${API_BASE_URL}/countries`);
        return response.data;
    }

    static async getHistoricalData(country: string): Promise<HistoricalData> 
    {
        const response = await axios.get<HistoricalData>(`${API_BASE_URL}/historical/${country}?lastdays=all`);
        return response.data;
    }

    public static processTimelineData(date: string): string {

        let day = '';
        let month = '';
        let year = '';
        const parts = date.split('/');
        if (parts.length >= 2) {
            month = parts[0];
            day = parts[1];
            year = parts[2];
        }

        month = String(month).padStart(2, '0');
        day = String(day).padStart(2, '0');

        return `${day}/${month}/${year}`;
    }
}
