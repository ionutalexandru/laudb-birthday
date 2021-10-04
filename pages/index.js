import Head from "next/head";
import Link from "next/link";

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
        <div className="py-4">
          <Link href="/map">
            <a className="relative inline-block px-4 py-2 font-medium group text-3xl">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-2 translate-y-2 bg-yellow-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-yellow-400 group-hover:bg-yellow-400"></span>
              <span className="relative text-yellow-400 group-hover:text-white">
                Let the party begin
              </span>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
