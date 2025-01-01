export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  // Fetch data from API using the ID
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/api/share?id=${slug}`);
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h1>Shared Text</h1>
      {slug && (
        <div>
          <p>ID: {slug}</p>
          <p>Text: {fetchData().then((data) => data.text)}</p>
          <p>URL: {fetchData().then((data) => data.url)}</p>
        </div>
      )}
    </div>
  );
}