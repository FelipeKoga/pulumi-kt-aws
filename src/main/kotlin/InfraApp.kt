import software.amazon.awscdk.core.App
import software.amazon.awscdk.core.StackProps

object InfraApp {

    @JvmStatic
    fun main(args: Array<String>) {
        val app = App()

        InfraStack(
            app,
            "KotlinAwsLambdaStack",
            StackProps.builder().build()
        )

        app.synth()
    }
}

