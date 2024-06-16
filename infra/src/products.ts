import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { project } from "./common";

export function createProductsResources(
    role: any, api: any
) {
    const lambdaFunction = new aws.lambda.Function(`${project}-products`, {
        code: new pulumi.asset.FileArchive("../products/build/libs/products.jar"),
        handler: "dev.koga.ProductsHandler::handleRequest",
        role: role.arn,
        runtime: "java11",
        timeout: 15
    });
    
    
    new aws.lambda.Permission(`${project}-products-gateway-permission`, {
        action: "lambda:InvokeFunction",
        function: lambdaFunction.name,
        principal: "apigateway.amazonaws.com"
    });
    
    const lambdaIntegration = new aws.apigatewayv2.Integration(`${project}-products-api-lambda-integration`, {
        apiId: api.id,
        integrationType: "AWS_PROXY",
        integrationUri: lambdaFunction.arn,
        payloadFormatVersion: "2.0"
    });
    
    new aws.apigatewayv2.Route(`${project}-products-route`, {
        apiId: api.id,
        routeKey: "GET /products",
        target: pulumi.interpolate `integrations/${lambdaIntegration.id}`
    });
}