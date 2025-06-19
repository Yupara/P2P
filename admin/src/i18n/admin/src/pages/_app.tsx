import '../styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { getLang, LangKey } from '../i18n';

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const lang = getLang(locale as LangKey);
  return <Component {...pageProps} lang={lang} />;
}
