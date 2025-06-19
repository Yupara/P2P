import { useEffect, useState } from 'react';

export default function WalletPage({ lang }: { lang: any }) {
  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/wallets/my').then(r => r.json()).then(setWallets);
  }, []);

  return (
    <div className="card">
      <h2>{lang.wallet}</h2>
      <table>
        <thead>
          <tr>
            <th>{lang.asset}</th>
            <th>{lang.amount}</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map(w => (
            <tr key={w.id}>
              <td>{w.asset}</td>
              <td>{w.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
