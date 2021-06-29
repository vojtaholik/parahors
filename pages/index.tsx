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

const LandingPage: React.FC<{ works: any }> = ({ works }) => {
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
      <SRLWrapper
        elements={works.map((work: any) => {
          return {
            src: work.src,
            caption: work.src
              .replace('@2x', '')
              .replace('.jpg', '')
              .replace('.png', '')
              .replace('.jpeg', ''),
          }
        })}
      >
        <div className="grid w-full max-w-screen-xl lg:grid-cols-2 grid-cols-1 lg:gap-8 mx-auto ">
          {works.map((work: any, i: number) => {
            const fileName = work.src
              .replace('@2x', '')
              .replace('.jpg', '')
              .replace('.png', '')
              .replace('.jpeg', '')
            // .replace(`.${work.size.type}`, '')
            // const [isReady, setIsReady] = React.useState(false)
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
                <div className="flex items-center justify-center w-full">
                  <Image
                    placeholder="blur"
                    quality={50}
                    src={require(`../public/${FOLDER}/${work.src}`)}
                    alt={fileName}
                    className="rounded-md hover:scale-105 transition-transform ease-in-out duration-300"
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
  // const WORKS_PATH = path.join(process.cwd(), `public/${FOLDER}`)
  const WORKS_PATH = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    `public/${FOLDER}`
  )
  const workFiles = fs.readdirSync(WORKS_PATH, { withFileTypes: true })
  const works = workFiles
    .filter((work) => work.isFile()) // is not a folder
    .map((work) => {
      // const input = fs.readFileSync(WORKS_PATH + '/' + work.name)
      // const size = probe.sync(input)
      return {
        src: work.name,
        //  size
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
