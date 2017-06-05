#!/bin/sh

TOKEN="ywmS+xZm1DnK4wYvcKIi+b/g3T0J6JN4iT8ouqrTC34=--pm7Ofe9UsOiQQx4KHFKpLPiV2iqumiqIYF8/7yaEqcE="
RESEARCHID="5935bb61101f7a341fd8ecf6"
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}/${RESEARCHID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
