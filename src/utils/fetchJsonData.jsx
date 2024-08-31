import jsonData from '../assets/data/SiteData.json';
export const fetchJsonData = async () => {
    const response = {
        json: () => jsonData,
    };
    return response.json();
};