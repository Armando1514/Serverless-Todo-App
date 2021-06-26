import * as uuid from "uuid";

import { Todo } from "../models/Todo";
import { TodoAccess } from "../dataLayer/TodoAccess";
import { parseUserId } from "../auth/utils";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";

const todoAccess = new TodoAccess();

export async function getAllTodosForUser(jwtToken: string): Promise<any> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodosForUser(userId);
}

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    jwtToken: string
  ): Promise<Todo> {

    const itemId = uuid.v4();
    const userId = parseUserId(jwtToken);


  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done:  false,
    attachmentUrl: undefined,
  } as Todo);

  }

export async function updateTodo(todoId: String, updatedTodo: UpdateTodoRequest): Promise<void>{
     todoAccess.updateTodo(todoId, updatedTodo);
}

export async function deleteTodo(todoId: String): Promise<void>{
  todoAccess.deleteTodo(todoId);
}