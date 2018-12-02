// export const HASURA_GRAPHQL_URL = "hackntx.herokuapp.com/v1alpha1/graphql"

// const HASURA_GRAPHQL_ENGINE_HOSTNAME = window.location.host;
const HASURA_GRAPHQL_ENGINE_HOSTNAME = "hackntx.herokuapp.com"

const scheme = (proto) => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
}

export const GRAPHQL_URL = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1alpha1/graphql`;
export const REALTIME_GRAPHQL_URL = `${scheme('ws')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1alpha1/graphql`;
export const callbackUrl = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/callback`;
