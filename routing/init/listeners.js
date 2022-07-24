import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'

export async function init(request, response) {
    try {
      const { rows } = await pool.query(
        'SELECT unit_id, unit_name FROM units'
      );
      response.status(statuses.successCreate).json(rows);
      response.end();
    }
    catch(error) {
      console.log(error);
      response.sendStatus(statuses.commonServerError);
      response.end();
    }
  };