import { APIGatewayProxyEvent } from 'aws-lambda';
import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}


/**
 * Parse an APIGatewayProxy's event  and return a JWT token
 * @param APIGatewayProxyEvent event to parse
 * @returns JWT token
 */
export function decodeJWTFromAPIGatewayEvent(event: APIGatewayProxyEvent): string {

  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  return split[1];
}
