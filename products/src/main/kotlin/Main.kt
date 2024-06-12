package dev.koga

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler


class ProductsHandler : RequestHandler<Map<String, Any>, String> {
    override fun handleRequest(input: Map<String, Any>, context: Context): String {
        val product = Product(id = 1, name = "my product")
        return "Hello from ProductsHandler! $product"
    }
}