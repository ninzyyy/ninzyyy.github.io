const sequenceElement = document.getElementById("sequence");
const toggleButton = document.getElementById("toggle-theme");

// Toggle light/dark mode
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Animation: DNA → RNA → 3-letter → 1-letter
const name = "NINAADKALLA";
const aminoMap = {
  N: "AAC", I: "AUU", A: "GCU", D: "GAU", K: "AAA", L: "UUA"
};
const codonToAA3 = {
  AAC: "Asn", AUU: "Ile", GCU: "Ala", GAU: "Asp", AAA: "Lys", UUA: "Leu"
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateSequence() {
  let output = "";

  output += "🧬 DNA: ";
  for (let char of name) {
    const rna = aminoMap[char];
    const dna = rna.replace(/U/g, "T");
    output += dna + " ";
    sequenceElement.textContent = output;
    await sleep(250);
  }

  output += "\n\n🧪 RNA: ";
  for (let char of name) {
    output += aminoMap[char] + " ";
    sequenceElement.textContent = output;
    await sleep(250);
  }

  output += "\n\n🔬 Codons → 3-letter codes: ";
  for (let char of name) {
    const codon = aminoMap[char];
    output += codonToAA3[codon] + " ";
    sequenceElement.textContent = output;
    await sleep(250);
  }

  output += "\n\n🔡 Final protein (1-letter): ";
  for (let char of name) {
    output += char;
    sequenceElement.textContent = output;
    await sleep(250);
  }
}

animateSequence();
