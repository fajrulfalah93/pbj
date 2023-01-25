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
            <div className="flex justify-between bg-white bg-center">
              <div className="ml-10">
                <div className="text-4xl font-semibold text-black">
                  Selamat Datang!
                </div>
                <div className="align-middle text-4xl font-semibold text-black">
                  di Aplikasi SiBAJA Kab. Mojokerto
                </div>
                <div className="align-middle text-2xl text-black">
                Sistem Informasi Pengadaan Barang dan Jasa
                </div>
              </div>
              <div>
                <Image
                  className="mr-10 hidden md:block"
                  src={"/bupwabup.png"}
                  alt="logo"
                  width={500}
                  height={870}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
