#! /bin/bash
docker run -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://jesse:hackntx@12.133.149.254:5432/dm \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:v1.0.0-alpha31