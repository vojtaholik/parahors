import * as React from 'react'
import { GetStaticProps } from 'next'
import getConfig from 'next/config'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Logo from '../public/logo.jpeg'
import { SRLWrapper } from 'simple-react-lightbox'
import randomWords from 'public/random-words.json'
import random from 'lodash/random'

const { serverRuntimeConfig } = getConfig()
const IMGS_DIR = 'illustrations'
const lightboxOptions = {
  buttons: {
    showDownloadButton: false,
  },
}

function getMetadata(fileName: string) {
  const arr = fileName.split('-')
  const caption = arr.length > 1 ? arr[1] : null
  const index = arr[0]
  function removeSuffix(string: string) {
    return string
      .replace('@2x', '')
      .replace('.jpg', '')
      .replace('.png', '')
      .replace('.jpeg', '')
  }
  return {
    caption: caption
      ? removeSuffix(caption)
      : randomWords.words[random(0, randomWords.words.length)],
    index: removeSuffix(index),
  }
}

const LandingPage: React.FC<{ works: any }> = ({ works }) => {
  const [loadAll, setLoadAll] = React.useState(false)

  return (
    <div className="sm:p-8 p-5 bg-gray-100 lg:pb-24 sm:pb-16 pb-8">
      <div className="sm:-m-8 -m-5">
        <header className="min-h-[60vh] flex items-center justify-center w-full bg-white">
          <div className="max-w-screen-md">
            <Image
              priority={true}
              src={Logo}
              alt="Parahors"
              quality={95}
              placeholder="blur"
            />
          </div>
        </header>
      </div>

      <SRLWrapper options={lightboxOptions}>
        <div className="grid w-full max-w-screen-2xl xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-5 mx-auto sm:pt-16 pt-10">
          {works.map((work: any, i: number) => {
            const { caption, rank } = work
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center cursor-pointer "
              >
                <div
                  className="relative flex items-center justify-center w-full group rounded-md overflow-hidden bg-white"
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
                  {process.env.NODE_ENV === 'development' && (
                    <div className="opacity-40 absolute left-3 bottom-3 flex w-full items-center justify-between pt-4 text-xs font-mono text-gray-600">
                      {/* <div className="">{caption}</div> */}
                      <div>{rank}</div>
                    </div>
                  )}
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
    .sort()
    .map((work) => {
      return {
        src: work.name,
        caption: getMetadata(work.name).caption,
        rank: getMetadata(work.name).index,
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
