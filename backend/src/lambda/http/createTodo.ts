import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todo';
import { decodeJWTFromAPIGatewayEvent } from '../../auth/utils';


export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event);

  // TODO: Implement creating a new TODO item
  const todoRequest: CreateTodoRequest = JSON.parse(event.body);
  const jwtToken = decodeJWTFromAPIGatewayEvent(event);

  const newTodo = await  createTodo(todoRequest, jwtToken);
  return {
    statusCode: 201,
    body: JSON.stringify({
      newTodo,
    }),
  };
});


handler.use(
  cors({
    credentials: true,
  })
);