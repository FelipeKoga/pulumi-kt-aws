plugins {
    kotlin("jvm")
    id("com.github.johnrengelman.shadow") version "8.1.1"
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