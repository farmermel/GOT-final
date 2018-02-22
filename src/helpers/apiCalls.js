export const firstApiCall = () => {
  const initialFetch = fetch('http://localhost:3001/api/v1/houses');
  return initialFetch.json();
}