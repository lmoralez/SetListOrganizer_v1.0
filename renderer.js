const XLSX = require("xlsx");
const { dialog } = require("@electron/remote");
const fs = require("fs");

document.getElementById("loadExcel").addEventListener("click", async () => {
  const result = await dialog.showOpenDialog({ 
    properties: ["openFile"], 
    filters: [{ name: "Excel Files", extensions: ["xlsx", "xls"] }] 
  });
  if (result.canceled) return;

  const filePath = result.filePaths[0];
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  window.songData = data;
  displaySongs(data);
});

function displaySongs(data) {
  const output = document.getElementById("output");
  output.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Song Title</th>
          <th>Key</th>
          <th>Pattern</th>
          <th>BPM</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr>
            <td>${row["Song Title"] || ""}</td>
            <td>${row["Key"] || ""}</td>
            <td>${row["Pattern"] || ""}</td>
            <td>${row["BPM"] || ""}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

document.getElementById("createSets").addEventListener("click", () => {
  if (!window.songData) return alert("Please load your Excel file first.");
  const sets = [[], [], []];
  window.songData.forEach((song, i) => sets[i % 3].push(song));

  let html = "";
  sets.forEach((set, i) => {
    html += `<h2 class="text-red-400 mt-4">Set ${i + 1}</h2><ul>`;
    set.forEach(s => html += `<li>${s["Song Title"]}</li>`);
    html += "</ul>";
  });
  document.getElementById("output").innerHTML = html;
});
