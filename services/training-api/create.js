import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import {
  success,
  failure
} from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      //trainingId
      pk: uuid.v1(),
      sk: data.trainingLevel,
      //training composite weekday#target
      data: data.weekday + "#" + data.target,
      trainingWorkout: data.workout,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);

    return failure({
      status: false
    });
  }
}