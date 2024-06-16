import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { project } from "./common";

export function createSellersResources(
    role: any, api: any
) {
    const lambdaFunction = new aws.lambda.Function(`${project}-sellers`, {
        code: new pulumi.asset.FileArchive("../sellers/build/libs/sellers.jar"),
        handler: "dev.koga.SellersHandler::handleRequest",
        role: role.arn,
        runtime: "java11",
        timeout: 15
    });
    
    
    new aws.lambda.Permission(`${project}-sellers-gateway-permission`, {
        action: "lambda:InvokeFunction",
        function: lambdaFunction.name,
        principal: "apigateway.amazonaws.com"
    });
    
    const lambdaIntegration = new aws.apigatewayv2.Integration(`${project}-sellers-api-lambda-integration`, {
        apiId: api.id,
        integrationType: "AWS_PROXY",
        integrationUri: lambdaFunction.arn,
        payloadFormatVersion: "2.0"
    });
    
    new aws.apigatewayv2.Route(`${project}-sellers-route`, {
        apiId: api.id,
        routeKey: "GET /sellers",
        target: pulumi.interpolate `integrations/${lambdaIntegration.id}`
    });
}