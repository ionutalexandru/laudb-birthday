import Head from "next/head";
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import Modal from "../components/Modal";

import * as React from "react";

function List({ locations, onClickMarker }) {
  return (
    <div className="w-full h-full bg-white p-4">
      <h1 className="text-left text-black text-2xl font-semibold mb-3">
        La lista de sitios
      </h1>
      <ol className="list-decimal">
        {locations.map((location) => (
          <li
            key={`li-${location.data.id}`}
            className="flex flex-row justify-between py-4"
          >
            <div className="text-xl text-black antialiased">
              {location.data.title}
            </div>
            <button
              onClick={() => onClickMarker(location.data.id)}
              className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
            >
              Descubre más detalles
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Map({ places }) {
  const [activeMarker, setActiveMarker] = React.useState(null);
  const [showMap, setShowMap] = React.useState(true);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const unselectMarker = () => {
    setModalIsOpen(false);
    setActiveMarker(null);
  };

  const onClickMarker = (id) => {
    if (!activeMarker || activeMarker !== id) {
      setActiveMarker(id);
      setModalIsOpen(true);
    } else {
      setActiveMarker(null);
      setModalIsOpen(false);
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

      <main className="relative flex flex-col items-center justify-center w-full h-full flex-1 text-center">
        {showMap ? (
          <div id="map" className="w-full h-full">
            <MapComponent
              locations={locations}
              onClickMarker={onClickMarker}
              selectedPlace={selectedPlace}
            />
          </div>
        ) : (
          <List locations={places} onClickMarker={onClickMarker} />
        )}
        <button
          className="absolute top-2 right-2 bg-white p-3 border-black shadow-xl"
          onClick={() => setShowMap((curr) => !curr)}
        >
          Show {showMap ? "list" : "map"}
        </button>
      </main>
      {!selectedPlace ? null : (
        <Modal
          isOpen={modalIsOpen}
          onClose={unselectMarker}
          title={selectedPlace.data.title}
          content={selectedPlace.content}
          position={selectedPlace.data.position}
          imageSrc={selectedPlace.data.image}
        />
      )}
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
