/* Amplify Params - DO NOT EDIT
    AUTH_P2G3FRONTEND38AD6CD7_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');

exports.handler = async (event) => {
  AWS.config.update({
    region: process.env.REGION,
    'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
    'secretAccessKey': process.env.AWS_SECRET_KEY
  });

  const data = await new Promise((resolve, reject) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    cognito.listUsers({
      UserPoolId: process.env.AUTH_P2G3FRONTEND38AD6CD7_USERPOOLID,
      AttributesToGet: null,
    }, (err, data) => {
      if (err) {
        console.error('err', err);
        reject(err);
      } else {
        console.log('data', data);
        resolve(data);
      }
    });
  });

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(data),
  };
  return response;
};
