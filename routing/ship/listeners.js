import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";

export async function postShip(request, response) {
    try {
      await pool.query(
        'INSERT INTO ships (ship_id, ship_name, ship_bort_number, ship_project, ship_type, fk_unit_id, ship_city) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [getId(), ...Object.values(request.body)]
      );
      const res = await pool.query(
      `SELECT  units.unit_name, ships.ship_name  
      FROM units
      LEFT JOIN ships
      ON units.unit_id = ships.fk_unit_id`);

      response.status(statuses.successCreate).json(res.rows)
      response.end();
    }
    catch(error) {
      console.log(error);
      response.sendStatus(statuses.commonServerError);
      response.end();
    }
  };

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