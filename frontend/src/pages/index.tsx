import { NextPage } from 'next';
import Link from 'next/link';

const IndexPage: NextPage<{ lang: any }> = ({ lang }) => (
  <div className="card">
    <h2>{lang.welcome}</h2>
    <Link href="/login">{lang.login}</Link> | <Link href="/register">{lang.register}</Link>
    <br /><br />
    <Link href="/orders">{lang.myOrders}</Link> | <Link href="/deals">{lang.myDeals}</Link>
    <br /><br />
    <Link href="/wallet">{lang.wallet}</Link> | <Link href="/support">{lang.support}</Link>
  </div>
);

export default IndexPage;
