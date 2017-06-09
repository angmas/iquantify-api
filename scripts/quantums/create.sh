#!/bin/bash

TOKEN="s79RC33kDu8olW7w0zROpKaqWFsz6wOE0jrIPH0w7m4=--+H4VdK12O76Z09mR1Eh7gDVnxRhtllGByq9OH2sFGA8="
RESEARCHID="5935bb61101f7a341fd8ecf6"
COUNT=1
LONG=-180
LAT=88

API="http://localhost:4741"
URL_PATH="/research/${RESEARCHID}"

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
