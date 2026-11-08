document.documentElement.classList.add("js");

const form = document.querySelector("#roast-quiz");
const result = document.querySelector("#quiz-result");
const progress = document.querySelector(".quiz__bar");
const progressLabel = document.querySelector("#quiz-progress-label");
const status = document.querySelector("#quiz-status");
const errorMessage = document.querySelector("#quiz-error");
const nextButton = document.querySelector("[data-quiz-next]");
const backButton = document.querySelector("[data-quiz-back]");
const restartButton = document.querySelector("[data-quiz-restart]");
const resultTitle = document.querySelector("#quiz-result-title");
const resultMeta = document.querySelector("#quiz-result-meta");
const resultNotes = document.querySelector("#quiz-result-notes");
const resultWhy = document.querySelector("#quiz-result-why");

const steps = form ? [...form.querySelectorAll("[data-question]")] : [];

const roasts = {
  ember: {
    name: "Ember",
    meta: "Dark roast · Chikmagalur, Karnataka",
    notes: "Dark chocolate, molasses and toasted almond.",
    why: "You want weight and warmth: dark chocolate and molasses with a finish that stays. Keep it for espresso, moka or a proper flat white.",
  },
  oak: {
    name: "Oak",
    meta: "Medium roast · Coorg, Karnataka",
    notes: "Caramel, hazelnut and orange peel.",
    why: "You want balance: caramel and hazelnut with just enough orange peel. Forgiving in a French press and good black, any morning.",
  },
  bloom: {
    name: "Bloom",
    meta: "Light roast · Araku Valley, Andhra Pradesh",
    notes: "Jasmine, apricot and honey.",
    why: "You want brightness: jasmine, apricot and honey. Let a filter or pour-over open it up.",
  },
};

let currentStep = 0;

function selectedInput(step) {
  return step.querySelector('input[type="radio"]:checked');
}

function selectedValue(name) {
  const input = form.querySelector(`input[name="${name}"]:checked`);
  return input ? input.value : null;
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
  steps.forEach((step) => step.removeAttribute("aria-describedby"));
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  steps[currentStep].setAttribute("aria-describedby", "quiz-error");
  const firstInput = steps[currentStep].querySelector('input[type="radio"]');
  if (firstInput) firstInput.focus();
}

function updateProgress() {
  progress.max = steps.length;
  progress.value = currentStep + 1;
  progress.textContent = `Question ${currentStep + 1} of ${steps.length}`;
  progressLabel.textContent = `Question ${currentStep + 1} of ${steps.length}`;
  backButton.hidden = currentStep === 0;
  nextButton.textContent = currentStep === steps.length - 1 ? "See my roast" : "Next question";
}

function showStep(index, moveFocus = true) {
  currentStep = index;
  steps.forEach((step, stepIndex) => {
    step.hidden = stepIndex !== index;
  });
  clearError();
  updateProgress();
  status.textContent = moveFocus ? `Question ${index + 1} of ${steps.length}.` : "";

  if (moveFocus) {
    const target =
      selectedInput(steps[index]) ||
      steps[index].querySelector('input[type="radio"]');
    if (target) target.focus();
  }
}

function getWinner() {
  const brew = selectedValue("brew");
  const flavour = selectedValue("flavour");
  const serve = selectedValue("serve");
  const scores = { ember: 0, oak: 0, bloom: 0 };

  if (brew) scores[brew] += 1;
  if (flavour) scores[flavour] += 2;
  if (serve) scores[serve] += 1;

  let winner = "ember";
  let best = -1;

  for (const key of Object.keys(scores)) {
    const weighted = scores[key] + (key === flavour ? 0.5 : 0);
    if (weighted > best) {
      best = weighted;
      winner = key;
    }
  }

  return winner;
}

function showResult() {
  const firstMissing = steps.findIndex((step) => !selectedInput(step));

  if (firstMissing !== -1) {
    showStep(firstMissing);
    showError("Choose an option to continue.");
    return;
  }

  const roast = roasts[getWinner()];
  resultTitle.textContent = roast.name;
  resultMeta.textContent = roast.meta;
  resultNotes.textContent = roast.notes;
  resultWhy.textContent = roast.why;
  form.hidden = true;
  result.hidden = false;
  resultTitle.focus();
}

function restartQuiz() {
  form.reset();
  result.hidden = true;
  form.hidden = false;
  resultTitle.textContent = "";
  resultMeta.textContent = "";
  resultNotes.textContent = "";
  resultWhy.textContent = "";
  showStep(0);
}

if (form && result && steps.length) {
  nextButton.addEventListener("click", () => {
    if (!selectedInput(steps[currentStep])) {
      showError("Choose an option to continue.");
      return;
    }

    clearError();

    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
    } else {
      showResult();
    }
  });

  backButton.addEventListener("click", () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  restartButton.addEventListener("click", restartQuiz);

  form.addEventListener("change", clearError);

  form.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      event.target.matches('input[type="radio"]') &&
      event.target.checked
    ) {
      event.preventDefault();
      nextButton.click();
    }
  });

  showStep(0, false);
}
