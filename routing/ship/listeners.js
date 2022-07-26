import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";
import { shipsTableConfig, unitsTableConfig } from "../../constants/tables.js";

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
  console.log(request.body);
  await pool.query(
    `INSERT INTO ships (
      data_id, 
      fk_ship_data_id, 
      discover_timestamp,
      person_who_added,
      latitude,
      longitude,
      peleng,
      create_timestamp
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [getId(), ...Object.values(request.body)]
  );
  response.status(statuses.commonSuccess).json(result.rows)
}

//   CREATE TABLE public.ships
// (
//     "ship_id" character varying(64) NOT NULL,
//     "ship_name" character varying(128) NOT NULL,
//     "ship_bort_number" character varying(16) NOT NULL,
//     "ship_project" character varying(16) NOT NULL,
//     "ship_type" character varying(16) NOT NULL,
//     "ship_city" character varying(64) NOT NULL,
//     "fk_unit_id" character varying(64) REFERENCES units(unit_id) NOT NULL,
//     CONSTRAINT "pk_ship_id" PRIMARY KEY (ship_id)
// );

// ALTER TABLE IF EXISTS public.ships
//     OWNER to postgres;


// CREATE TABLE public.ships_callsigns
// (
//     callsign_id character varying(32),
//     callsigns_list character varying(10)[],
//     "fk_ship_id" character varying(64) REFERENCES ships(ship_id) NOT NULL,
//     CONSTRAINT "pk_callsign_id" PRIMARY KEY (callsign_id)
// );

// ALTER TABLE IF EXISTS public.units_callsigns
//     OWNER to postgres;

// INSERT into units_callsigns (callsign_id, callsigns_list, fk_ship_id)
//     values('111', '{{aaaa, ddddd}}', 'cl5zg381c0002zsty5z6adovj');