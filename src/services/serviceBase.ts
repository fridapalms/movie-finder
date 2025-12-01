//Skapar get-funktion som hämtar data från API och json-ifierar det
export const get = async <T>(url: string) => {
  const response = await fetch(url);
  const data: T = await response.json();

  return data;
};
