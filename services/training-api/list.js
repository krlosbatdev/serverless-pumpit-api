import * as dynamoDbLib from "../../libs/dynamodb-lib";
import {
  success,
  failure
} from "../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    IndexName: 'gsi_1',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "sk = :levelDay and begins_with(#data,:weekDay)",
    ExpressionAttributeNames: {
      "#data": "data"
    },
    ExpressionAttributeValues: {
      ":levelDay": "0",
      ":weekDay": "Monday"
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({
      status: false
    });
  }
}