const fs = require("fs/promises")
const pupp = require("puppeteer")

async function run() {
  const browser = await pupp.launch()
  const page = await browser.newPage()
  await page.goto("https://quotes.toscrape.com/")

  const quotes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".quote .text")).map((x) => x.textContent)
  })

  const authors = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".author")).map((x) => x.textContent)
  })

  for (quote in quotes) {
    var line = quotes[quote] + " by " + authors[quote] + "\r\n"
    await fs.appendFile("quotes.txt", line)
  }

  await browser.close()
}

run()
