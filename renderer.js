// Handle tab switching
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Example songs for quick picks
const quickPicks = [
  "Tragos Amargos",
  "Volver Volver",
  "El Paso",
  "Rancho Grande",
  "La Bamba",
  "Mi Vida Loca"
];

function loadSets() {
  const sets = [
    ["Achy Breaky Heart", "All My Exes Live in TX", "Amarillo By Morning", "Bandy the Rodeo Clown"],
    ["Because I Love You", "Beer Barrel Polka", "Folsom Prison Blues", "Silver Wings"],
    ["Neon Moon", "The Chair", "El Paso", "Tennessee Waltz"]
  ];

  let html = "";
  sets.forEach((set, i) => {
    html += `<h3>Set ${i + 1}</h3><ul>`;
    set.forEach(song => html += `<li>${song}</li>`);
    html += "</ul>";
  });

  document.getElementById("setDisplay").innerHTML = html;
}

// Load Quick Picks
const quickList = document.getElementById("quickList");
quickPicks.forEach(song => {
  const li = document.createElement("li");
  li.textContent = song;
  quickList.appendChild(li);
});
