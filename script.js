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
  sequenceEl.innerHTML = "";
  tokens.forEach((token, i) => {
    const span = document.createElement("span");
    span.textContent = token;
    span.classList.add("codon");
    if (i === highlightIndex) {
      span.classList.add("active");
    }
    sequenceEl.appendChild(span);
    if (i < tokens.length - 1) {
      sequenceEl.append(" ");
    }
  });
}


// Animation function
async function animateSequence() {

  // Step 1: DNA codons
  const dna = name.split("").map(getRandomCodon);
  renderCodons(dna);
  await sleep(1000);

  // Step 2: DNA → RNA (codon-level)
  const rna = dna.map(dnaToRna);
  let rnaDisplay = [...dna]; // clone for animating transition
  for (let i = 0; i < rna.length; i++) {
    rnaDisplay[i] = rna[i];
    renderCodons(rnaDisplay, i);
    await sleep(200);
  }

  await sleep(1000);

  // Step 3: RNA → 3-letter amino acids
  const aa3 = rna.map(c => codonToAA3[c.replace(/U/g, "T")]);
  let aa3Display = [...rnaDisplay];
  for (let i = 0; i < aa3.length; i++) {
    aa3Display[i] = aa3[i];
    renderCodons(aa3Display, i);
    await sleep(200);
  }

  await sleep(1000);

  // Step 4: 3-letter → 1-letter amino acid names
  const aa1 = name.split(""); // e.g., ["N","I","N","A",...]
  aa1.splice(6, 0, " "); // Insert space after "NINAAD"
  let aa1Display = [...aa3Display];
  for (let i = 0; i < aa1.length; i++) {
    aa1Display[i] = aa1[i];
    renderCodons(aa1Display, i);
    await sleep(200);
  }

  await sleep(1000);

  // Step 5: Capital → lowercase to form final name
  const finalName = "Ninaad Kalla";
  const finalLetters = finalName.replace(" ", "").split("");
  let finalDisplay = name.split("");
  finalDisplay.splice(6, 0, " "); // Maintain space

  for (let i = 0; i < finalLetters.length; i++) {
    finalDisplay[i] = finalLetters[i];
    const spaced = [
      ...finalDisplay.slice(0, 6),
      " ",
      ...finalDisplay.slice(6)
    ];
    renderCodons(spaced, i < 6 ? i : i + 1); // account for space in highlight
    await sleep(200);
  }

  await sleep(1000);

  // Final collapse to normal line
  const finalLine = document.createElement("p");
  finalLine.textContent = "Hi, my name is Ninaad Kalla";
  finalLine.style.fontFamily = "inherit";
  finalLine.style.marginTop = "1rem";

  sequenceEl.parentElement.replaceWith(finalLine);
}


animateSequence();
