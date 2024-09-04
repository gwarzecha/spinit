import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>SpinIt</h1>
        <Link href="/search">Search for an album</Link>
      </div>
    </main>
  );
}
