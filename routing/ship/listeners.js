import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'

export async function postShip(request, response) {
    try {
      await pool.query(
        'INSERT INTO units (ship_name, ship_bort_number, ship_project, ship_type, ship_city, ship_callsign, ship_callsign) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        Object.values(request.body)
      );
      response.sendStatus(statuses.successCreate);
      response.end();
    }
    catch(error) {
      response.sendStatus(statuses.commonServerError);
      response.end();
    }
  };

//   CREATE TABLE public.ships
// (
//     "ship_id" serial,
//     "ship_name" character varying(128) NOT NULL,
//     "ship_bort_number" character varying(16),
//     "ship_project" character varying(16),
//     "ship_type" character varying(16),
//     "ship_city" character varying(64) NOT NULL,
//     "ship_callsign" character varying(32),
//     CONSTRAINT "pk_ship_id" PRIMARY KEY ("ship_id")
// );

// ALTER TABLE IF EXISTS public.ships
//     OWNER to postgres;