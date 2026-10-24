// [pregunta, opciones, índice de la correcta]
const Q = [
  ["¿Qué lenguaje da comportamiento a una página?", ["HTML","CSS","JavaScript"], 2],
  ["¿Qué símbolo usa jQuery?", ["$","#","@"], 0],
  ["JSON usa pares clave-valor.", ["Verdadero","Falso"], 0],
  ["¿Qué es un TLD?", ["La terminación del dominio (.com)","Un tipo de hosting","Un lenguaje"], 0],
  ["¿Qué hace Vercel?", ["Edita imágenes","Publica sitios desde GitHub","Crea logos"], 1],
  ["jQuery es una librería de JavaScript.", ["Verdadero","Falso"], 0],
  ["¿Cuál convierte un objeto a texto JSON?", ["JSON.parse","JSON.stringify","JSON.text"], 1],
  ["¿Qué es la propagación DNS?", ["Actualización de registros en todo el mundo","Un efecto de jQuery","Un tipo de VPS"], 0]
];

const f = document.getElementById("q");
Q.forEach((q, i) => {
  f.innerHTML += `<div class="card p-3 mb-3"><b>${i+1}. ${q[0]}</b>` +
    q[1].map((o, j) => `<label class="opt d-block"><input type="radio" name="p${i}" value="${j}"> ${o}</label>`).join("") + `</div>`;
});

document.getElementById("ok").onclick = () => {
  let s = 0;
  Q.forEach((q, i) => {
    const opts = f.querySelectorAll(".card")[i].querySelectorAll(".opt");
    opts.forEach((l, j) => {
      l.classList.remove("ok", "bad");
      const v = l.querySelector("input");
      if (j == q[2]) l.classList.add("ok");
      else if (v.checked) l.classList.add("bad");
      if (v.checked && j == q[2]) s++;
    });
  });
  document.getElementById("r").textContent = `Resultado: ${s}/${Q.length}`;
};