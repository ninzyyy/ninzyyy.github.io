// Toggle light/dark theme
const toggleButton = document.getElementById("mode-toggle");
const html = document.documentElement;

function setTheme(theme) {
  html.dataset.theme = theme;

  const icon = document.getElementById("theme-icon");
  icon.classList.remove("fa-sun", "fa-moon");
  icon.classList.add(theme === "dark" ? "fa-sun" : "fa-moon");
}

(function initializeTheme() {
  const current = html.dataset.theme;
  setTheme(current);
})();

// Toggle on click
toggleButton.onclick = () => {
  const current = html.dataset.theme;
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
};


// Animation
const aminoCodons = {
  N: ["AAT", "AAC"],
  I: ["ATT", "ATC", "ATA"],
  A: ["GCT", "GCC", "GCA", "GCG"],
  D: ["GAT", "GAC"],
  K: ["AAA", "AAG"],
  L: ["TTA", "TTG", "CTT", "CTC", "CTA", "CTG"]
};

const codonToAA3 = {
  AAT: "Asn", AAC: "Asn",
  ATT: "Ile", ATC: "Ile", ATA: "Ile",
  GCT: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala",
  GAT: "Asp", GAC: "Asp",
  AAA: "Lys", AAG: "Lys",
  TTA: "Leu", TTG: "Leu", CTT: "Leu", CTC: "Leu", CTA: "Leu", CTG: "Leu"
};

const name = "Ninaad";


// Format string into triplets with padding or spacing
function formatTripletStep(chars, pad = ' ') {
  return chars.map(ch => pad + ch + pad).join('');
}

const dnaCodons = name.toUpperCase().split('').map(letter => {
  const codons = aminoCodons[letter];
  return codons[Math.floor(Math.random() * codons.length)];
});

const rnaCodons = dnaCodons.map(codon => codon.replace(/T/g, "U"));
const aa3Letters = dnaCodons.map(codon => codonToAA3[codon]);
const aa1Letters = name.toUpperCase().split('');
const nameFormatted = name.split('');

// Build steps with visual alignment
const steps = [
  dnaCodons.join(""),
  rnaCodons.join(""),
  aa3Letters.join(""),
  formatTripletStep(aa1Letters, ' '),
  formatTripletStep(nameFormatted, ' '),
];

const anim = document.getElementById("animation");
const delay = ms => new Promise(res => setTimeout(res, ms));


async function collapseSpacedName(spaced) {
  const letters = spaced.split('').filter(c => c !== ' '); // remove spaces
  let display = spaced;

  for (let i = 0; i < letters.length - 1; i++) {
    // Merge letters up to index i
    const merged = letters.slice(0, i + 1).join('');
    const rest = letters.slice(i + 1).map(ch => ch + '  ').join('');
    display = merged + '   ' + rest;

    anim.textContent = display.trimEnd();
    await delay(150);
  }

  // Capitalize first letter
  const finalName = letters.join('');
  anim.textContent = finalName.charAt(0).toUpperCase() + finalName.slice(1).toLowerCase() + ".";
}


async function animateText() {
  anim.classList.add("animating");
  let current = steps[0].split('');
  anim.textContent = current.join('');

  for (let stepIndex = 1; stepIndex < steps.length; stepIndex++) {
  const next = steps[stepIndex];
  const maxLength = Math.max(current.length, next.length);

  // 👇 Add this line here
  const lastCharIndex = next
    .split('')
    .reduce((last, ch, idx) => (ch !== ' ' ? idx : last), 0);

  for (let i = 0; i < maxLength; i++) {
    if (current[i] !== next[i]) {
      current[i] = next[i] || '';
    }

    const isUnderlined = stepIndex < steps.length;

    anim.innerHTML = current
      .map((ch, j) => {
        const charDisplay =
          isUnderlined && j === i && i <= lastCharIndex
            ? `<u>${ch}</u>` : ch;

        const spacer = (isUnderlined && next.includes('   '))
          ? ''
          : ((j + 1) % 3 === 0 ? ' ' : '');

        return charDisplay + spacer;
      })
      .join('');

      await delay(100);
    }

    await delay(500);
  }


  await collapseSpacedName(steps[steps.length - 1]);
  anim.classList.remove("animating");
  anim.style.color = "var(--color-text-secondary)";

}

animateText();