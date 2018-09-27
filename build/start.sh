#!/bin/bash

function replaceEnvVars {
    sed -i -e "s,___JSON_SERVER_URL___,$JSON_SERVER_URL,g" $1
}

for f in /var/www/portal/*.js
do
    replaceEnvVars $f
done

for f in /var/www/portal/*.map
do
    replaceEnvVars $f
done

# echo "Waiting for backend to start"
# /waitForIt.sh $BACKEND_HOSTNAME:80 -t 180
# echo "Backend started, starting nginx"
nginx -g "daemon off;"