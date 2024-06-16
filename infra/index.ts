import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { RolePolicyAttachment } from "@pulumi/aws/iam";

const defaultRole = new aws.iam.Role("kt-sample-default-role", {
    assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`
});

new RolePolicyAttachment("kt-sample-default-role-policy", {
    role: defaultRole,
    policyArn: aws.iam.ManagedPolicies.AWSLambdaBasicExecutionRole
});

const lambdaFunction = new aws.lambda.Function("kt-sample-products", {
    code: new pulumi.asset.FileArchive("products/build/libs/products.jar"),
    handler: "dev.koga.ProductsHandler::handleRequest",
    role: defaultRole.arn,
    runtime: "java11",
    timeout: 15
});

const logGroupApi = new aws.cloudwatch.LogGroup("kt-sample-api-route", {
    name: "kt-sample",
});

const apiGatewayPermission = new aws.lambda.Permission("kt-sample-gateway-permission", {
    action: "lambda:InvokeFunction",
    function: lambdaFunction.name,
    principal: "apigateway.amazonaws.com"
});

const api = new aws.apigatewayv2.Api("kt-sample-api", {
    protocolType: "HTTP"
});

const apiDefaultStage = new aws.apigatewayv2.Stage("default", {
    apiId: api.id,
    autoDeploy: true,
    name: "$default",
    accessLogSettings: {
        destinationArn: logGroupApi.arn,
        format: `{"requestId": "$context.requestId", "requestTime": "$context.requestTime", "httpMethod": "$context.httpMethod", "httpPath": "$context.path", "status": "$context.status", "integrationError": "$context.integrationErrorMessage"}`
    }
});

const lambdaIntegration = new aws.apigatewayv2.Integration("kt-sample-api-lambda-integration", {
    apiId: api.id,
    integrationType: "AWS_PROXY",
    integrationUri: lambdaFunction.arn,
    payloadFormatVersion: "2.0"
});

const productsRoute = new aws.apigatewayv2.Route("kt-sample-products-route", {
    apiId: api.id,
    routeKey: "GET /products",
    target: pulumi.interpolate `integrations/${lambdaIntegration.id}`
});

export const publishedUrl = apiDefaultStage.invokeUrl;
