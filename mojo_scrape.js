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
    for (let i = 1; i < rows.length; i++) {
        let columns = Array.from(rows[i].children);
        for (let j = 1; j < columns.length; ++j) {
            if (columns[j].textContent !== " " && columns[j].textContent !== "0") {
                if (j == 2 || j == 3) data += columns[j].textContent.replaceAll(" ", "_") + " ";
                else data += columns[j].textContent + " ";
            }
        }
        data += "\n";
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
