import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        {/* Next.js Link for SPA routing */}
        <Link href="/">Sick fits</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}
