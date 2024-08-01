const express = require("express");
const app = express();

const getFBIData = async () => {
  const response = await fetch("https://api.fbi.gov/wanted/v1/list?page=50");
  const responseJson = await response.json();
  return responseJson;
};

app.get("/fbi/all", (req, res) => {
  const { page } = req.query;
  fetch(`https://api.fbi.gov/wanted/v1/list?page=${page}`)
    .then((response) => response.json())
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Error Loading data",
      });
    });
});

app.get("/fbi/description", (req, res) => {
  const { uid } = req.query;
  console.log(`https://api.fbi.gov/wanted/v1/list?uid=${uid}`);
  fetch(`https://api.fbi.gov/wanted/v1/list?uid=${uid}`)
    .then((response) => response.json())
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "Error Loading data",
      });
    });
});

app.get("/interpol/all", (req, res) => {
  const { page, resultPerPage } = req.query;
  fetch(
    `https://ws-public.interpol.int/notices/v1/red/?page=${page}&resultPerPage=${resultPerPage}`
  )
    .then((response) => response.json())
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        error: "Error Loading data",
      });
    });
});

app.get("/interpol/description", (req, res) => {
  const { noticeId } = req.query;
  fetch(`https://ws-public.interpol.int/notices/v1/red/${noticeId}`)
    .then((response) => response.json())
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: "Error Loading data",
      });
    });
});

app.listen(8010);
