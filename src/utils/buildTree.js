function buildTree(data) {
    const companies = {};
    const locations = {};
    const assets = {};
    const components = {};

    if (Object.keys(data).length === 0) return [];

    try {
        // Create company objects
        data.companies.forEach(company => {
            companies[company.id] = {
                id: company.id,
                name: company.name,
                children: []
            };
        });


        // Create locations objects
        for (let companyId in data) {
            if (companyId !== 'companies') {
                data[companyId].locations.forEach(loc => {
                    locations[loc.id] = {
                        id: loc.id,
                        name: loc.name,
                        image: 'location',
                        parentId: loc.parentId || "",
                        children: []
                    };
                });
            }
        }


        // Create asset and component objects
        for (let companyId in data) {
            if (companyId !== "companies") {
                data[companyId].assets.forEach(asset => {
                    if (asset.sensorId) {
                        components[asset.id] = {
                            id: asset.id,
                            name: asset.name,
                            sensorId: asset.sensorId,
                            sensorType: asset.sensorType,
                            status: asset.status,
                            gatewayId: asset.gatewayId,
                            image: 'component',
                            parentId: asset.parentId || "",
                            locationId: asset.locationId || "",
                            children: []
                        };
                    } else {
                        assets[asset.id] = {
                            id: asset.id,
                            name: asset.name,
                            status: asset.status,
                            image: 'asset',
                            parentId: asset.parentId || "",
                            locationId: asset.locationId || "",
                            children: []
                        };
                    }
                });
            }
        }

        console.log(components);


        // Build relationships
        for (let companyId in data) {
            if (companyId !== "companies") {
                data[companyId].locations.forEach(loc => {
                    if (loc.parentId) {
                        locations[loc.parentId].children.push(locations[loc.id]);
                    } else {
                        companies[companyId].children.push(locations[loc.id]);
                    }
                });
                data[companyId].assets.forEach(asset => {
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
        }

        // Convert to required JSON format
        const result = [];
        for (let companyId in companies) {
            result.push({
                id: companies[companyId].id,
                name: companies[companyId].name,
                children: serializeChildren(companies[companyId].children)
            });
        }
        return result;
    } catch (e) {
        console.log(e)
    }
}

function serializeChildren(children) {
    const result = [];
    children.forEach(child => {
        if (child.children !== undefined) {
            result.push({
                id: child.id,
                name: child.name,
                parentId: child.parentId,
                image: child.image,
                children: serializeChildren(child.children)
            });
        } else if (child.status !== undefined) {
            result.push({
                id: child.id,
                name: child.name,
                status: child.status,
                parentId: child.parentId,
                locationId: child.locationId,
                image: child.image,
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
                image: child.image,
                children: serializeChildren(child.children)
            });
        }
    });
    return result;
}

export default buildTree;