
const questions = [
  {
    emoji: "🌸",
    question: "Do you know how special you are to me?",
    options: [
      "Of course I know! 😊",
      "Maybe a little 🙈",
      "Tell me why! ❤️"
    ],
    reactions: [
      "I hope you never forget it. You really are someone special to me. ❤️",
      "Then let me remind you a little more often. 🌷",
      "Because there's something about you that makes you different from everyone else."
    ],
    subtext: "Just a little truth I wanted to share."
  },

  {
    emoji: "💌",
    question: "Do you know what makes my day a little better?",
    options: [
      "A good cup of coffee ☕",
      "A random notification 📱",
      "Talking with me? 👀"
    ],
    reactions: [
      "Coffee is nice, but some conversations are even better. ☕",
      "Especially when that notification is from you. Your messages genuinely make my day. ❤️",
      "You guessed it! Talking with you is one of my favourite parts of the day. 🥰"
    ],
    subtext: "Some little things make a big difference."
  },

  {
    emoji: "😊",
    question: "Do you have any idea what happens when I see you?",
    options: [
      "You smile? 🙈",
      "You get nervous? 😂",
      "Something else?"
    ],
    reactions: [
      "Exactly! Your presence has a way of making me smile without even trying. ❤️",
      "Okay, maybe a little nervous too. Don't tell anyone! 😂",
      "Honestly, I just feel really happy whenever I see you. 🌷"
    ],
    subtext: "Some feelings are difficult to explain."
  },

  {
    emoji: "✨",
    question: "What do you think I like most about you?",
    options: [
      "My smile 😊",
      "My way of talking 💬",
      "Everything about me? 🙈"
    ],
    reactions: [
      "Your smile is honestly something special. It stays in my mind longer than you think. ❤️",
      "I really enjoy listening to you, even when you're talking about random things. 😂",
      "Well... I can't choose just one thing. There's a lot to like about you. 💗"
    ],
    subtext: "It's the little things that make you, you."
  },

  {
    emoji: "❤️",
    question: "One last thing... do you know how I feel about you?",
    options: [
      "I have a little idea 🙈",
      "Tell me honestly ❤️",
      "I'm all ears! 👀"
    ],
    reactions: [
      "Maybe your guess is right. There's something special about you that I can't ignore. ❤️",
      "I really like you. Talking with you makes me happy, seeing you makes me smile, and having you around means a lot to me.",
      "Okay, here goes... I think you're becoming someone very special to me. 💗"
    ],
    subtext: "A little honesty, just for you."
  }
];


// ELEMENTS

const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const finalScreen = document.getElementById("final");

const questionContent = document.getElementById("questionContent");
const reactionContent = document.getElementById("reactionContent");

const questionText = document.getElementById("questionText");
const questionEmoji = document.getElementById("questionEmoji");
const optionsContainer = document.getElementById("options");

const reactionText = document.getElementById("reactionText");
const reactionSubtext = document.getElementById("reactionSubtext");

const progress = document.getElementById("progress");
const questionCount = document.getElementById("questionCount");

const finalSong = document.getElementById("finalSong");

let currentQuestion = 0;
let isTransitioning = false;


// GSAP HELPER

function animateIn(element) {
  element.style.display = "block";

  if (window.gsap) {
    gsap.killTweensOf(element);

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        clearProps: "opacity,transform"
      }
    );
  } else {
    element.style.opacity = "1";
  }
}


// SCREEN TRANSITION

function switchScreen(from, to) {
  if (isTransitioning) return;

  isTransitioning = true;

  const finish = () => {
    from.classList.remove("active");
    from.style.display = "none";

    to.style.display = "block";
    to.classList.add("active");

    if (window.gsap) {
      gsap.fromTo(
        to,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "all",
          onComplete: () => {
            isTransitioning = false;
          }
        }
      );
    } else {
      to.style.opacity = "1";
      isTransitioning = false;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (window.gsap) {
    gsap.to(from, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: "power2.in",
      onComplete: finish
    });
  } else {
    finish();
  }
}


// START EXPERIENCE

