'use strict'

const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    const client = new DynamoDBClient({ region: "us-east-1" });

    const params = {
      TableName : "items",
    };

    const command = new ScanCommand(params);

    const response = await client.send(command);
    
    return response.Items;
  })
}
