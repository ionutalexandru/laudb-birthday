import Head from "next/head";
import dynamic from "next/dynamic";

export default function Map() {
  const MapComponent = dynamic(() => import("../components/map"), {
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
          <MapComponent />
        </div>
      </main>
    </div>
  );
}
