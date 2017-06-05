# iQuantify API



## Links
-   [iQuantify API](#)
-   [iQuantify Client](#)
-   [iQuantify Client Repository](#)
-   [iQuantify ERD](https://1drv.ms/p/s!AtDNiki6QJ6riPo3T120IVNQdkSZ4Q)

## Dependencies

Install with `npm install`.

-   [`express`](http://expressjs.com/)
-   [`mongoose`](http://mongoosejs.com/)



## Installation

1.  Fork & Clone/Download & Unzip this repository.
1.  Move into the new project and `git init`.
1.  Install dependencies with `npm install`.
1.  Set a SECRET_KEY in the environment. For development and testing, set the SECRET_KEY from the root of your
 repository using

```sh
echo SECRET_KEY=$(/usr/local/opt/openssl/bin/openssl rand -base64 66 | tr -d '\n') >>.env
```

1.  Run the API server with `npm start`. If you want your code to be reloaded on
    change, you should `npm install -g nodemon` and use `nodemon` instead of
    `npm start`.
1.  Once everything is working, make an initial commit.


In order to make requests from your deployed client application, you will need
to set `CLIENT_ORIGIN` in the environment (e.g. `heroku config:set
CLIENT_ORIGIN=https://<github-username>.github.io`).

## Structure

Dependencies are stored in [`package.json`](package.json).

Do not configure `grunt` packages directly in the
[`Gruntfile.js`](Gruntfile.js). Instead, store configurations in the
[`grunt`](grunt) directory. You won't need a top-level key, since that's
generated by the `Gruntfile.js` based on the filename of the configuration
object stored in the `grunt` directory.

Developers should store JavaScript files in [`app/controllers`](app/controllers)
 and [`app/models`](app/models).
Routes are stored in [`config/routes.js`](config/routes.js)

## Tasks

Developers should run these often!

-   `grunt nag` or just `grunt`: runs code quality analysis tools on your code
    and complains
-   `grunt reformat`: reformats all your code in a standard style
-   `grunt test`: runs any automated tests

## API

Scripts are included in [`scripts`](scripts) to test built-in actions.

## Summary of API EndPoints
| Verb   | URI Pattern                    | Controller#Action         |
|--------|--------------------------------|---------------------------|
| POST   | `/sign-up`                     | `users#signup`            |
| POST   | `/sign-in`                     | `users#signin`            |
| DELETE | `/sign-out/:id`                | `users#signout`           |
| PATCH  | `/change-password/:id`         | `users#changepw`          |
| GET    | `/researches`                  | `researches#index`        |
| POST   | `/researches`                  | `researches#create`       |
| GET    | `/researches/:id`              | `researches#show`         |
| PATCH  | `/researches/:id`              | `researches#update`       |
| DELETE | `/researches/:id`              | `researches#destroy`      |


### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:4741/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH http://localhost:4741/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE http://localhost:4741/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET http://localhost:4741/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:4741/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```
### Researches

#### GET /researches

Request:
```sh
TOKEN="<your token"
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```

Response:
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
	"researches": [
		{
			"_id": "5935b3a2101f7a341fd8ecf4",
			"updatedAt": "2017-06-05T19:40:18.451Z",
			"createdAt": "2017-06-05T19:40:18.451Z",
			"title": "Crows in WA",
			"description": "This app keeps count of crows in the state of WA",
			"directions": "Click the +1 button when you see a crow. Click the -1 button to correct for a mistake.",
			"_owner": "5935b101c2c3b332cec8e544",
			"__v": 0,
			"hide": false,
			"announcement": {
				"message": "Happy Counting!",
				"updatedAt": "2017-06-05T19:40:18.443Z"
			},
			"length": 11,
			"id": "5935b3a2101f7a341fd8ecf4",
			"editable": true
		},
		{
			"_id": "5935bb61101f7a341fd8ecf6",
			"updatedAt": "2017-06-05T20:13:21.754Z",
			"createdAt": "2017-06-05T20:13:21.754Z",
			"title": "Safeco Toastmasters",
			"description": "This is the audible pause counter",
			"directions": "Click the +1 button when you hear an audible pause like umms or uhs. Click the -1 button to correct for a mistaken count.",
			"_owner": "5935b101c2c3b332cec8e544",
			"__v": 0,
			"hide": true,
			"announcement": {
				"message": "Happy Counting!",
				"updatedAt": "2017-06-05T20:13:21.753Z"
			},
			"length": 19,
			"id": "5935bb61101f7a341fd8ecf6",
			"editable": true
		}
	]
}
```
#### POST /researches

Request:
```sh
TOKEN="<your token>"
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
```

Response:
```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
	"research": {
		"__v": 0,
		"updatedAt": "2017-06-05T19:40:18.451Z",
		"createdAt": "2017-06-05T19:40:18.451Z",
		"title": "Crows in WA",
		"description": "This app keeps count of crows in the state of WA",
		"directions": "Click the +1 button when you see a crow. Click the -1 button to correct for a mistake.",
		"_owner": "5935b101c2c3b332cec8e544",
		"_id": "5935b3a2101f7a341fd8ecf4",
		"hide": false,
		"announcement": {
			"message": "Happy Counting!",
			"updatedAt": "2017-06-05T19:40:18.443Z"
		},
		"length": 11,
		"id": "5935b3a2101f7a341fd8ecf4",
		"editable": true
	}
}
```
#### SHOW /researches/:id

Request:
```sh
#!/bin/sh

TOKEN="<your token"
RESEARCHID="5935bb61101f7a341fd8ecf6"
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}/${RESEARCHID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```

Response:
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
	"research": {
		"_id": "5935bb61101f7a341fd8ecf6",
		"updatedAt": "2017-06-05T20:13:21.754Z",
		"createdAt": "2017-06-05T20:13:21.754Z",
		"title": "Safeco Toastmasters",
		"description": "This is the audible pause counter",
		"directions": "Click the +1 button when you hear an audible pause like umms or uhs. Click the -1 button to correct for a mistaken count.",
		"_owner": "5935b101c2c3b332cec8e544",
		"__v": 0,
		"hide": true,
		"announcement": {
			"message": "Happy Counting!",
			"updatedAt": "2017-06-05T20:13:21.753Z"
		},
		"length": 19,
		"id": "5935bb61101f7a341fd8ecf6",
		"editable": true
	}
}
```
#### SHOW /researches/:id

Request:
```sh
TOKEN="<your token"
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
```

Response:
```md
HTTP/1.1 204 No Content
```

#### DELETE /researches/:id

Request:
```sh
TOKEN="<your token"
RESEARCHID="5935b1c7e801c63310950f61"
API="http://localhost:4741"
URL_PATH="/researches"

curl "${API}${URL_PATH}/${RESEARCHID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

```

Response:
```md
HTTP/1.1 204 No Content
```
