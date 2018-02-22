export const firstApiCall = async () => {
  try {
    const initialFetch = await fetch('http://localhost:3001/api/v1/houses');
    return initialFetch.json();
  } catch (error) {
    throw new Error(error);
  }
};