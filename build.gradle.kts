plugins {
    kotlin("jvm") version "1.9.23"
}

group = "dev.koga"
version = "1.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation("software.amazon.awscdk:core:1.204.0")
    implementation("software.amazon.awscdk:lambda:1.204.0")
    implementation("software.amazon.awscdk:apigateway:1.204.0")

    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(11)
}