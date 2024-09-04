import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const USER_AGENT = 'SpinIt/1.0 ( gmwarzecha@tutanota.com )';

  if (!query) {
    return NextResponse.json(
      { error: 'No query parameter provided' },
      { status: 400 }
    );
  }

  const musicbrainzUrl = `https://musicbrainz.org/ws/2/release?query=${encodeURIComponent(
    query
  )}&fmt=json`;

  try {
    const response = await fetch(musicbrainzUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': USER_AGENT,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch album data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
