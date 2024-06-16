import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createProductsResources(
    role: any, api: any
) {
    const lambdaFunction = new aws.lambda.Function("kt-sample-products", {
        code: new pulumi.asset.FileArchive("../products/build/libs/products.jar"),
        handler: "dev.koga.ProductsHandler::handleRequest",
        role: role.arn,
        runtime: "java11",
        timeout: 15
    });
    
    
    new aws.lambda.Permission("kt-sample-products-gateway-permission", {
        action: "lambda:InvokeFunction",
        function: lambdaFunction.name,
        principal: "apigateway.amazonaws.com"
    });
    
    const lambdaIntegration = new aws.apigatewayv2.Integration("kt-sample-products-api-lambda-integration", {
        apiId: api.id,
        integrationType: "AWS_PROXY",
        integrationUri: lambdaFunction.arn,
        payloadFormatVersion: "2.0"
    });
    
    new aws.apigatewayv2.Route("kt-sample-products-route", {
        apiId: api.id,
        routeKey: "GET /products",
        target: pulumi.interpolate `integrations/${lambdaIntegration.id}`
    });
}