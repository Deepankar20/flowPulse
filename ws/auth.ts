export default async function authenticateApiKey(
  apiKey: string
): Promise<String> {
  /**
   * Check api key in the cache
   * if not present then do a DB call to check the APIkey
   * then if valide apiKey then add this to cache
   * return the validated apikey
   */

  return apiKey;
}
