import apiService from '../api/api_data';

async function loadData() {
    let data = {};
    try {
        const companies = await apiService.getCompanies();

        for (let i in companies) {

            let assets = await apiService.getAssetsByCompanyId(companies[i].id);

            let locations = await apiService.getLocationsByCompanyId(companies[i].id);

            data[companies[i].id] = { assets: assets, locations: locations };
        }

        data.companies = companies;

        return data;
    } catch (error) {
        console.error('Erro ao construir a árvore:', error);
    }
}

export default loadData;
