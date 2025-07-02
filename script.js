const name = "NINAADKALLA";

// List of 1-letter amino acid name to codons
const aminoCodons = {
  N:["AAT", "AAC"],
  I:["ATT", "ATC", "ATA"],
  A:["GCT", "GCC", "GCA", "GCG"],
  D:["GAT", "GAC"],
  K:["AAA", "AAG"],
  L:["TTA", "TTG", "CTT", "CTC", "CTA", "CTG"]
}

// List of codons to 3-letter amino acid name
const codonToAA3 = {
  AAT: "Asn", AAC: "Asn",
  ATT: "Ile", ATC: "Ile", ATA: "Ile",
  GCT: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala",
  GAT: "Asp", GAC: "Asp",
  AAA: "Lys", AAG: "Lys",
  TTA: "Leu", TTG: "Leu", CTT: "Leu", CTC: "Leu", CTA: "Leu", CTG: "Leu"
};


// Function to randomly pick a codon for a given letter
function getRandomCodon(aminoLetter) {
  const options = aminoCodons[aminoLetter];
  return options[Math.floor(Math.random() * options.length)];
}

// Function to convert DNA to RNA (T -> U)
function dnaToRna(codon) {
  return codon.replace(/T/g, "U");
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function renderCodons(codons, highlightIndex = -1) {
  sequenceEl.innerHTML = ""; // Clear existing
  codons.forEach((codon, i) => {
    const span = document.createElement("span");
    span.textContent = codon;
    span.classList.add("codon");
    if (i === highlightIndex) {
      span.classList.add("highlight");
    }
    sequenceEl.appendChild(span);
  });
}


// Animation function
async function animateSequence() {

  const sequenceEl = document.getElementById("sequence");

  // Step 1: Show DNA
  let dna = name.split("").map(getRandomCodon);
  renderCodons(dna);
  await sleep(500)

  // Step 2: DNA → RNA
  let rna = dna.map(dnaToRna);
  for (let i = 0; i < rna.length; i++) {
    dna[i] = rna[i];
    renderCodons(dna, i);
    await sleep(100);
  }

  await sleep(500);

  // Step 3: RNA → 3-letter AA
  const aa3 = rna.map(c => codonToAA3[c.replace(/U/g, "T")]);
  for (let i = 0; i < aa3.length; i++) {
    rna[i] = aa3[i];
    renderCodons(rna, i);
    await sleep(100);
  }

  await sleep(500);

  // Step 4: 3-letter AA → 1-letter name AA
  const letters = name.split("");
  for (let i = 0; i < letters.length; i++) {
    rna[i] = letters[i];
    renderCodons(rna, i);
    await sleep(100);
  }
}

animateSequence();
