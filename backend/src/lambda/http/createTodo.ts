import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { createTodo } from "../../businessLogic/todo";
import { decodeJWTFromAPIGatewayEvent } from "../../auth/utils";
import * as uuid from "uuid";
import { parseUserId } from "../../auth/utils";
import { createLogger } from "../../utils/logger";
const logger = createLogger("todo");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing event: ", event);

    // TODO: Implement creating a new TODO item
    const todoRequest: CreateTodoRequest = JSON.parse(event.body);

    const todoId = uuid.v4();
    const jwtToken = decodeJWTFromAPIGatewayEvent(event);

    const userId = parseUserId(jwtToken);

    const newTodo = await createTodo(todoId, todoRequest, userId);

    logger.info("todo CREATED", {
      // Additional information stored with a log statement
      key: todoId,
      userId: userId,
      date: new Date().toISOString,
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newTodo,
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
