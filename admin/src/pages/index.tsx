import Link from 'next/link';

export default function AdminHome({ lang }: { lang: any }) {
  return (
    <div className="card">
      <h1>{lang.adminPanel}</h1>
      <nav>
        <Link href="/stats">{lang.statistics}</Link> |{' '}
        <Link href="/disputes">{lang.disputes}</Link> |{' '}
        <Link href="/support">{lang.support}</Link> |{' '}
        <Link href="/users">{lang.users}</Link>
      </nav>
    </div>
  );
}
