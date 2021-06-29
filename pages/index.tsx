import * as React from 'react'
import { GetStaticProps } from 'next'
import getConfig from 'next/config'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Logo from '../public/logo.jpeg'
import { SRLWrapper } from 'simple-react-lightbox'

const { serverRuntimeConfig } = getConfig()
const FOLDER = 'illustrations'

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
      <SRLWrapper>
        <div className="grid w-full max-w-screen-xl lg:grid-cols-2 grid-cols-1 lg:gap-8 mx-auto">
          {works.map((work: any, i: number) => {
            const fileName = getCaption(work.src)
            const randomNr = Math.floor(Math.random() * (6 - 3) + 3)
            const colSpan =
              i % 3 == 0
                ? `col-span-${randomNr}`
                : i % 4 == 0
                ? `col-start-2 col-span-${randomNr}`
                : `col-start-3 col-span-5`

            return (
              <div
                key={fileName}
                // className={`py-16 flex flex-col items-center justify-center ${colSpan}`}
                className={`py-16 flex flex-col items-center justify-center cursor-pointer`}
              >
                <div
                  className="flex items-center justify-center w-full group rounded-md overflow-hidden"
                  onClick={() => !loadAll && setLoadAll(true)}
                >
                  <Image
                    // @ts-ignore
                    srl_gallery_image="true"
                    placeholder="blur"
                    quality={50}
                    src={require(`../public/${FOLDER}/${work.src}`)}
                    alt={fileName}
                    className="group-hover:scale-105 transition-transform ease-in-out duration-300 rounded-md"
                    loading={loadAll ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="text-gray-400 font-mono text-xs pt-8">
                  {fileName}
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
    `public/${FOLDER}`
  )
  const workFiles = fs.readdirSync(WORKS_PATH, { withFileTypes: true })
  const works = workFiles
    .filter((work) => work.isFile()) // is not a folder
    .map((work) => {
      return {
        src: work.name,
      }
    })
  console.log(works)

  return {
    props: {
      works,
    },
  }
}
export default LandingPage
