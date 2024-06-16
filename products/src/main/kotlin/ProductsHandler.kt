package dev.koga

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent


class ProductsHandler : RequestHandler<Any, Any> {
    override fun handleRequest(input: Any, context: Context): Any {
        val product = Product(id = 1, name = "my product")

        return APIGatewayProxyResponseEvent().apply {
            statusCode = 200
            body = "Hello from ProductsHandler! $product"
        }
    }
}