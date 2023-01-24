import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import { writeFileXLSX, utils } from "xlsx";

export default function Sirup() {
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
      let response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/dataruppenyediakldi?idKldi=D170&tahun=" +
          year
      );
      const penyedia = response.data.aaData;
      response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/datarupswakelolakldi?idKldi=D170&tahun=" +
          year
      );
      const swakelola = response.data.aaData;
      response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/dataruppenyediaswakelolaallrekapkldi?idKldi=D170&tahun=" +
          year
      );
      const pdsw = response.data.aaData;
      response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/datatableruprekapkldi?idKldi=D170&tahun=" +
          year
      );
      const rekap = response.data.aaData;

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

      let response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/dataruppenyediakldi?idKldi=D170&tahun=" +
          year
      );
      const penyedia2 = response.data.aaData;
      response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/dataruppenyediaswakelolaallrekapkldi?idKldi=D170&tahun=" +
          year
      );
      const pdsw2 = response.data.aaData;

      response = await axios.get(
        "https://api.codetabs.com/v1/proxy?quest=https://sirup.lkpp.go.id/sirup/datatablectr/datarupswakelolakldi?idKldi=D170&tahun=" +
          year
      );
      const swa2 = response.data.aaData;

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
        <title>UKPBJ Kab. Mojokerto</title>
        <meta name="description" content="Aplikasi PBJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex-col">
          <div>
            <input
              className="mb-1 pl-3 pr-1 py-1 border-2 rounded-md w-56"
              type="number"
              step={1}
              min={2013}
              max={maxDate}
              value={year}
              onChange={(y) => setYear(y.target.value)}
            ></input>
          </div>
          <div>
            <button
              className="mb-1 text-white font-medium p-1 rounded-md border-1 border-sky-600 bg-sky-600 hover:brightness-90 w-56"
              onClick={makeAPICall}
            >
              Unduh Hasil Rekap
            </button>
          </div>
          <div>
            <select
              className="mb-1 pl-2 py-1 border-2 rounded-md w-56"
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
          <div>
            <button
              className="mb-1 text-white font-medium p-1.5 rounded-md border-1 border-sky-600 bg-sky-600 hover:brightness-90 w-56"
              onClick={makeAPICall2}
            >
              Unduh Detail Pemilihan
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
