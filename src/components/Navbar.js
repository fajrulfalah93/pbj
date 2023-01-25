import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-brick-500">
      <div className="flex flex-col lg:flex-row">
        <div className="flex items-center justify-between px-4 py-4 lg:py-0 border-b border-brick-400 lg:border-b-0">
          <div>
            <Link
              href="/"
              className="flex items-center px-4 py-2 font-semibold text-brick-200 hover:text-white w-72"
            >
              <Image src={"/logo.png"} alt="logo" width={60} height={30} />
              <text className="pl-2">UKPBJ Kab. Mojokerto</text>
            </Link>
          </div>
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white block lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  className={!isOpen ? "block" : "hidden"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                <path
                  className={isOpen ? "block" : "hidden"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row justify-end w-full py-4 lg:py-0`}
        >
          <div className="flex flex-col lg:flex-row">
            <Link
              href="/sirup"
              className="block px-4 py-2 lg:py-4 font-semibold text-brick-200 hover:text-white"
            >
              SIRUP
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 lg:py-4 font-semibold text-brick-200 hover:text-white"
            >
              Buku Tamu
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 lg:py-4 font-semibold text-brick-200 hover:text-white"
            >
              Portal Lain
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 lg:py-4 font-semibold text-brick-200 hover:text-white"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
