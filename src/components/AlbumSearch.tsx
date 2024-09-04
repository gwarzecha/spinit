// use client ensures that Next.js knows to render the component on the client-side so it can use
// features like state management and DOM interaction
'use client';

import { useState } from 'react';

const AlbumSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/musicbrainz?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch album data');
      }

      const data = await response.json();
      const exactMatches = data.releases?.filter(
        (release: any) => release.title.toLowerCase() === query.toLowerCase()
      );
      setResults({ ...data, releases: exactMatches });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          console.log(e.target.value); // Debug log
          setQuery(e.target.value);
        }}
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
        }}
        placeholder="Search for an album"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>Error: {error}</p>}

      {results && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {results.releases?.map((release: any) => (
              <li key={release.id}>
                <strong>{release.title}</strong> by{' '}
                {release['artist-credit']
                  ?.map((credit: any) => credit.name)
                  .join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlbumSearch;
