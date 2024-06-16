import * as aws from "@pulumi/aws";
import { RolePolicyAttachment } from "@pulumi/aws/iam";

export function createCommonResources(): { role: any, api: any, apiDefaultStage: any } {
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
    
    const logGroupApi = new aws.cloudwatch.LogGroup("kt-sample-api-route", {
        name: "kt-sample",
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

    return {
        role: defaultRole,
        api,
        apiDefaultStage
    }
}
