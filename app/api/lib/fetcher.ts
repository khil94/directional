const API_BASE_URL = process.env.API_BASE_URL;

export async function fetcher(
  input: string | URL | Request,
  init?: RequestInit
) {
  return fetch(`${API_BASE_URL}/${input}`, init);
}
