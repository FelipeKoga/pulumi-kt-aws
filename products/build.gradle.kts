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
    shadow(localGroovy())
    shadow(gradleApi())

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
    archiveFileName.set("products.jar")
}

tasks.register<Zip>("buildLambdaZip") {
    from(sourceSets.main.get().output) {
        into("classes")
    }
    from(configurations.runtimeClasspath) {
        into("lib")
    }
    archiveFileName.set("products.zip")
    destinationDirectory.set(layout.buildDirectory.dir("distributions"))
}