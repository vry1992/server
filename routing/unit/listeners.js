import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";

export async function postUnit(request, response) {
  try {
    console.log(request.body);
    await pool.query(
      'INSERT INTO units (unit_id, unit_name, unit_city) VALUES ($1, $2, $3)',
      [getId(), ...Object.values(request.body)]
    );
    const { rows } = await pool.query(
      'SELECT unit_id, unit_name FROM units'
    );
    console.log(rows)
    response.status(statuses.successCreate).json(rows);
    response.end();
  }
  catch(error) {
    response.sendStatus(statuses.commonServerError);
    response.end();
  }
};


// CREATE TABLE public.units
// (
//     "unit_id" character varying(64) NOT NULL,
//     "unit_name" character varying(128) NOT NULL,
//     "unit_city" character varying(64) NOT NULL,
//     "unit_additional_info" text,
//     CONSTRAINT "pk_unit_id" PRIMARY KEY ("unit_id")
// );

// ALTER TABLE IF EXISTS public.units
//     OWNER to postgres;