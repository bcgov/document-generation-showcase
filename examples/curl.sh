#! /usr/bin/env bash

token=$(curl --request POST \
   --url 'https://dev.oidc.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token' \
   -H 'content-type: application/x-www-form-urlencoded' \
   --data grant_type=client_credentials \
   --data client_id="$CLIENT_ID" \
   --data client_secret="$CLIENT_SECRET" | jq -r '.access_token')

curl --request POST \
   --url 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render' \
   -H "Authorization: Bearer $token" \
   -H 'content-type: application/json' \
   -o 'test.pdf' \
   --data-binary @- << EOF
{
  "data": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "template": {
    "encodingType": "base64",
    "fileType": "txt",
    "content": "SGVsbG8ge2QuZmlyc3ROYW1lfSB7ZC5sYXN0TmFtZX0hCg=="
  },
  "options": {
    "cacheReport": false,
    "convertTo": "pdf",
    "overwrite": true,
    "reportName": "{d.firstName}-{d.lastName}.pdf"
  }
}
EOF


# cat template.txt| bash64