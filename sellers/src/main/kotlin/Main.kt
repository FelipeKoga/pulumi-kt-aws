package dev.koga

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler


class SellersHandler : RequestHandler<Map<String, Any>, String> {
    override fun handleRequest(input: Map<String, Any>, context: Context): String {
        val seller = Seller(id = 1, name = "Seller")
        return "Hello from SellersHandler! $seller"
    }
}