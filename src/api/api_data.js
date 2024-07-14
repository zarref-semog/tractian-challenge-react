async function getCompanies() {
    const baseUrl = 'https://fake-api.tractian.com/companies';

    try {
        let response = await fetch(baseUrl);
        let companies = await response.json();
        return companies;
    } catch (error) {
        console.error('Erro ao buscar as empresas:', error);
    }
}

async function getAssetsByCompanyId(companyId) {
    const baseUrl = `https://fake-api.tractian.com/companies/${companyId}/assets`;

    try {
        let response = await fetch(baseUrl);
        let assets = await response.json();
        return assets;
    } catch (error) {
        console.error(`Erro ao buscar os ativos da empresa ${companyId}:`, error);
    }
}

async function getLocationsByCompanyId(companyId) {
    const baseUrl = `https://fake-api.tractian.com/companies/${companyId}/locations`;

    try {
        let response = await fetch(baseUrl);
        let locations = await response.json();
        return locations;
    } catch (error) {
        console.error(`Erro ao buscar as localizações da empresa ${companyId}:`, error);
    }
}

const apiService = {
    getCompanies,
    getAssetsByCompanyId,
    getLocationsByCompanyId
};

export default apiService;
