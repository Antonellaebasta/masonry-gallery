export const fetchData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `${process.env.PEXELS_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}.`);
  }

  return response.json();
}
