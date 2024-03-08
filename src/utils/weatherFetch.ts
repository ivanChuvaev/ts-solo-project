/**
 * Fetch wrapper that injects weather api key in search parameters
 * @param urlString url string
 */
export default async function weatherFetch(urlString: string, options?: RequestInit): Promise<Response> {
  const sp = new URLSearchParams();
  sp.append('key', import.meta.env.VITE_APP_WEATHER_API_KEY);
  const mark = urlString.indexOf('?') === -1 ? '?' : '&';
  return fetch(`/weather-api/${urlString.replace(/^\//, '')}${mark}${sp.toString()}`, options);
}
