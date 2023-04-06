import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Sirup() {
  return (
    <>
      <Head>
        <title>UKPBJ Kab. Mojokerto - Login</title>
        <meta name="description" content="Aplikasi PBJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          <div className="absolute inset-0 bg-white bg-center"></div>
          <div className="relative mx-auto w-full max-w-sm bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">LOGIN</h1>
                <p className="mt-2 text-gray-500">
                  Login untuk mengakses akun Anda
                </p>
              </div>
              <div className="mt-5">
                <form action="">
                  <div className="relative mt-6">
                    <input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="username"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Username
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Password
                    </label>
                  </div>
                  <div className="my-6">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-brick-500 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
