plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.5.0"
}
rootProject.name = "kotlin-aws-lambda"
include("sellers")
include("products")
include("core")
