./gradlew clean shadowJar

cd infra

if [ $? -eq 0 ]; then
    echo "Build successful, running Pulumi..."

    # Executa o Pulumi
    pulumi up --stack=$1 --yes

    # Verifica se o Pulumi foi bem-sucedido
    if [ $? -eq 0 ]; then
        echo "Pulumi up successful!"
    else
        echo "Pulumi up failed."
        exit 1
    fi
else
    echo "Build failed."
    exit 1
fi
