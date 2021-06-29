import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'
import config from '../config'
import SimpleReactLightbox from 'simple-react-lightbox'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...config} />
      <SimpleReactLightbox>
        <Component {...pageProps} />
      </SimpleReactLightbox>
    </>
  )
}
export default MyApp
