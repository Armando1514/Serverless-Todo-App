import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { updateTodo } from "../../businessLogic/todo";
import { decodeJWTFromAPIGatewayEvent } from "../../auth/utils";
import { parseUserId } from "../../auth/utils";
import { createLogger } from "../../utils/logger";
const logger = createLogger("todo");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing event: ", event);

    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

    const jwtToken = decodeJWTFromAPIGatewayEvent(event);
    const userId = parseUserId(jwtToken);

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object

    await updateTodo(todoId, updatedTodo, userId);

    logger.info("todo UPDATED", {
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
