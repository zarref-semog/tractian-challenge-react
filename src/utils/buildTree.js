function buildTree(data) {
    const companies = {};
    const locations = {};
    const assets = {};
    const components = {};

    if (Object.keys(data).length === 0) return [];

    // Create company objects
    data.companies.forEach(company => {
        companies[company.id] = {
            id: company.id,
            name: company.name,
            children: []
        };
    });

    // Create location objects
    data.forEach((companyId, value) => {
        if (companyId !== "companies") {
            value.locations.forEach(loc => {
                locations[loc.id] = {
                    id: loc.id,
                    name: loc.name,
                    image: '../assets/images/location.png',
                    parentId: loc.parentId || "",
                    children: []
                };
            });
        }
    });

    // Create asset and component objects
    Object.entries(data).forEach(([companyId, value]) => {
        if (companyId !== "companies") {
            value.assets.forEach(asset => {
                if (asset.sensorId) {
                    components[asset.id] = {
                        id: asset.id,
                        name: asset.name,
                        sensorId: asset.sensorId,
                        sensorType: asset.sensorType,
                        status: asset.status,
                        gatewayId: asset.gatewayId,
                        image: '../assets/images/component.png',
                        parentId: asset.parentId || "",
                        locationId: asset.locationId || "",
                        children: []
                    };
                } else {
                    assets[asset.id] = {
                        id: asset.id,
                        name: asset.name,
                        status: asset.status,
                        image: '../assets/images/asset.png',
                        parentId: asset.parentId || "",
                        locationId: asset.locationId || "",
                        children: []
                    };
                }
            });
        }
    });

    // Build relationships
    Object.entries(data).forEach(([companyId, value]) => {
        if (companyId !== "companies") {
            value.locations.forEach(loc => {
                if (loc.parentId) {
                    locations[loc.parentId].children.push(locations[loc.id]);
                } else {
                    companies[companyId].children.push(locations[loc.id]);
                }
            });
            value.assets.forEach(asset => {
                if (asset.sensorId) {
                    if (asset.locationId) {
                        locations[asset.locationId].children.push(components[asset.id]);
                    } else if (asset.parentId) {
                        assets[asset.parentId].children.push(components[asset.id]);
                    } else {
                        companies[companyId].children.push(components[asset.id]);
                    }
                } else {
                    if (asset.locationId) {
                        locations[asset.locationId].children.push(assets[asset.id]);
                    } else if (asset.parentId) {
                        assets[asset.parentId].children.push(assets[asset.id]);
                    } else {
                        companies[companyId].children.push(assets[asset.id]);
                    }
                }
            });
        }
    });

    // Convert to required JSON format
    const result = [];
    Object.values(companies).forEach(company => {
        result.push({
            id: company.id,
            name: company.name,
            children: serializeChildren(company.children)
        });
    });
    console.log(result);
    return result;
}

function serializeChildren(children) {
    const result = [];
    children.forEach(child => {
        if (child.children !== undefined) {
            result.push({
                id: child.id,
                name: child.name,
                parentId: child.parentId,
                children: serializeChildren(child.children)
            });
        } else if (child.status !== undefined) {
            result.push({
                id: child.id,
                name: child.name,
                status: child.status,
                parentId: child.parentId,
                locationId: child.locationId,
                children: serializeChildren(child.children)
            });
        } else if (child.sensorId !== undefined) {
            result.push({
                id: child.id,
                name: child.name,
                sensorId: child.sensorId,
                sensorType: child.sensorType,
                status: child.status,
                gatewayId: child.gatewayId,
                parentId: child.parentId,
                locationId: child.locationId,
                children: serializeChildren(child.children)
            });
        }
    });
    console.log(result);
    return result;
}

export default buildTree;