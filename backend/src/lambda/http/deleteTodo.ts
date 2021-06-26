import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { deleteTodo } from '../../businessLogic/todo';

export const handler=  middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  await deleteTodo(todoId);

  return {
    statusCode: 200,
    body: JSON.stringify(
      true
    )}
});



handler.use(
  cors({
    credentials: true,
  })
).use(httpErrorHandler());

