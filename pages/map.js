import Head from "next/head";
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import Card from "../components/Card";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import * as React from "react";

export default function Map({ places }) {
  const [activeMarker, setActiveMarker] = React.useState(null);

  const onClickMarker = (id) => {
    if (!activeMarker || activeMarker !== id) {
      setActiveMarker(id);
    } else {
      setActiveMarker(null);
    }
  };

  const selectedPlace =
    places.find(({ data: { id } }) => id === activeMarker) || null;

  const locations = places.map(({ data: { position, id } }) => ({
    position,
    id,
  }));

  const MapComponent = dynamic(() => import("../components/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });
  return (
    <div className="home flex flex-col items-center justify-center min-h-screen h-screen md:h-screen md:max-h-screen w-screen">
      <Head>
        <title>LauDB Birthday</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full h-full flex-1 text-center">
        <div id="map" className="w-full h-full">
          <MapComponent locations={locations} onClickMarker={onClickMarker} />
        </div>
        {!selectedPlace ? null : (
          <div
            className="static md:fixed bottom-0 right-0 w-screen md:w-1/3 h-2/4 md:h-screen"
            style={{ zIndex: 990 }}
          >
            <Card
              title={selectedPlace.data.title}
              position={selectedPlace.data.position}
              source={selectedPlace.content}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const PLACES_PATH = path.join(process.cwd(), "places");
  const placeFilePaths = fs
    .readdirSync(PLACES_PATH)
    .filter((path) => /\.mdx?$/.test(path));

  const places = await Promise.all(
    placeFilePaths.map(async (filePath) => {
      const source = fs.readFileSync(path.join(PLACES_PATH, filePath));
      const { content, data } = matter(source);

      const mdxSource = await serialize(content, {
        scope: data,
      });

      return {
        content: mdxSource,
        data: { ...data, id: filePath },
        filePath,
      };
    })
  );

  return { props: { places } };
};
