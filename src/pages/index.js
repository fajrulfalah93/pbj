import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>UKPBJ Kab. Mojokerto - Beranda</title>
        <meta name="description" content="Aplikasi PBJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div>
          <h1>Selamat Datang!</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
