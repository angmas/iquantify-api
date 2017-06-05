#!/bin/bash

TOKEN="ywmS+xZm1DnK4wYvcKIi+b/g3T0J6JN4iT8ouqrTC34=--pm7Ofe9UsOiQQx4KHFKpLPiV2iqumiqIYF8/7yaEqcE="
ID="5935b1c7e801c63310950f61"
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
