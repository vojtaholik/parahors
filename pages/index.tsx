import * as React from 'react'
import { GetStaticProps } from 'next'
import getConfig from 'next/config'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Logo from '../public/logo.jpeg'
import { SRLWrapper } from 'simple-react-lightbox'

const { serverRuntimeConfig } = getConfig()
const IMGS_DIR = 'illustrations'
const lightboxOptions = {
  buttons: {
    showDownloadButton: false,
  },
}

function getCaption(name: string) {
  return name
    .replace('@2x', '')
    .replace('.jpg', '')
    .replace('.png', '')
    .replace('.jpeg', '')
}

const LandingPage: React.FC<{ works: any }> = ({ works }) => {
  const [loadAll, setLoadAll] = React.useState(false)

  return (
    <div className="p-5">
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-screen-md">
          <Image
            priority={true}
            src={Logo}
            alt="Parahors"
            quality={95}
            placeholder="blur"
          />
        </div>
      </div>
      <SRLWrapper options={lightboxOptions}>
        <div className="grid w-full max-w-screen-xl lg:grid-cols-2 grid-cols-1 lg:gap-8 mx-auto">
          {works.map((work: any, i: number) => {
            const caption = getCaption(work.src)
            return (
              <div
                key={caption}
                className={`py-16 flex flex-col items-center justify-center cursor-pointer`}
              >
                <div
                  className="flex items-center justify-center w-full group rounded-md overflow-hidden"
                  onClick={() => !loadAll && setLoadAll(true)}
                >
                  <Image
                    placeholder="blur"
                    quality={50}
                    src={require(`../public/${IMGS_DIR}/${work.src}`)}
                    alt={caption}
                    className="group-hover:scale-105 transition-transform ease-in-out duration-300 rounded-md"
                    loading={loadAll ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="text-gray-400 font-mono text-xs pt-8">
                  {caption}
                </div>
              </div>
            )
          })}
        </div>
      </SRLWrapper>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const WORKS_PATH = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    `public/${IMGS_DIR}`
  )
  const workFiles = fs.readdirSync(WORKS_PATH, { withFileTypes: true })
  const works = workFiles
    .filter((work) => work.isFile())
    .map((work) => {
      return {
        src: work.name,
      }
    })

  if (process.env.NODE_ENV === 'development') {
    console.log({ works })
  }

  return {
    props: {
      works,
    },
  }
}
export default LandingPage
