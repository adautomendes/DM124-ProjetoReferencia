apps=("mongo" "auth" "monitor" "petstore")

for app in "${apps[@]}"; do
    helm package ./$app/helm
done

for app in "${apps[@]}"; do
    helm upgrade --install $app ./$app-0.1.0.tgz
done