import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";

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
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
            <div className="flex bg-white bg-center">
              <div className="text-black">Selamat Datang!</div>
              <Image
                className="hidden md:block"
                src={"/bupwabup.png"}
                alt="logo"
                width={500}
                height={870}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
