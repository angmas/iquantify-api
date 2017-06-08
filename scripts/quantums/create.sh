#!/bin/bash

TOKEN="ehWjM0VcLVA4kzxzndBxQPv/77DMosUfhhlRtDahvak=--G0iklCtZFfv6fse3cY/CJqq8g609/WWm8mOyPQ4/RvY="
ID="5935bb61101f7a341fd8ecf6"
COUNT=1
LONG=-180
LAT=88

API="http://localhost:4741"
URL_PATH="/research/${ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "quantum": {
      "count": "'"${COUNT}"'",
      "longitude": "'"${LONG}"'",
      "latitude": "'"${LAT}"'"
    }
  }'

echo
