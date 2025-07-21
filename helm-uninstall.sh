apps=("mongo" "auth" "monitor" "petstore")

for app in "${apps[@]}"; do
    helm uninstall $app
done