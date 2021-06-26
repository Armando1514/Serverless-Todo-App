import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLogger } from '../utils/logger'
import { Todo } from "../models/Todo";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";


const logger = createLogger('todo')

const XAWS = AWSXRay.captureAWS(AWS);

export class TodoAccess{
    constructor (
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly todoIndex = process.env.TODO_USER_INDEX
    ){}


async getAllTodosForUser(userId: String): Promise<any>{
    const result = await this.docClient
    .query({
      TableName: this.todoTable,
      IndexName: this.todoIndex,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      }
    })
    .promise();

    return result;

  }

async createTodo(todo: Todo): Promise<Todo>{
    await this.docClient
    .put({
      TableName: this.todoTable,
      Item: todo,
    })
    .promise();

    logger.info('TODO created', {
        // Additional information stored with a log statement
        key: todo.todoId,
        userId: todo.userId,
        date: new Date().toISOString
      })
    
  return todo;

  }

async updateTodo(todoId: String, updatedTodo: UpdateTodoRequest): Promise<void>{
    await this.docClient.update({
        TableName: this.todoTable,
        Key: {
            todoId
        },
        UpdateExpression: "set name = :name, dueDate = :dueDate, done =: done",
        ExpressionAttributeValues:{
            ":name": updatedTodo.name,
            ":dueDate": updatedTodo.dueDate,
            ":done": updatedTodo.done,
        },
    })
}


async deleteTodo(todoId: String): Promise<void>{
    await this.docClient.update({
        TableName: this.todoTable,
        Key:{
            "todoId": todoId,
        }
    });
  }



}




function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
      console.log("Creating a local DynamoDB instance");
      return new XAWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
      });
    }
  
    return new XAWS.DynamoDB.DocumentClient();
  }