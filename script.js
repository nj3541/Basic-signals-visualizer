const typeSel = document.getElementById("signalType");
const ampInp = document.getElementById("amp");
const omegaInp = document.getElementById("omega");
const alphaInp = document.getElementById("alpha");
const tminInp = document.getElementById("tmin");
const tmaxInp = document.getElementById("tmax");
const plotArea = document.getElementById("plotArea");

document.getElementById("plotBtn").addEventListener("click", () => {
  const type = typeSel.value;
  const A = parseFloat(ampInp.value) || 0;
  const w = parseFloat(omegaInp.value) || 0;
  const a = parseFloat(alphaInp.value) || 0;
  const tmin = parseFloat(tminInp.value) || -5;
  const tmax = parseFloat(tmaxInp.value) || 5;

  const N = 60;
  const dt = (tmax - tmin) / (N - 1);
  const points = [];

  for (let k = 0; k < N; k++) {
    const t = tmin + k * dt;
    let y = 0;

    if (type === "step") {
      y = t >= 0 ? A : 0;
    } else if (type === "ramp") {
      y = t >= 0 ? A * t : 0;
    } else if (type === "sine") {
      y = A * Math.sin(w * t);
    } else if (type === "expdecay") {
      y = t >= 0 ? A * Math.exp(-a * t) : 0;
    }

    points.push({ t, y });
  }

  const ys = points.map((p) => p.y);
  const maxAbs = Math.max(0.001, ...ys.map((v) => Math.abs(v)));

  const rows = [];
  rows.push(" t       | signal(t)");
  rows.push("---------+-----------------------------------------");

  points.forEach((p) => {
    const barLen = Math.round((Math.abs(p.y) / maxAbs) * 20);
    const bar = "#".repeat(barLen);
    rows.push(
      `${p.t.toFixed(2).padStart(7)} | ${p.y >= 0 ? " " : "-"}${bar}`
    );
  });

  plotArea.textContent = rows.join("\n");
});
