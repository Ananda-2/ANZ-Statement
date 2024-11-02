const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const data = {
  statementDate: "28 JANUARY 2023 TO 28 FEBRUARY 2023",
  statementNumber: "8",
  customerName: "Ms Michaela Finnegan",
  customerAddress: "12 Wilfrid St , Macquarie Fields NSW 2564",
  openingBalance: "10264.79",
  totalDeposits: "7405.41",
  totalWithdrawals: "3,535.00",
  closingBalance: "14,135.10",
  accountNumber: "468441274",
  bsb: "012-327",
  transactions : [
      {
        "isYear": true,
        "year": "2023",
        "date": "27 MAR",
        "details": "OPENING BALANCE",
        "balance": "10,264.69"
      },
      {
        "date": "28 JAN",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "100.00",
        "balance": "10,364.69"
      },
      {
        "date": "31 JAN",
        "details": "ANZ INTERNET BANKING TRANSFER",
        "description": "WAGES 31032020 CLEANING EDGE SO",
        "deposit": "947.39",
        "balance": "11,312.08"
      },
      {
        "date": "01 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "50.00",
        "balance": "11,362.08"
      },
      {
        "date": "01 FEB",
        "details": "REVERSAL OF ACCOUNT SERVICING FEE",
        "description": "MINIMUM $2000 IN DEPOSITS RECEIVED",
        "deposit": "5.00",
        "balance": "11,367.08"
      },
      {
        "date": "02 FEB",
        "details": "ACCOUNT SERVICING FEE",
        "withdrawal": "5.00",
        "balance": "11,362.08"
      },
      {
        "date": "03 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS",
        "description": "EFFECTIVE DATE 03 FEB 2023",
        "withdrawal": "20.00",
        "balance": "11,382.08"
      },
      {
        "date": "03 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS",
        "description": "EFFECTIVE DATE 03 FEB 2023",
        "withdrawal": "50.00",
        "balance": "11,432.08"
      },
      {
        "date": "04 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "30.00",
        "balance": "11,462.08"
      },
      {
        "date": "04 FEB",
        "details": "TRANSFER FROM NASARUDIN N N",
        "description": "MAKAN RUMAH HUTANG",
        "deposit": "165.50",
        "balance": "11,627.58"
      },
      {
        "date": "05 FEB",
        "details": "ANZ MOBILE BANKING PAYMENT 770177",
        "description": "TO SAPIODIN L H",
        "withdrawal": "50.00",
        "balance": "11,577.58"
      },
      {
        "date": "05 FEB",
        "details": "ANZ MOBILE BANKING PAYMENT 387663",
        "description": "TO SAPIODIN L H",
        "withdrawal": "75.00",
        "balance": "11,502.58"
      },
      {
        "date": "06 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "50.00",
        "balance": "11,552.58"
      },
      {
        "date": "07 FEB",
        "details": "ANZ INTERNET BANKING TRANSFER",
        "description": "WAGES 07042020 CLEANING EDGE SO",
        "deposit": "1,266.66",
        "balance": "12,819.24"
      },
      {
        "date": "08 FEB",
        "details": "ANZ MOBILE BANKING PAYMENT 384025",
        "description": "TO FAUZIAH SAPIODIN",
        "withdrawal": "200.00",
        "balance": "12,619.24"
      },
      {
        "date": "09 FEB",
        "details": "ANZ ATM CARD 9655",
        "withdrawal": "20.00",
        "balance": "12,639.24"
      },
      {
        "date": "09 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "50.00",
        "balance": "12,689.24"
      },
      {
        "date": "10 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "50.00",
        "balance": "12,739.24"
      },
      {
        "date": "11 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS",
        "description": "EFFECTIVE DATE 11 APR 2020",
        "withdrawal": "70.00",
        "balance": "12,809.24"
      },
      {
        "date": "12 FEB",
        "details": "PAYMENT FROM MOHD NOOR AKHERY BIN MOHAME",
        "description": "EFFECTIVE DATE 12 FEB 2023",
        "deposit": "30.00",
        "balance": "12,839.24"
      },
      {
        "date": "12 FEB",
        "details": "ANZ ATM GRIFFITH BRANCH GRIFFITH NS",
        "description": "EFFECTIVE DATE 12 FEB 2023",
        "withdrawal": "500.00",
        "balance": "12,339.24"
      },
      {
        "date": "14 FEB",
        "details": "ANZ ATM GRIFFITH BRANCH GRIFFITH NS",
        "withdrawal": "300.00",
        "balance": "12,039.24"
      },
      {
        "date": "14 FEB",
        "details": "ANZ INTERNET BANKING TRANSFER",
        "description": "WAGES 14042020 CLEANING EDGE SO",
        "deposit": "1,294.09",
        "balance": "13,333.33"
      },
      {
        "date": "15 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "50.00",
        "balance": "13,383.33"
      },
      {
        "date": "16 FEB",
        "details": "ANZ M-BANKING FUNDS TFER",
        "description": "TRANSFER 211328 TO 012125319116005",
        "withdrawal": "500.00",
        "balance": "12,883.33"
      },
      {
        "date": "17 FEB",
        "details": "ACCOUNT SERVICING FEE",
        "description": "MINIMUM $2000 IN DEPOSITS NOT RECEIVED",
        "withdrawal": "5.00",
        "balance": "12,878.33"
      },
      {
        "date": "17 FEB",
        "details": "ANZ MOBILE BANKING PAYMENT 950308",
        "description": "TO NASARUDIN N N",
        "withdrawal": "400.00",
        "balance": "12,478.33"
      },
      {
        "date": "",
        "details": "TOTALS AT END OF PAGE",
        "withdrawal": "$2,035.00",
        "balance": "$4,248.64"
      }
    ],
    transactions2:[
      {
        "date": "21 FEB",
        "details": "ANZ INTERNET BANKING TRANSFER",
        "description": "WAGES 21042020 CLEANING EDGE SO",
        "deposit": "1,132.01",
        "balance": "13,610.34"
      },
      {
        "date": "22 FEB",
        "details": "ANZ M-BANKING FUNDS TFER",
        "description": "TRANSFER 445763 FROM 319116005",
        "deposit": "100.00",
        "balance": "13,710.34"
      },
      {
        "date": "22 FEB",
        "details": "ANZ ATM GRIFFITH BRANCH GRIFFITH NS",
        "withdrawal": "500.00",
        "balance": "13,210.34"
      },
      {
        "date": "23 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "60.00",
        "balance": "13,270.34"
      },
      {
        "date": "23 FEB",
        "details": "ANZ ATM BRANCH GRIFFITH NS 2680",
        "withdrawal": "50.00",
        "balance": "13,320.34"
      },
      {
        "date": "24 FEB",
        "details": "ANZ ATM CARD 9077",
        "withdrawal": "30.00",
        "balance": "13,350.34"
      },
      {
        "date": "25 FEB",
        "details": "ANZ ATM CARD 9655",
        "withdrawal": "20.00",
        "balance": "13,370.34"
      },
      {
        "date": "26 FEB",
        "details": "TRANSFER FROM ATM GRIFFITH",
        "description": "EFFECTIVE DATE 26 FEB 2020",
        "deposit": "100.00",
        "balance": "13,470.34"
      },
      {
        "date": "26 FEB",
        "details": "TRANSFER FROM ATM GRIFFITH",
        "description": "GRIFFITH BRANCH GRIFFITH NS",
        "deposit": "100.00",
        "balance": "13,570.34"
      },
      {
        "date": "28 FEB",
        "details": "ANZ INTERNET BANKING TRANSFER",
        "description": "WAGES 21042020 CLEANING EDGE SO EFFECTIVE 28 FEB 2023",
        "deposit": "1,114.76",
        "balance": "14,685.10"
      },
      {
        "date": "28 FEB",
        "details": "ANZ ATM GRIFFITH BRANCH GRIFFITH NS",
        "description": "EFFECTIVE DATE 28 FEB 2023",
        "withdrawal": "550.00",
        "balance": "14,135.10"
      },
      {
        "date": "",
        "details": "TOTALS AT END OF PAGE",
        "withdrawal": "$1,500.00",
        "balance": "$3,156.77"
      },
      {
        "date": "",
        "details": "TOTALS AT END OF PERIOD",
        "withdrawal": "$3,535.00",
        "deposit": "$7,405.41",
        "balance": "$14,135.10"
      }
    ],
  totalFees: "5.00",
};

