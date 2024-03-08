/**
 * retrieving base url of different resources
 */
function getBaseUrl(resource: string | Request | URL): string {
  if (resource instanceof Request) return resource.url;
  if (resource instanceof URL) return resource.href;
  if (typeof resource === 'string') return resource;
  throw new Error('resource have unexpected type');
}

/**
 * Appending api key as query parameter,   
 * case when there are other params is taken into account   
 * case when there is already api key in params is taken into account
 */
function injectApiKey<T extends string | Request | URL>(resource: T): T {
  const baseUrl = getBaseUrl(resource);
  const mark = baseUrl.indexOf('?') === -1 ? '?' : '&'
  const param = baseUrl.indexOf(import.meta.env.VITE_APP_WEATHER_API_KEY) === -1 ? `key=${import.meta.env.VITE_APP_WEATHER_API_KEY}` : '';
  if (resource instanceof Request) {
    // using defineProperty because resource.url is not writeable
    Object.defineProperty(resource, "url", {
      value: baseUrl + mark + param,
      writable: false
    })
  } else if (resource instanceof URL) {
    resource.searchParams.append('key', import.meta.env.VITE_APP_WEATHER_API_KEY);
  } else if (typeof resource === 'string') {
    resource = (baseUrl + mark + param) as T; // as T because typescript yells
  }
  return resource;
}

/**
 * Wrapper of fetch, will include authorization api token in query params   
 * of each request, supports string url and Request object
 */
export default async function weatherFetchTest(resource: string | Request | URL, options: RequestInit): Promise<Response> {
  resource = injectApiKey(resource);
  return fetch(resource, options);
}
