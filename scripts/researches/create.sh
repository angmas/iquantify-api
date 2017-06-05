#!/bin/bash

TOKEN="ywmS+xZm1DnK4wYvcKIi+b/g3T0J6JN4iT8ouqrTC34=--pm7Ofe9UsOiQQx4KHFKpLPiV2iqumiqIYF8/7yaEqcE="
TITLE="Crows in WA"
DESC="This app keeps count of crows in the state of WA"
DIR="Click the +1 button when you see a crow. Click the -1 button to correct for a mistake."
MSG="Happy Counting!"
HIDE=false

API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "research": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'",
      "directions": "'"${DIR}"'",
      "announcement": {
        "message": "'"${MSG}"'"
      },
      "hide": "'"${HIDE}"'"
    }
  }'

echo
