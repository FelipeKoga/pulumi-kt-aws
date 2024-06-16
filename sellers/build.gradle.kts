import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

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
    implementation(project(":core"))
    implementation("com.amazonaws:aws-lambda-java-core:1.2.1")
    implementation("com.amazonaws:aws-lambda-java-events:3.10.0")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(11)
}

tasks.named<ShadowJar>("shadowJar") {
    enabled = true
    archiveFileName.set("sellers.jar")
}