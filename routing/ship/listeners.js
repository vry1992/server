import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";
import { shipsTableConfig, unitsTableConfig, shipsDataTableConfig } from "../../constants/tables.js";

export async function postShip(request, response) {
  try {
    const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
    const { tableName: unitsTableName, columns: unitsColumns } = unitsTableConfig;
    const { body: requestBody } = request;
    const { shipId, shipName, bortNumber, project, shipType, shipUnit, city: shipCity } = shipsColumns;
    const { unitId, unitName } = unitsColumns;

    await pool(shipsTableName).insert({
      [shipId.colName]: getId(),
      ...(requestBody[shipName.bodyKey] && { [shipName.colName]: requestBody[shipName.bodyKey] }),
      ...(requestBody[bortNumber.bodyKey] && { [bortNumber.colName]: requestBody[bortNumber.bodyKey] }),
      ...(requestBody[project.bodyKey] && { [project.colName]: requestBody[project.bodyKey] }),
      ...(requestBody[shipType.bodyKey] && { [shipType.colName]: requestBody[shipType.bodyKey] }),
      ...(requestBody[shipUnit.bodyKey] && { [shipUnit.colName]: requestBody[shipUnit.bodyKey] }),
      ...(requestBody[shipCity.bodyKey] && { [shipCity.colName]: requestBody[shipCity.bodyKey] }),
    });

    const selectedRows = await pool(unitsTableName)
      .join(shipsTableName, unitId.colName, shipUnit.colName)
      .select(
        unitName.colName,
        pool.raw(`JSON_AGG((${shipName.colName}, ${shipId.colName})) as ships`)
      ).groupBy(unitName.colName);

    response.status(statuses.successCreate).json(selectedRows);
    response.end();
  }
  catch(error) {
    response.sendStatus(statuses.commonServerError).end();
  }
};

export async function postSearchShipByKeyWord(request, response) {
  const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
  const { shipId, shipName, shipType } = shipsColumns;
  const { body: { search } } = request;

  const selectedRows = await pool(shipsTableName)
    .select(shipId.colName, shipName.colName, shipType.colName)
    .whereILike(shipName.colName, `%${search}%`);

  response.status(statuses.commonSuccess).json(selectedRows);
};

export async function postShipData(request, response) {

  const { body: requestBody } = request;
  const { tableName: shipsDataTableName, columns: shipsDataColumns } = shipsDataTableConfig;
  const { 
    dataId, 
    discoverTimestamp, 
    latitude, 
    longitude, 
    peleng, 
    personWhoAdded, 
    createTimestamp, 
    additionalInformation, 
    shipId, 
    frequency, 
    shipCallsign, 
    companionCallsign
   } = shipsDataColumns;

   try {
    await pool(shipsDataTableName).insert({
      [dataId.colName]: getId(),
      [createTimestamp.colName]: Date.now(),
      ...(requestBody[discoverTimestamp.bodyKey] && { [discoverTimestamp.colName]: requestBody[discoverTimestamp.bodyKey] }),
      ...(requestBody[latitude.bodyKey] && { [latitude.colName]: requestBody[latitude.bodyKey] }),
      ...(requestBody[longitude.bodyKey] && { [longitude.colName]: requestBody[longitude.bodyKey] }),
      ...(requestBody[peleng.bodyKey] && { [peleng.colName]: requestBody[peleng.bodyKey] }),
      ...(requestBody[personWhoAdded.bodyKey] && { [personWhoAdded.colName]: requestBody[personWhoAdded.bodyKey] }),
      ...(requestBody[additionalInformation.bodyKey] && { [additionalInformation.colName]: requestBody[additionalInformation.bodyKey] }),
      ...(requestBody[shipId.bodyKey] && { [shipId.colName]: requestBody[shipId.bodyKey] }),
      ...(requestBody[frequency.bodyKey] && { [frequency.colName]: requestBody[frequency.bodyKey] }),
      ...(requestBody[shipCallsign.bodyKey] && { [shipCallsign.colName]: requestBody[shipCallsign.bodyKey] }),
      ...(requestBody[companionCallsign.bodyKey] && { [companionCallsign.colName]: requestBody[companionCallsign.bodyKey] }),
    });
    response.status(statuses.successCreate);
    response.end();
   }
   catch(error) {
    console.log(error);
   }
   finally {

   }
}