document.getElementById("startBtn").addEventListener("click", () => {
  switchScreen(welcome, quiz);

  currentQuestion = 0;

  setTimeout(() => {
    showQuestion();
  }, 350);
});


// SHOW QUESTION

function showQuestion() {
  const data = questions[currentQuestion];

  questionCount.textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  progress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionEmoji.textContent = data.emoji;
  questionText.textContent = data.question;

  optionsContainer.innerHTML = "";

  questionContent.style.display = "block";
  reactionContent.style.display = "none";

  questionContent.style.opacity = "1";
  reactionContent.style.opacity = "1";

  if (window.gsap) {
    gsap.killTweensOf([questionContent, reactionContent]);
  }

  data.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "option-btn";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(index, button);
    });

    optionsContainer.appendChild(button);
  });

  animateIn(questionContent);

  if (window.gsap) {
    gsap.fromTo(
      optionsContainer.children,
      {
        y: 12,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,transform"
      }
    );
  }
}


// SELECT ANSWER

function selectAnswer(index, button) {
  if (isTransitioning) return;

  const data = questions[currentQuestion];

  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove("selected");
  });

  button.classList.add("selected");

  reactionText.textContent = data.reactions[index];
  reactionSubtext.textContent = data.subtext;

  const showReaction = () => {
    questionContent.style.display = "none";
    reactionContent.style.display = "block";

    animateIn(reactionContent);

    createHearts(8);
    isTransitioning = false;
  };

  isTransitioning = true;

  if (window.gsap) {
    gsap.killTweensOf(questionContent);

    gsap.to(questionContent, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: "power2.in",
      onComplete: showReaction
    });
  } else {
    showReaction();
  }

  const nextButton = document.getElementById("nextBtn");

  nextButton.innerHTML =
    currentQuestion === questions.length - 1
      ? 'See your little surprise <span>♡</span>'
      : 'Next little thing <span>→</span>';
}


// NEXT QUESTION

document.getElementById("nextBtn").addEventListener("click", () => {
  if (isTransitioning) return;

  if (currentQuestion < questions.length - 1) {
    isTransitioning = true;

    const next = () => {
      currentQuestion++;
      reactionContent.style.display = "none";
      showQuestion();
      isTransitioning = false;
    };

    if (window.gsap) {
      gsap.to(reactionContent, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        onComplete: next
      });
    } else {
      next();
    }

  } else {
    showFinal();
  }
});


// FINAL REVEAL

function showFinal() {
  if (isTransitioning) return;

  finalSong.pause();
  finalSong.currentTime = 0;

  switchScreen(quiz, finalScreen);

  createHearts(25);

  setTimeout(() => {
    if (!window.gsap) return;

    gsap.fromTo(
      ".final-envelope",
      {
        scale: 0,
        rotation: -20
      },
      {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }
    );

    gsap.fromTo(
      ".memory-card",
      {
        opacity: 0,
        y: 35,
        rotation: -8
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      ".final-letter p",
      {
        opacity: 0,
        y: 12
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.35,
        duration: 0.6,
        delay: 0.7
      }
    );

    gsap.fromTo(
      ".song-player",
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 1.7
      }
    );

  }, 450);
}


// FLOATING HEARTS

function createHearts(amount = 5) {
  const container = document.getElementById("hearts");

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.className = "heart";

    heart.textContent = ["♡", "♥", "💕", "✿"][
      Math.floor(Math.random() * 4)
    ];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
      (12 + Math.random() * 20) + "px";

    const duration = 3 + Math.random() * 3;

    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }
}


// BACKGROUND HEARTS

setInterval(() => {
  if (document.visibilityState === "visible") {
    createHearts(1);
  }
}, 1500);


// REPLAY

document.getElementById("replayBtn").addEventListener("click", () => {
  if (isTransitioning) return;

  currentQuestion = 0;

  finalSong.pause();
  finalSong.currentTime = 0;

  if (window.gsap) {
    gsap.set(finalScreen, {
      clearProps: "all"
    });
  }

  switchScreen(finalScreen, welcome);
});
