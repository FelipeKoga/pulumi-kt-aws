import software.amazon.awscdk.core.Stack
import software.amazon.awscdk.core.StackProps
import software.amazon.awscdk.services.apigateway.*;
import software.amazon.awscdk.services.lambda.Code
import software.amazon.awscdk.services.lambda.Function
import software.amazon.awscdk.services.lambda.FunctionProps
import software.amazon.awscdk.services.lambda.Runtime
import software.constructs.Construct

class InfraStack(
    scope: Construct?,
    id: String?,
    props: StackProps?
) : Stack(scope, id, props) {

    init {
        val lambda = Function(
            this, "products", FunctionProps.builder()
                .functionName("products")
                .runtime(Runtime.JAVA_11)
                .handler("dev.koga.ProductsHandler")
                .code(Code.fromAsset("products/build/libs/products-1.0.jar"))
                .build()
        )

        val api = RestApi(
            this,
            "kotlinAwsLambdaApi",
            RestApiProps.builder().restApiName("Kotlin AWS Lambda API").build()
        )

        val productsResource = api.root.addResource("products")
        productsResource.addMethod("GET", LambdaIntegration(lambda))
    }
}
