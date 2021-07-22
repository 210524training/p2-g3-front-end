/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CHATAPREDUDBFINAL_ARN
	STORAGE_CHATAPREDUDBFINAL_NAME
	STORAGE_CHATAPREDUDBFINAL_STREAMARN
	STORAGE_P2G3DB_ARN
	STORAGE_P2G3DB_NAME
	STORAGE_P2G3DB_STREAMARN
Amplify Params - DO NOT EDIT *//* eslint-disable @typescript-eslint/no-empty-function */
import * as AWS from 'aws-sdk';


AWS.config.update({ region: process.env.TABLE_REGION || process.env.REGION || 'us-east-1'  });

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Generic repository that implements the basic CRUD operations (also getting all items
 * or an item by id).
 *
 * @author Dustin Díaz
 */
class Repository {
  /**
   * Avoid using dynamodb keywords.
   *
   * Recomendation: Please provide a cast implementation.
   *
   * Note: DO NOT USE DYNAMODB KEYWORD.
   * @param TableName The name of the table (database) containing the requested items.
   * @param EntityName The name of the entity in the table.
   * @param ProjectionExpression A string that identifies one or more attributes
   *                             to retrieve from the table.
   * @param cast A function that casts the returned item from the table to the
   *             appropriate type (i.e., using the type's contructor). `item as <T>` might
   *             not work in all cases.
   * @param client DynamoDB document client.
   */
  constructor(
    TableName,
    EntityName,
    ProjectionExpression,
    cast = (item) => item,
    client = dynamo,
  ) {}

  async getAll() {
    const params = {
      TableName: this.TableName,
      KeyConditionExpression: 'entity = :e',
      ExpressionAttributeValues: {
        ':e': this.EntityName,
      },
      ProjectionExpression: this.ProjectionExpression,
    };

    const data = await this.client.query(params).promise();
    return data.Items ? this.castArray(data.Items) : [];
  }

  async getById(id) {
    const params = {
      TableName: this.TableName,
      Key: {
        entity: this.EntityName,
        id,
      },
      ProjectionExpression: this.ProjectionExpression,
    };

    const data = await this.client.get(params).promise();
    if (!data.Item) {
      console.log(`Couldn't find item in ${this.TableName}::${this.EntityName}`, data);
      return null;
    }
    return this.cast(data.Item);
  }

  async add(item) {
    const params = {
      TableName: this.TableName,
      Item: {
        ...item,
        entity: this.EntityName,
      },
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': item.id,
      },
    };
    try {
      await this.client.put(params).promise();
      return true;
    } catch (error) {
      console.log(`Failed to add ${this.TableName}::${this.EntityName}:`, error);
      return false;
    }
  }

  async update(item) {
    const params = {
      TableName: this.TableName,
      Item: {
        ...item,
        entity: this.EntityName,
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': item.id,
      },
    };

    try {
      await this.client.put(params).promise();
      return true;
    } catch (error) {
      console.error(`Failed to update ${this.TableName}::${this.EntityName}:`, error);
      return false;
    }
  }

  async delete(id) {
    const params = {
      TableName: this.TableName,
      Key: {
        entity: this.EntityName,
        id,
      },
    };

    try {
      await this.client.delete(params).promise();
      return true;
    } catch (error) {
      console.error(`Failed to delete ${this.TableName}::${this.EntityName}:`, error);
      return false;
    }
  }

  castArray(items) {
    return items.map((item) => this.cast(item));
  }
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Connection, Accept, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
};

const formatJSONResponse = (response) => ({
  statusCode: 200,
  body: JSON.stringify(response),
  headers,
});


class ForumRepository extends Repository {
  constructor() {
    super(
      process.env.STORAGE_P2G3DB_NAME || 'p2g3db',
      'Forum',
      'id, title, tags, username, createdAt, content, likes, numberOfComments, comments',
    );
  }
}

const repository = new ForumRepository();


exports.handler = async (event) => {
  const forum = event?.body;
  if (forum) {
    return (
      formatJSONResponse({
        created: await repository.add(forum),
      })
    );
  }

  return (
    formatJSONResponse({
      created: false,
    })
  );
};