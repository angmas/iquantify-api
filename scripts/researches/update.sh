#!/bin/bash
TOKEN="ywmS+xZm1DnK4wYvcKIi+b/g3T0J6JN4iT8ouqrTC34=--pm7Ofe9UsOiQQx4KHFKpLPiV2iqumiqIYF8/7yaEqcE="
RESEARCHID="5935bb61101f7a341fd8ecf6"
# TITLE="Safeco Toastmasters"
# DESC="This is the audible pause counter"
# DIR="Click the +1 button when you hear an audible pause like umms or uhs. Click the -1 button to correct for a mistaken count."
MSG="Last day to count is 6/9/2017"
HIDE="false"
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}/${RESEARCHID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "research": {
      "announcement": {
        "message": "'"${MSG}"'"
      },
      "hide": "'"${MSG}"'"
    }
  }'

echo
