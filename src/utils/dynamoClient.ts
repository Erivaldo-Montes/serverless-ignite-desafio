import { DynamoDB } from "aws-sdk";

const options = {
  endpoint: "http://localhost:8000",
  region: "localhost",
};

const isOffline = () => {
  return process.env.IS_OFFLINE;
};

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
