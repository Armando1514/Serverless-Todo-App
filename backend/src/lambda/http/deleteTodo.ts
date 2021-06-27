import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { deleteTodo } from "../../businessLogic/todo";
import { createLogger } from "../../utils/logger";
import { decodeJWTFromAPIGatewayEvent } from "../../auth/utils";
import { parseUserId } from "../../auth/utils";

const logger = createLogger("todo");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing event: ", event);
    const todoId = event.pathParameters.todoId;

    const jwtToken = decodeJWTFromAPIGatewayEvent(event);

    const userId = parseUserId(jwtToken);

    // TODO: Remove a TODO item by id
    await deleteTodo(todoId, userId);

    logger.info("todo DELETED", {
      // Additional information stored with a log statement
      key: todoId,
      userId: userId,
      date: new Date().toISOString,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(true),
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
