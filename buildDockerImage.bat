rem #!/bin/bash

ng build
cp -Rf dist build
cd build
docker build -t jdbjdb/environmentscreen:$1 .