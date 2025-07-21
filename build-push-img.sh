apps=("auth" "monitor" "petstore")

for app in "${apps[@]}"; do
    docker build -t us-central1-docker.pkg.dev/pessoal-466617/docker-repo/dm124-$app ./$app
    docker push us-central1-docker.pkg.dev/pessoal-466617/docker-repo/dm124-$app
    docker image rm us-central1-docker.pkg.dev/pessoal-466617/docker-repo/dm124-$app
done

docker image prune -f