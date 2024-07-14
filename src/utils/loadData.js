import apiService from '../api/api_data';

async function loadData() {
    let  data = {};
    try {
        const companies = await apiService.getCompanies();

        data = await Promise.all(companies.map(async (company) => {
            const assets = await apiService.getAssetsByCompanyId(company.id);
            const locations = await apiService.getLocationsByCompanyId(company.id);
            return { [company.id] : { assets: assets, locations: locations } };
        }));

        data.companies = companies;

        return data;
    } catch (error) {
        console.error('Erro ao construir a árvore:', error);
    }
}

export default loadData;
