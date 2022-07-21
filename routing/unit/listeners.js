import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'

export async function postUnit(request, response) {
  try {
    const { unitName, city, callSign } = request.body;
    await pool.query(
      'INSERT INTO units (unit_name, unit_city, unit_callsign) VALUES ($1, $2, $3)',
      [unitName, city, callSign]
    );
    response.sendStatus(statuses.successCreate);
    response.end();
  }
  catch(error) {
    response.sendStatus(statuses.commonServerError);
    response.end();
  }
};


// CREATE TABLE public.units
// (
//     "unit_id" serial,
//     "unit_name" character varying(128) NOT NULL,
//     "unit_city" character varying(64) NOT NULL,
//     "unit_callsign" character varying(32),
//     "unit_additional_info" text,
//     CONSTRAINT "pk_unit_id" PRIMARY KEY ("unit_id")
// );

// ALTER TABLE IF EXISTS public.units
//     OWNER to postgres;