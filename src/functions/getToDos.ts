import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamoClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const userTodos = await document
    .scan({
      TableName: "toDo",
      FilterExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": userid,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(userTodos.Items),
  };
};
