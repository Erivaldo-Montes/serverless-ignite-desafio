import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamoClient";
import { randomUUID } from "crypto";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body);
  const { userid } = event.pathParameters;

  const toDoId = randomUUID();

  await document
    .put({
      TableName: "toDo",
      Item: {
        id: toDoId,
        user_id: userid,
        title,
        done: false,
        deadline,
      },
    })
    .promise();

  const todo = await document
    .query({
      TableName: "toDo",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": toDoId,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(todo.Items[0]),
  };
};
