export const shipsTableConfig = {
    tableName: 'ships',
    columns: {
        shipId: {
            colName: 'ship_id',
            bodyKey: 'shipId'
        },
        shipName: {
            colName: 'ship_name',
            bodyKey: 'shipName'
        },
        bortNumber: {
            colName: 'ship_bort_number',
            bodyKey: 'bortNumber'
        },
        project: {
            colName: 'ship_project',
            bodyKey: 'project'
        },
        shipType: {
            colName: 'ship_type',
            bodyKey: 'shipType'
        },
        shipUnit: {
            colName: 'fk_unit_id',
            bodyKey: 'shipUnit'
        },
        city: {
            colName: 'ship_city',
            bodyKey: 'city'
        },
    }    
};

export const unitsTableConfig = {
    tableName: 'units',
    columns: {
        unitId: {
            colName: 'unit_id',
            bodyKey: 'unitId'
        },
        unitName: {
            colName: 'unit_name',
            bodyKey: 'unitName'
        },
        city: {
            colName: 'unit_city',
            bodyKey: 'city'
        },
    }    
};