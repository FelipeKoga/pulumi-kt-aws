import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createSellersResources(
    role: any, api: any
) {
    const lambdaFunction = new aws.lambda.Function("kt-sample-sellers", {
        code: new pulumi.asset.FileArchive("../sellers/build/libs/sellers.jar"),
        handler: "dev.koga.SellersHandler::handleRequest",
        role: role.arn,
        runtime: "java11",
        timeout: 15
    });
    
    
    new aws.lambda.Permission("kt-sample-sellers-gateway-permission", {
        action: "lambda:InvokeFunction",
        function: lambdaFunction.name,
        principal: "apigateway.amazonaws.com"
    });
    
    const lambdaIntegration = new aws.apigatewayv2.Integration("kt-sample-sellers-api-lambda-integration", {
        apiId: api.id,
        integrationType: "AWS_PROXY",
        integrationUri: lambdaFunction.arn,
        payloadFormatVersion: "2.0"
    });
    
    new aws.apigatewayv2.Route("kt-sample-sellers-route", {
        apiId: api.id,
        routeKey: "GET /sellers",
        target: pulumi.interpolate `integrations/${lambdaIntegration.id}`
    });
}