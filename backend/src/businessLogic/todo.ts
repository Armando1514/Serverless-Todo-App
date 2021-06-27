import { Todo } from "../models/Todo";
import { TodoAccess } from "../dataLayer/TodoAccess";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { String } from "aws-sdk/clients/appstream";

const todoAccess = new TodoAccess();

export async function getAllTodosForUser(userId: string): Promise<any> {
  return todoAccess.getAllTodosForUser(userId);
}

export async function createTodo(
  todoId: String,
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<Todo> {
  const todo = todoAccess.createTodo({
    todoId: todoId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    attachmentUrl: undefined,
  } as Todo);

  return todo;
}

export async function updateTodo(
  todoId: String,
  updatedTodo: UpdateTodoRequest,
  userId: String
): Promise<void> {
  todoAccess.updateTodo(todoId, updatedTodo, userId);
}

export async function deleteTodo(
  todoId: String,
  userId: String
): Promise<void> {
  todoAccess.deleteTodo(todoId, userId);
}

export async function getPresignedImageUrl(
  todoId: String,
  imageId: String,
  userId: String
): Promise<string> {
  return todoAccess.getPresignedImageUrl(todoId, imageId, userId);
}
