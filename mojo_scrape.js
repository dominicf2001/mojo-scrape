// FIRST: COPY AND PASTE ALL THE CODE BELOW

function downloadFile(filename, content) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function extractTableData() {
  let data = "";
  let rows = document.querySelectorAll('tr');

  for (let j = 0; j < rows.length; j++) {
    let r = rows[j];

    if (j !== 0) {
      Array.from(r.children).forEach((c) => {
        if (c.textContent !== " " && c.textContent !== "0") {
          data += c.textContent + " ";
        }
      });
      data += "\n";
    }
  }
  return data;
}

function removeDuplicateLines(data) {
  const lines = data.split('\n');
  const uniqueLines = Array.from(new Set(lines));
  return uniqueLines.join('\n');
}

async function extractPageData(times) {
  let fullData = "";
  for (let i = 0; i < times; i++) {
    const tableData = await extractTableData();
    const uniqueTableData = removeDuplicateLines(tableData);
    fullData += uniqueTableData;
    fullData += "\n";
    document.querySelector('.Table_pageArrowButton__X29ps+.Table_pageArrowButton__X29ps').click();
    await sleep(750);
  }
  return fullData;
}

async function saveAllData(timesToRun) {
  const fullData = await extractPageData(timesToRun);
  const fileName = "output_full_data.txt";
  downloadFile(fileName, fullData);
}

// FIRST: COPY AND PASTE ALL THE CODE ABOVE, HIT ENTER

// SECOND: COPY AND PASTE THIS WITH THE NUMBER OF PAGES IN THE PARENTHESIS
//         REPLACE THE 100 WITH DESIRED NUMBER
//         HIT ENTER

saveAllData(100);
