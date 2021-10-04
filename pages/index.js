import Head from "next/head";

export default function Home() {
  return (
    <div className="home flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>LauDB Birthday</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-center text-white text-9xl antialiased font-patrick-hand">
          LauDB Birthday
        </h1>
        <p className="text-center text-white text-2xl pt-5">Coming soon...</p>
      </main>
    </div>
  );
}
