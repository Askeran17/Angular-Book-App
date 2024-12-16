web: concurrently "cd Api && dotnet publish -c Release -o out && cd out && dotnet Api.dll --urls=http://*:5089" "node server.js"
