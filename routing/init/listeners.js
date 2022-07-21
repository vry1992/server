import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'

export async function init(request, response) {
    try {
      const data = await pool.query(
        'SELECT unit_id, unit_name FROM units'
      );
      response.status(statuses.successCreate).json({ body: data.rows });
      response.end();
    }
    catch(error) {
      response.sendStatus(statuses.commonServerError);
      response.end();
    }
  };