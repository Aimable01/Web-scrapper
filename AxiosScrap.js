const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://news.sky.com";

try {
  axios(url)
    .then((response) => {
      const data = response.data;
      $ = cheerio.load(data);
      const article = [];

      $(".ui-story-headline", data).each(function () {
        const title = $(this).text();
        const someurl = $(this).find("a").attr("href");
        article.push({ title, someurl });
      });
      console.log(article);
    })
    .catch((err) => {
      console.log(err);
    });
} catch (error) {
  console.log(`Error before scope: ${error}`);
}

app.listen(4000, () => console.log("App running on port 4000"));
