const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const progressItems = document.querySelectorAll("[data-progress-item]");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const courseFrame = document.querySelector("#courseFrame");
const pageLabel = document.querySelector("#pageLabel");

let pageIndex = 0;
const coursePages = Array.from({ length: 90 }, (_, index) => index + 1);

const questions = [
  {
    text: "Quelle condition definit la continuite de f en a ?",
    choices: ["lim f(x) quand x tend vers a = f(a)", "f'(a) = 0", "f(a) = 0", "f est toujours positive"],
    answer: 0,
    feedback: "Oui: les limites a gauche et a droite doivent exister, etre egales, et valoir f(a)."
  },
  {
    text: "Que garantit le TVI pour une fonction continue sur [a,b] ?",
    choices: ["Toute valeur entre f(a) et f(b) est atteinte", "La solution est toujours unique", "La derivee est positive", "La fonction est paire"],
    answer: 0,
    feedback: "Le TVI donne l'existence d'au moins une solution, pas forcement l'unicite."
  },
  {
    text: "Quand le theoreme de bijection donne-t-il une solution unique ?",
    choices: ["Fonction continue et strictement monotone", "Fonction seulement continue", "Fonction seulement derivable", "Fonction periodique"],
    answer: 0,
    feedback: "La monotonie stricte ajoute l'unicite a l'existence."
  },
  {
    text: "Quelle est l'equation de la tangente en x0 ?",
    choices: ["T(x)=f'(x0)(x-x0)+f(x0)", "T(x)=f(x0)x+f'(x0)", "T(x)=f'(x)", "T(x)=x0"],
    answer: 0,
    feedback: "Il faut la pente f'(x0) et le point (x0, f(x0))."
  },
  {
    text: "La derivee de x^n vaut:",
    choices: ["n x^{n-1}", "x^{n+1}", "n x", "1/x"],
    answer: 0,
    feedback: "C'est la formule de base pour les puissances."
  },
  {
    text: "La derivee de ln(x) vaut:",
    choices: ["1/x", "ln(x)", "e^x", "x ln(x)"],
    answer: 0,
    feedback: "Sur x > 0, (ln x)' = 1/x."
  },
  {
    text: "La derivee de e^u vaut:",
    choices: ["u'e^u", "e^u/u", "u e^u", "ln(u)e^u"],
    answer: 0,
    feedback: "C'est la regle de composition appliquee a l'exponentielle."
  },
  {
    text: "Si f'(x) > 0 sur un intervalle, alors f est:",
    choices: ["Croissante", "Decroissante", "Constante", "Non definie"],
    answer: 0,
    feedback: "Le signe de la derivee controle les variations."
  },
  {
    text: "Une asymptote horizontale y = a apparait si:",
    choices: ["f(x) tend vers a en l'infini", "f(x) tend vers l'infini en a", "f'(x)=a", "f(a)=0"],
    answer: 0,
    feedback: "Une limite finie en +infini ou -infini donne une horizontale."
  },
  {
    text: "Une asymptote verticale x = a apparait si:",
    choices: ["f(x) tend vers l'infini quand x tend vers a", "f(a)=a", "f'(a)=0", "f est continue en a"],
    answer: 0,
    feedback: "Une limite infinie en un point donne une verticale."
  },
  {
    text: "Quel equivalent est utilise pres de 0 ?",
    choices: ["e^x ~ 1 + x", "e^x ~ x", "ln(x) ~ x", "cos(x) ~ x"],
    answer: 0,
    feedback: "Le developpement limite d'ordre 1 de e^x est 1 + x."
  },
  {
    text: "Quel equivalent est utilise pres de 0 ?",
    choices: ["ln(1+x) ~ x", "ln(1+x) ~ 1+x", "ln(x) ~ 1/x", "ln(x) ~ e^x"],
    answer: 0,
    feedback: "C'est un equivalent tres utile pour les limites."
  },
  {
    text: "log_a(x) se definit par:",
    choices: ["ln(x)/ln(a)", "ln(a)/ln(x)", "a^x", "x^a"],
    answer: 0,
    feedback: "Cette formule permet aussi de deriver log_a."
  },
  {
    text: "La derivee de arctan(x) vaut:",
    choices: ["1/(1+x^2)", "1/sqrt(1-x^2)", "-1/sqrt(1-x^2)", "tan(x)"],
    answer: 0,
    feedback: "A connaitre avec arcsin et arccos."
  },
  {
    text: "Un complexe z = a + ib a pour partie imaginaire:",
    choices: ["b", "a", "ib", "a + b"],
    answer: 0,
    feedback: "La partie imaginaire est le coefficient de i."
  },
  {
    text: "Le conjugue de a + ib est:",
    choices: ["a - ib", "-a + ib", "b + ia", "-a - ib"],
    answer: 0,
    feedback: "Le conjugue garde la partie reelle et change le signe de la partie imaginaire."
  },
  {
    text: "Le module de a + ib vaut:",
    choices: ["sqrt(a^2+b^2)", "a+b", "a-b", "a^2-b^2"],
    answer: 0,
    feedback: "Geometriquement, c'est la distance a l'origine."
  },
  {
    text: "La formule d'Euler est:",
    choices: ["e^{i theta}=cos theta+i sin theta", "e^{i theta}=sin theta+i cos theta", "e^x=ln x", "i^2=1"],
    answer: 0,
    feedback: "C'est le lien central entre complexes et trigonometrie."
  },
  {
    text: "Dans z = rho e^{i theta}, theta est:",
    choices: ["Un argument de z", "Le module", "La partie reelle", "Le conjugue"],
    answer: 0,
    feedback: "rho est le module, theta est l'argument."
  },
  {
    text: "Pour x(t)=E cos(omega t + phi), l'amplitude complexe vaut:",
    choices: ["X = E e^{j phi}", "X = omega e^{jE}", "X = E cos(phi)", "X = j omega"],
    answer: 0,
    feedback: "On separe l'amplitude complexe X et le facteur temporel e^{j omega t}."
  }
];

