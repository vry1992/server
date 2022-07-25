import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";

export async function postShip(request, response) {
  try {
    await pool.query(
      'INSERT INTO ships (ship_id, ship_name, ship_bort_number, ship_project, ship_type, fk_unit_id, ship_city) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [getId(), ...Object.values(request.body)]
    );
    const result = await pool.query(
    `SELECT  units.unit_name, ships.ship_name  
    FROM units
    LEFT JOIN ships
    ON units.unit_id = ships.fk_unit_id`);

    response.status(statuses.successCreate).json(result.rows)
    response.end();
  }
  catch(error) {
    console.log(error);
    response.sendStatus(statuses.commonServerError);
    response.end();
  }
};

export async function postSearchShipByKeyWord(request, response) {
  const result = await pool.query(
    `SELECT ship_id, ship_name, ship_type FROM ships WHERE UPPER(ship_name) LIKE UPPER($1)`,
    [`%${request.body.search}%`]
  );
  response.status(statuses.commonSuccess).json(result.rows)
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