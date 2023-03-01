export default function Katalog() {
  const axios = require("axios");

  // Request Decalaration
  const queryId = 157;
  const parameters = {
    Tanggal: {
      start: "2023-01-01",
      end: "2023-01-31",
    },
    Jenis_Katalog: ["KATALOG LOKAL"],
    pengelola: ["Pemerintah Daerah Kabupaten Mojokerto"],
    provinsi: ["Jawa Timur"],
    "Tahun Anggaran": ["2023"],
    "Nama Satker Transaksi": ["ALL"],
    klpd: ["Pemerintah Daerah Kabupaten Mojokerto"],
  };
  const bodyRequest = { queryId, parameters };
  const requestHeaders = {
    headers: {
      Authorization: "Key BnXT185EjSxCxNa4YgFPoy7oiA6M4VKtD2sa4W8L",
    },
  };

  // Implementation
  axios
    .post(
      "https://redash-e-katalog.lkpp.go.id/api/queries/157/results",
      bodyRequest,
      requestHeaders
    )
    .then((result) => {
      console.log(result.data.query_result.data.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
  return <></>;
}
