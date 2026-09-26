// ============================================================
// Renders the communityMembers array (community-data.js) into cards
// ============================================================

const palette = [
  ["#8c6b4f", "#c68620"], ["#3e5c50", "#6b8f71"], ["#5c4a6b", "#8c6ba6"],
  ["#7a3b32", "#b4532a"], ["#264653", "#2a9d8f"], ["#3c3153", "#6c5b8a"],
  ["#6b4226", "#a6693b"], ["#5a3e36", "#9c7457"],
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("communityGrid");
  if (!grid) return;

  grid.innerHTML = communityMembers.map((m) => {
    const [c1, c2] = m.image ? [null, null] : palette[m.palette % palette.length];
    const bg = m.image
      ? `background-image:url('${m.image}');background-size:cover;background-position:center;`
      : `background:linear-gradient(135deg, ${c1}, ${c2});`;
    return `
      <div class="photo-card">
        <div class="thumb" style="${bg}"></div>
        <div class="info">
          <div class="p-title">${escapeHtml(m.name)}</div>
          <div class="p-meta"><span>${escapeHtml(m.hobby)}</span></div>
          <div class="p-story">${escapeHtml(m.bio)}</div>
          <a href="${m.link}" target="_blank" rel="noopener" class="member-link">${escapeHtml(m.linkLabel || "View work")} →</a>
        </div>
      </div>`;
  }).join("");
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}