let currentQuestion = 0;
const answers = new Array(questions.length).fill(null);

function updateProgress() {
  const checked = document.querySelectorAll("[data-progress-item].checked").length;
  const total = progressItems.length;
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
  progressText.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function showCoursePage(page) {
  const safePage = Math.min(90, Math.max(1, page));
  pageIndex = safePage - 1;
  courseFrame.src = `assets/files/cours-maths-s2-pages-1-90.pdf#page=${safePage}`;
  courseFrame.title = `Apercu du cours page ${safePage}`;
  pageLabel.textContent = `Cours page ${safePage}`;

  document.querySelectorAll(".map-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.page) === safePage);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
  });
});

document.querySelectorAll(".mini-check").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-progress-item]");
    card.classList.toggle("checked");
    button.textContent = card.classList.contains("checked") ? "Vu" : "Marquer vu";
    updateProgress();
  });
});

document.querySelectorAll(".reveal-answer").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = document.querySelector(`#${button.dataset.answer}`);
    const card = button.closest("[data-progress-item]");
    answer.classList.toggle("visible");
    card.classList.add("checked");
    button.textContent = answer.classList.contains("visible") ? "Masquer" : "Voir la methode";
    updateProgress();
  });
});

document.querySelector("#prevPage").addEventListener("click", () => {
  const nextIndex = (pageIndex - 1 + coursePages.length) % coursePages.length;
  showCoursePage(coursePages[nextIndex]);
});

document.querySelector("#nextPage").addEventListener("click", () => {
  const nextIndex = (pageIndex + 1) % coursePages.length;
  showCoursePage(coursePages[nextIndex]);
});

document.querySelectorAll(".map-card").forEach((card) => {
  card.addEventListener("click", () => {
    showCoursePage(Number(card.dataset.page));
    document.querySelector("#fiches").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function renderQuiz() {
  const question = questions[currentQuestion];
  document.querySelector("#questionCounter").textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  document.querySelector("#scoreText").textContent = `Score ${answers.filter((value, index) => value === questions[index].answer).length}`;
  document.querySelector("#questionText").textContent = question.text;
  document.querySelector("#feedback").textContent = answers[currentQuestion] === null ? "" : question.feedback;

  const choices = document.querySelector("#choices");
  choices.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent = choice;

    if (answers[currentQuestion] !== null) {
      if (index === question.answer) button.classList.add("correct");
      if (index === answers[currentQuestion] && index !== question.answer) button.classList.add("wrong");
    }

    button.addEventListener("click", () => {
      answers[currentQuestion] = index;
      renderQuiz();
    });

    choices.appendChild(button);
  });
}

document.querySelector("#prevQuestion").addEventListener("click", () => {
  currentQuestion = (currentQuestion - 1 + questions.length) % questions.length;
  renderQuiz();
});

document.querySelector("#nextQuestion").addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuiz();
});

document.querySelector("#resetQuiz").addEventListener("click", () => {
  answers.fill(null);
  currentQuestion = 0;
  renderQuiz();
});

document.querySelector("#resetPractice").addEventListener("click", () => {
  document.querySelectorAll(".answer.visible").forEach((answer) => answer.classList.remove("visible"));
  document.querySelectorAll(".exercise-card.checked").forEach((card) => card.classList.remove("checked"));
  document.querySelectorAll(".reveal-answer").forEach((button) => {
    button.textContent = "Voir la methode";
  });
  updateProgress();
});

showCoursePage(1);
renderQuiz();
updateProgress();