const feeSummarydata = {
  accountNumber: "468441274",
  feeSummary: [
    {
      type: "MONTHLY ACCOUNT SERVICE FEE",
      amount: 5.0,
    },
    {
      type: "TOTAL ACCOUNT SERVICE FEES",
      amount: 0.0,
    },
    {
      type: "TOTAL BANK ACCOUNT FEES CHARGED",
      amount: 0.0,
    },
  ],
  transactionFeeSummary: [
    {
      type: "MONTHLY ACCOUNT SERVICE FEE",
      amount: 5.0,
    },
    {
      type: "TOTAL ACCOUNT SERVICE FEES",
      amount: 0.0,
    },
    {
      type: "TOTAL BANK ACCOUNT FEES CHARGED",
      amount: 0.0,
    },
  ],
  note: "Overseas transaction fees, overseas ATM fees and non ANZ ATM operator fees not included",
};

app.get("/", (req, res) => {
  res.render("index", { ...data, feeSummarydata });
});

const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

app.get("/download", async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
    await page.setViewport({ width: 1680, height: 1050 });

    const todayDate = new Date();
    const pdfPath = path.join(publicDir, `${todayDate.getTime()}.pdf`);

    // Generate PDF and save to the specified path
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Disposition", `attachment; filename="invoice.pdf"`);
    res.setHeader("Content-Type", "application/pdf");

    // Send the PDF file as a response to the client
    res.sendFile(pdfPath, (err) => {
      if (err) {
        console.error("Error sending PDF file:", err);
        res.status(500).send("Error sending PDF");
      } else {
        console.log("PDF file sent successfully.");
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (browser) await browser.close();
    res.status(500).send("Error generating PDF");
  }
});

// Route to download the invoice as PDF
// app.get("/d", async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Set URL to the root URL
//     await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });

//     await page.setViewport({ width: 1680, height: 1050 });

//     const todayDate = new Date();

//     // Generate PDF from the loaded page
//     const pdfBuffer = await page.pdf({
//       path: `${path.join(
//         __dirname,
//         "../public",
//         todayDate.getTime() + ".pdf"
//       )}`,
//       format: "A4",
//       printBackground: true,
//     });

//     await browser.close();

//     const pathURL = path.join(
//       __dirname,
//       "../public",
//       todayDate.getTime() + ".pdf"
//     );

//     // Set response headers to download the PDF
//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Length": pdfBuffer.length,
//       // "Content-Disposition": "attachment; filename=invoice.pdf",
//     });

//     // Send the PDF to the client
//     res.sendFile(pathURL);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).send("Error generating PDF");
//   }
// });

// app.get("/download", async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Debugging: Log console messages from the page
//     page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

//     // Go to the root page and wait for full load
//     await page.goto("http://localhost:3000/", {
//       waitUntil: "load",
//       timeout: 0,
//     });

//     // Try to generate PDF
//     let pdfBuffer;
//     try {
//       pdfBuffer = await page.pdf({
//         format: "A4",
//         printBackground: true,
//       });
//     } catch (pdfError) {
//       console.error("Error generating PDF:", pdfError);
//       res.status(500).send("Error generating PDF");
//       await browser.close();
//       return;
//     }

//     await browser.close();

//     // Set headers and send the PDF
//     res.set({
//       "Content-Type": "application/pdf",
//       // "Content-Disposition": "attachment; filename=invoice.pdf",
//     });

//     res.send(pdfBuffer);
//   } catch (error) {
//     console.error("Error in /download route:", error);
//     res.status(500).send("Error generating PDF");
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
