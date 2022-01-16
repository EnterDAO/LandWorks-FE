import { ApolloClient, ApolloQueryResult, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import config from '../../config';

/**
 * Graph Node client utilising and switching between Primary/Fallback Graph nodes
 */
export class GraphClient {
  /**
   * Executes a GraphQL call. Uses the primary Graph Node.
   * If the call fails, the same call is executed against the fallback Graph Node
   * @param options GraphQL options
   * @param primary Whether to use the primary or the fallback node. Defaults to primary
   */
  public static async get(options: any, primary = true): Promise<ApolloQueryResult<any>> {
    const client = GraphClient._getClient(primary);

    try {
      return await client.query(options);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(`Call to Graph at URL: ${client.link.options.uri} failed!`);
      // Try getting result through the fallback provider
      if (primary) {
        return await this.get(options, false);
      } else {
        throw e;
      }
    }
  }

  /**
   * Returns an instance of an ApolloClient
   * @param primary whether to use to primary or fallback node
   * @private
   */
  private static _getClient(primary: boolean): ApolloClient<any> {
    return new ApolloClient({
      uri: primary ? config.graph.primaryUrl : config.graph.fallbackUrl,
      cache: new InMemoryCache(),
    });
  }

  public static _getWsClient(): ApolloClient<any> {
    const httpLink = new HttpLink({
      uri: config.graph.primaryUrl,
    });

    const wsLink = new WebSocketLink({
      uri: config.graph.wsPrimaryUrl,
      options: {
        reconnect: true,
      },
    });

    // The split function takes three parameters:
    //
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }
}
