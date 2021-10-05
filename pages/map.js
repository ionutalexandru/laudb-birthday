import Head from "next/head";
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { PLACES_PATH, placeFilePaths } from "../utils/mdxUtils";

export default function Map({ places }) {
  const MapComponent = dynamic(() => import("../components/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });
  return (
    <div className="home flex flex-col items-center justify-center h-screen w-screen">
      <Head>
        <title>LauDB Birthday</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full h-full flex-1 text-center">
        <div id="map" className="w-full h-full">
          <MapComponent coords={places.map(({ data: { coords } }) => coords)} />
        </div>
      </main>
    </div>
  );
}

export function getStaticProps() {
  const places = placeFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(PLACES_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { places } };
}
