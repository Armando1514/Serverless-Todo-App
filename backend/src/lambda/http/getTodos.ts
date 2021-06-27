import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { getAllTodosForUser } from "../../businessLogic/todo";
import { decodeJWTFromAPIGatewayEvent } from "../../auth/utils";
import { parseUserId } from "../../auth/utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing event: ", event);
    // TODO: Get all TODO items for a current user
    const jwtToken = decodeJWTFromAPIGatewayEvent(event);
    const userId = parseUserId(jwtToken);

    const result = await getAllTodosForUser(userId);

    if (result.count !== 0)
      return {
        statusCode: 200,
        body: JSON.stringify({ items: result.Items }),
      };

    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Item not found",
      }),
    };
  }
);

handler
  .use(
    cors({
      credentials: true,
    })
  )
  .use(httpErrorHandler());
