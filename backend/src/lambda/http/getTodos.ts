import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { getAllTodosForUser } from '../../businessLogic/todo';
import { decodeJWTFromAPIGatewayEvent } from '../../auth/utils';


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  const jwtToken = decodeJWTFromAPIGatewayEvent(event);

  const result = await getAllTodosForUser(jwtToken);
  
  if (result.count !== 0)
  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };

return {
  statusCode: 404,
  body: JSON.stringify({
    error: "Item not found",
  }),
};
}

);

handler.use(
  cors({
    credentials: true,
  })
);