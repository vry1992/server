import { statuses } from "../../constants/statuses.js";

export function postUnit(request, response) {
  try {
    response.sendStatus(statuses.successCreate);
    response.end();
  }
  catch(error) {
    console.log(error);
  }
  finally {
    console.log('finnaly');
  }
};
