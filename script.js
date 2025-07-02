const name = "NINAADKALLA";
const sequenceEl = document.getElementById("sequence");


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

function renderCodons(tokens, highlightIndex = -1) {
  sequenceEl.innerHTML = ""; // Clear previous
  tokens.forEach((text, i) => {
    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("codon");
    if (i === highlightIndex) {
      span.classList.add("active");
    }
    sequenceEl.appendChild(span);

    // Add a space after each token except the last
    if (i < tokens.length - 1) {
      sequenceEl.append(" ");
    }
  });
}



// Animation function
async function animateSequence() {

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
  let aa3 = rna.map(c => codonToAA3[c.replace(/U/g, "T")]);
  for (let i = 0; i < aa3.length; i++) {
    rna[i] = aa3[i];
    renderCodons(rna, i);
    await sleep(100);
  }

  await sleep(500);

  // Step 4: 3-letter AA → 1-letter name AA
  let letters = name.split("");
  letters.splice(6, 0, " ");
  for (let i = 0; i < letters.length; i++) {
    rna[i] = letters[i];
    renderCodons(rna, i);
    await sleep(100);
  }

  await sleep(500);

  // Step 5: 1-letter name AA to lowercase
  const finalName = "Ninaad Kalla";
  const finalLetters = finalName.replace(" ", "").split("");
  let currentLetters = name.split(""); // starts as ["N","I","N",...]
  const spaceIndex = 6; // after 6 letters, add a space

  for (let i = 0; i < finalLetters.length; i++) {
    currentLetters[i] = finalLetters[i];
    const display = [...currentLetters];
    if (spaceIndex > 0) {
      display.splice(spaceIndex, 0, " "); // insert space
    }
    sequenceEl.textContent = display.join(" ");
    await sleep(100);
  }

  await sleep(500);

  // Replace animated line with clean final line
  sequenceEl.parentElement.innerHTML = `<p>Hi, my name is Ninaad Kalla</p>`;

}

animateSequence();
