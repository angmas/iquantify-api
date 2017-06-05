#!/bin/sh

TOKEN="ywmS+xZm1DnK4wYvcKIi+b/g3T0J6JN4iT8ouqrTC34=--pm7Ofe9UsOiQQx4KHFKpLPiV2iqumiqIYF8/7yaEqcE="
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
