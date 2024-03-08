
/**
 * Wrapper of fetch, will include authorization api token in query params   
 * of each request, supports string url and Request object
 */
export default async function ninjaFetch(urlString: string, options?: RequestInit): Promise<Response> {
  const newOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      'X-Api-Key': import.meta.env.VITE_APP_NINJA_API_KEY
    }
  } 
  return fetch(`https://api.api-ninjas.com/v1/${urlString.replace(/^\//, '')}`, newOptions);
}
