import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

plugins {
    kotlin("jvm") version "1.9.23"
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

kotlin {
    jvmToolchain(11)
}

//tasks.withType<Jar> {
//    manifest {
//        attributes["Main-Class"] = application.mainClass.get()
//    }
//
//    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
//
//    from(sourceSets.main.get().output)
//
//    dependsOn(configurations.runtimeClasspath)
//    from({
//        configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
//    })
//}

//tasks {
//    named<ShadowJar>("shadowJar") {
//        archiveBaseName.set("shadow")
//        mergeServiceFiles()
//        manifest {
//            attributes(mapOf("Main-Class" to "src/main/kotlin/InfraApp.kt"))
//        }
//    }
//}