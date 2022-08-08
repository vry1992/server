import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";
import { unitsTableConfig } from "../../constants/tables.js";

export async function postUnit(request, response) {
  try {
    const { body: requestBody } = request;
    const { tableName: unitsTableName, columns: unitsColumns } = unitsTableConfig;
    const { unitId, unitName, city } = unitsColumns;

    await pool(unitsTableName).insert({
      [unitId.colName]: getId(),
      ...(requestBody[unitName.bodyKey] && { [unitName.colName]: requestBody[unitName.bodyKey] }),
      ...(requestBody[city.bodyKey] && { [city.colName]: requestBody[city.bodyKey] }),
    });

    const selectedRows = await pool(unitsTableName)
      .select(
        unitId.colName,
        unitName.colName
      );

    response.status(statuses.successCreate).json(selectedRows);
    response.end();
  }
  catch(error) {
    console.log(error);
    response.sendStatus(statuses.commonServerError);
    response.end();
  }
};