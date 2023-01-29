import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { writeFileXLSX, utils } from "xlsx";
import Image from "next/image";
import fsPromises from "fs/promises";
import path from "path";

export default function Test(props) {
  const dtRekap = props.recap;
  const dtPenyedia = props.provider;
  const dtSwakelola = props.selfMan;
  const dtPdsw = props.provSelf;
  let y = new Date();
  let yearNow = y.getFullYear();
  let maxDate = yearNow + 2;
  let [year, setYear] = useState(yearNow);
  let [mtd, setMtd] = useState("default");
  let mapObj = {
    January: "Januari",
    February: "Februari",
    March: "Maret",
    April: "April",
    May: "Mei",
    June: "Juni",
    July: "Juli",
    August: "Agustus",
    September: "September",
    October: "Oktober",
    November: "November",
    December: "Desember",
  };

  const makeAPICall = async () => {
    try {
      const penyedia = dtPenyedia.aaData;
      const swakelola = dtSwakelola.aaData;
      const pdsw = dtPdsw.aaData;
      const rekap = dtRekap.aaData;

      let countDik = {};
      let countEpc = {};
      let countPdl = {};
      let countPnl = {};
      let countSlk = {};
      let countTdr = {};
      let countTdc = {};
      let countSwakelola = {};
      let countTotal = {};

      let countDikTotal = {};
      let countEpcTotal = {};
      let countPdlTotal = {};
      let countPnlTotal = {};
      let countSlkTotal = {};
      let countTdrTotal = {};
      let countTdcTotal = {};
      let countSwakelolaTotal = {};
      let countTotalTotal = {};

      penyedia.forEach((pen) => {
        if (
          !countDik[pen[1]] ||
          !countEpc[pen[1]] ||
          !countPdl[pen[1]] ||
          !countPnl[pen[1]] ||
          !countSlk[pen[1]] ||
          !countTdr[pen[1]] ||
          !countTdc[pen[1]]
        ) {
          countDik[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countEpc[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countPdl[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countPnl[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countSlk[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countTdr[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countTdc[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
        }

        if (pen[4] === "Dikecualikan") {
          countDik[pen[1]].pagu += parseInt(pen[3], 0);
          countDik[pen[1]].paket++;
        }
        if (pen[4] === "e-Purchasing") {
          countEpc[pen[1]].pagu += parseInt(pen[3], 0);
          countEpc[pen[1]].paket++;
        }
        if (pen[4] === "Pengadaan Langsung") {
          countPdl[pen[1]].pagu += parseInt(pen[3], 0);
          countPdl[pen[1]].paket++;
        }
        if (pen[4] === "Penunjukan Langsung") {
          countPnl[pen[1]].pagu += parseInt(pen[3], 0);
          countPnl[pen[1]].paket++;
        }
        if (pen[4] === "Seleksi") {
          countSlk[pen[1]].pagu += parseInt(pen[3], 0);
          countSlk[pen[1]].paket++;
        }
        if (pen[4] === "Tender") {
          countTdr[pen[1]].pagu += parseInt(pen[3], 0);
          countTdr[pen[1]].paket++;
        }
        if (pen[4] === "Tender Cepat") {
          countTdc[pen[1]].pagu += parseInt(pen[3], 0);
          countTdc[pen[1]].paket++;
        }
      });

      pdsw.forEach((pen) => {
        if (
          !countDik[pen[1]] ||
          !countEpc[pen[1]] ||
          !countPdl[pen[1]] ||
          !countPnl[pen[1]] ||
          !countSlk[pen[1]] ||
          !countTdr[pen[1]] ||
          !countTdc[pen[1]]
        ) {
          countDik[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countEpc[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countPdl[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countPnl[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countSlk[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countTdr[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
          countTdc[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
        }

        if (pen[5] === "Dikecualikan") {
          countDik[pen[1]].pagu += parseInt(pen[3], 0);
          countDik[pen[1]].paket++;
        }
        if (pen[5] === "e-Purchasing") {
          countEpc[pen[1]].pagu += parseInt(pen[3], 0);
          countEpc[pen[1]].paket++;
        }
        if (pen[5] === "Pengadaan Langsung") {
          countPdl[pen[1]].pagu += parseInt(pen[3], 0);
          countPdl[pen[1]].paket++;
        }
        if (pen[5] === "Penunjukan Langsung") {
          countPnl[pen[1]].pagu += parseInt(pen[3], 0);
          countPnl[pen[1]].paket++;
        }
        if (pen[5] === "Seleksi") {
          countSlk[pen[1]].pagu += parseInt(pen[3], 0);
          countSlk[pen[1]].paket++;
        }
        if (pen[5] === "Tender") {
          countTdr[pen[1]].pagu += parseInt(pen[3], 0);
          countTdr[pen[1]].paket++;
        }
        if (pen[5] === "Tender Cepat") {
          countTdc[pen[1]].pagu += parseInt(pen[3], 0);
          countTdc[pen[1]].paket++;
        }
      });

      swakelola.forEach((pen) => {
        if (!countSwakelola[pen[1]]) {
          countSwakelola[pen[1]] = {
            paket: 0,
            pagu: 0,
          };
        }
        countSwakelola[pen[1]].pagu += parseInt(pen[3], 0);
        countSwakelola[pen[1]].paket++;
      });

      const rekapKeys = rekap.map((rek) => rek[1]);

      rekapKeys.forEach((key) => {
        countTotal[key] = {
          paket:
            (countDik[key] ? countDik[key].paket : 0) +
            (countEpc[key] ? countEpc[key].paket : 0) +
            (countPdl[key] ? countPdl[key].paket : 0) +
            (countPnl[key] ? countPnl[key].paket : 0) +
            (countSlk[key] ? countSlk[key].paket : 0) +
            (countTdr[key] ? countTdr[key].paket : 0) +
            (countTdc[key] ? countTdc[key].paket : 0) +
            (countSwakelola[key] ? countSwakelola[key].paket : 0),
          pagu:
            (countDik[key] ? countDik[key].pagu : 0) +
            (countEpc[key] ? countEpc[key].pagu : 0) +
            (countPdl[key] ? countPdl[key].pagu : 0) +
            (countPnl[key] ? countPnl[key].pagu : 0) +
            (countSlk[key] ? countSlk[key].pagu : 0) +
            (countTdr[key] ? countTdr[key].pagu : 0) +
            (countTdc[key] ? countTdc[key].pagu : 0) +
            (countSwakelola[key] ? countSwakelola[key].pagu : 0),
        };
      });

      let csv = [
        [
          "No.",
          "Satuan Kerja",
          "Paket Pengadaan Langsung",
          "Nilai Pengadaan Langsung",
          "Paket E-Purchasing",
          "Nilai E-Purchasing",
          "Paket Seleksi",
          "Nilai Seleksi",
          "Paket Tender",
          "Nilai Tender",
          "Paket Tender Cepat",
          "Nilai Tender Cepat",
          "Paket Dikecualikan",
          "Nilai Dikecualikan",
          "Paket Penunjukan Langsung",
          "Nlai Penunjukan Langsung",
          "Swakelola",
          "Terumumkan",
        ],
      ];

      let detailRekap = [];

      rekapKeys.forEach((key) => {
        detailRekap.push([
          key,
          countPdl[key] ? countPdl[key].paket : 0,
          countPdl[key] ? countPdl[key].pagu : 0,
          countEpc[key] ? countEpc[key].paket : 0,
          countEpc[key] ? countEpc[key].pagu : 0,
          countSlk[key] ? countSlk[key].paket : 0,
          countSlk[key] ? countSlk[key].pagu : 0,
          countTdr[key] ? countTdr[key].paket : 0,
          countTdr[key] ? countTdr[key].pagu : 0,
          countTdc[key] ? countTdc[key].paket : 0,
          countTdc[key] ? countTdc[key].pagu : 0,
          countDik[key] ? countDik[key].paket : 0,
          countDik[key] ? countDik[key].pagu : 0,
          countPnl[key] ? countPnl[key].paket : 0,
          countPnl[key] ? countPnl[key].pagu : 0,
          countSwakelola[key] ? countSwakelola[key].pagu : 0,
          countTotal[key] ? countTotal[key].pagu : 0,
        ]);
      });

      let hashMap = {};
      detailRekap.forEach(function (arr) {
        hashMap[arr.join("|")] = arr;
      });
      let filter = Object.keys(hashMap).map(function (k) {
        return hashMap[k];
      });

      const total = filter;

      let i = 1;
      filter.forEach(myFunction);
      function myFunction(item) {
        item.unshift(i);
        i++;
      }

      countPdlTotal = {
        paket: 0,
        pagu: 0,
      };
      countEpcTotal = {
        paket: 0,
        pagu: 0,
      };
      countSlkTotal = {
        paket: 0,
        pagu: 0,
      };
      countTdrTotal = {
        paket: 0,
        pagu: 0,
      };
      countTdcTotal = {
        paket: 0,
        pagu: 0,
      };
      countDikTotal = {
        paket: 0,
        pagu: 0,
      };
      countPnlTotal = {
        paket: 0,
        pagu: 0,
      };
      countSwakelolaTotal = {
        pagu: 0,
      };
      countTotalTotal = {
        pagu: 0,
      };

      total.slice(1).forEach((pin) => {
        countPdlTotal.paket += pin[2];
        countPdlTotal.pagu += pin[3];
        countEpcTotal.paket += pin[4];
        countEpcTotal.pagu += pin[5];
        countSlkTotal.paket += pin[6];
        countSlkTotal.pagu += pin[7];
        countTdrTotal.paket += pin[8];
        countTdrTotal.pagu += pin[9];
        countTdcTotal.paket += pin[10];
        countTdcTotal.pagu += pin[11];
        countDikTotal.paket += pin[12];
        countDikTotal.pagu += pin[13];
        countPnlTotal.paket += pin[14];
        countPnlTotal.pagu += pin[15];
        countSwakelolaTotal.pagu += pin[16];
        countTotalTotal.pagu += pin[17];
      });

      filter.push([
        "",
        "TOTAL",
        countPdlTotal.paket,
        countPdlTotal.pagu,
        countEpcTotal.paket,
        countEpcTotal.pagu,
        countSlkTotal.paket,
        countSlkTotal.pagu,
        countTdrTotal.paket,
        countTdrTotal.pagu,
        countTdcTotal.paket,
        countTdcTotal.pagu,
        countDikTotal.paket,
        countDikTotal.pagu,
        countPnlTotal.paket,
        countPnlTotal.pagu,
        countSwakelolaTotal.pagu,
        countTotalTotal.pagu,
      ]);

      const hasil = csv.concat(filter);

      var wb = utils.book_new(),
        ws = utils.aoa_to_sheet(hasil);
      utils.book_append_sheet(wb, ws, "MySheet1");
      writeFileXLSX(wb, "Rekap.xlsx");
    } catch (e) {
      console.log(e);
    }
  };

  const makeAPICall2 = async () => {
    try {
      if (mtd === "default") {
        return;
      }

      const penyedia2 = dtPenyedia.aaData;
      const swakelola2 = dtSwakelola.aaData;
      const pdsw2 = dtPdsw.aaData;

      let tmpTP = [];
      let tmpTPds = [];
      let tmpSwa = [];

      if (mtd === "slk") {
        let tenderPenyedia = [];
        let tenderPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "Seleksi") {
            tenderPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = tenderPenyedia.sort();

        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "Seleksi") {
            tenderPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = tenderPds.sort();
      }

      if (mtd === "tdr") {
        let tenderPenyedia = [];
        let tenderPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "Tender") {
            tenderPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = tenderPenyedia.sort();

        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "Tender") {
            tenderPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = tenderPds.sort();
      }

      if (mtd === "tdc") {
        let tenderPenyedia = [];
        let tenderPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "Tender Cepat") {
            tenderPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = tenderPenyedia.sort();

        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "Tender Cepat") {
            tenderPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = tenderPds.sort();
      }

      if (mtd === "pgl") {
        let pglPenyedia = [];
        let pglPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "Pengadaan Langsung") {
            pglPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = pglPenyedia.sort();
        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "Pengadaan Langsung") {
            pglPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = pglPds.sort();
      }

      if (mtd === "ep") {
        let epPenyedia = [];
        let epPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "e-Purchasing") {
            epPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = epPenyedia.sort();
        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "e-Purchasing") {
            epPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = epPds.sort();
      }

      if (mtd === "dk") {
        let dkPenyedia = [];
        let dkPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "Dikecualikan") {
            dkPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = dkPenyedia.sort();
        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "Dikecualikan") {
            dkPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = dkPds.sort();
      }

      if (mtd === "pnl") {
        let pnlPenyedia = [];
        let pnlPds = [];

        penyedia2.forEach((pen) => {
          let edit = pen[7].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[4] === "Penunjukan Langsung") {
            pnlPenyedia.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[5],
              pen[6],
              edit,
            ]);
          }
        });
        tmpTP = pnlPenyedia.sort();
        pdsw2.forEach((pen) => {
          let edit = pen[4].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[5] === "Penunjukan Langsung") {
            pnlPds.push([
              pen[1],
              pen[2],
              parseInt(pen[3], 0),
              pen[6],
              pen[9],
              edit,
            ]);
          }
        });
        tmpTPds = pnlPds.sort();
      }

      if (mtd === "swa") {
        let swaDetail = [];
        let edit2 = "";

        swa2.forEach((pen) => {
          let edit = pen[6].replace(
            /January|February|March|April|May|June|July|August|September|October|November|December/,
            function (matched) {
              return mapObj[matched];
            }
          );
          if (pen[7].charAt(pen[7].length - 1) === ",") {
            edit2 = pen[7].slice(0, -1);
          } else {
            edit2 = pen[7];
          }
          swaDetail.push([
            pen[1],
            edit2,
            pen[2],
            parseInt(pen[3], 0),
            pen[4],
            pen[5],
            edit,
          ]);
        });
        tmpSwa = swaDetail.sort();
      }

      let tmpJoin = [];
      let header = [];

      if (tmpTP.length === 0 || tmpTPds === 0) {
        tmpJoin = tmpSwa.sort();
        header = [
          [
            "No.",
            "Satuan Kerja",
            "Kegiatan",
            "Paket",
            "Pagu",
            "Sumber Dana",
            "Kode RUP",
            "Waktu Pemilihan",
          ],
        ];
      } else {
        let kolek = tmpTP.concat(tmpTPds);
        tmpJoin = kolek.sort();
        header = [
          [
            "No.",
            "Satuan Kerja",
            "Paket",
            "Pagu",
            "Sumber Dana",
            "Kode RUP",
            "Waktu Pemilihan",
          ],
        ];
      }

      let i = 1;
      tmpJoin.forEach(myFunction);
      function myFunction(item) {
        item.unshift(i);
        i++;
      }

      let gabung = header.concat(tmpJoin);

      var wb = utils.book_new(),
        ws = utils.aoa_to_sheet(gabung);
      utils.book_append_sheet(wb, ws, "MySheet1");
      writeFileXLSX(wb, "Detail.xlsx");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Head>
        <title>UKPBJ Kab. Mojokerto - SIRUP</title>
        <meta name="description" content="Aplikasi PBJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          <div className="absolute inset-0 items-center justify-center bg-white bg-center"></div>
          <div className="min-w-sm relative mx-auto w-full max-w-2xl items-center justify-center bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="mr-10 hidden pr-7 md:block">
                  <Image
                    src={"/bupwabup.png"}
                    alt="logo"
                    width={500}
                    height={870}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="p-1">
                    <div className="text-center text-xl font-semibold">
                      Rekap Data SIRUP
                    </div>
                    <div className="text-center text-xl font-semibold">
                      Kab. Mojokerto
                    </div>
                  </div>
                  <div className="p-1">
                    <input
                      className="mb-1 w-56 rounded-md border-2 py-1 pl-3 pr-1"
                      type="number"
                      step={1}
                      min={2013}
                      max={maxDate}
                      value={year}
                      onChange={(y) => setYear(y.target.value)}
                    ></input>
                  </div>
                  <div className="p-1">
                    <button
                      className="border-1 mb-1 w-56 rounded-md border-sky-600 bg-sky-600 p-1 font-medium text-white hover:brightness-90"
                      onClick={makeAPICall}
                    >
                      Unduh Hasil Rekap
                    </button>
                  </div>
                  <div className="p-1">
                    <select
                      className="mb-1 w-56 rounded-md border-2 py-1 pl-2"
                      onChange={(m) => setMtd(m.target.value)}
                    >
                      <option value={mtd}>Pilih Metode Pemilihan</option>
                      <option value="pgl">Pengadaan Langsung</option>
                      <option value="ep">E-Purchasing</option>
                      <option value="slk">Seleksi</option>
                      <option value="tdr">Tender</option>
                      <option value="tdc">Tender Cepat</option>
                      <option value="dk">Dikecualikan</option>
                      <option value="pnl">Penunjukan Langsung</option>
                      <option value="swa">Swakelola</option>
                    </select>
                  </div>
                  <div className="p-1">
                    <button
                      className="border-1 mb-1 w-56 rounded-md border-sky-600 bg-sky-600 p-1.5 font-medium text-white hover:brightness-90"
                      onClick={makeAPICall2}
                    >
                      Unduh Detail Pemilihan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const filePath1 = path.join(process.cwd(), "recap.json");
  const filePath2 = path.join(process.cwd(), "provider.json");
  const filePath3 = path.join(process.cwd(), "selfMan.json");
  const filePath4 = path.join(process.cwd(), "provSelf.json");
  const jsonData1 = await fsPromises.readFile(filePath1);
  const jsonData2 = await fsPromises.readFile(filePath2);
  const jsonData3 = await fsPromises.readFile(filePath3);
  const jsonData4 = await fsPromises.readFile(filePath4);
  const recap = JSON.parse(jsonData1);
  const provider = JSON.parse(jsonData2);
  const selfMan = JSON.parse(jsonData3);
  const provSelf = JSON.parse(jsonData4);
  return { props: { recap, provider, selfMan, provSelf } };
}
