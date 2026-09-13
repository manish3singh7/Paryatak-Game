let stats = {
    integrity: 50,
    knowledge: 50,
    culture: 50,
    nature: 50,
    prosperity: 50
};

const REACTIONS = {
    excited: "assets/excited.jpeg",
    correct: "assets/correct.jpeg",
    wrong: "assets/wrong.jpeg"
};

let lives = 3.0;
const maxLives = 3;

let score = 0;
let streak = 0;
let history = [];

// Sound Effects
const correctSound = new Audio("assets/right.mp3");
const wrongSound = new Audio("assets/wrong.mp3");

correctSound.volume = 0.5;
wrongSound.volume = 0.5;

const SVG_FULL = "assets/heart.svg";
const SVG_HALF = "assets/halfh.svg";

function updateHearts(animationType = "") {
    let temp = lives;

    for (let i = 0; i < maxLives; i++) {
        const heartImg = document.getElementById(`heart-${i}`);
        if (!heartImg) continue;

        heartImg.classList.remove("heart-depleted");

        if (temp >= 1) {
            heartImg.src = SVG_FULL;
            temp -= 1;
        } else if (temp >= 0.5) {
            heartImg.src = SVG_HALF;
            temp -= 0.5;
        } else {
            heartImg.src = SVG_FULL;
            heartImg.classList.add("heart-depleted");
        }
    }

    const container = document.getElementById("hearts");
    if (container && animationType) {
        container.classList.remove("heart-pop", "heart-shake");
        void container.offsetWidth;
        container.classList.add(animationType);
    }
}

let currentScene = 0;

const scenes = [
    {
        chapter: "INTRODUCTION",
        background: "url('assets/harappan.mp4')",
        emoji: "",
        title: "Welcome To Harrapan Civilisation",
        text: "DID YOU KNOW?: The Harappans had a writing system that has not yet been fully deciphered!",
        choices: [
            {
                text: "Begin the journey",
                effects: {},
                next: 1
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "🏺",
        title: "🏺Harappan Civilization — Fact + Quiz",
        text: "Fact: Harappan cities were remarkably well planned for their time. Many settlements had straight streets, standardized brick sizes, wells, houses, and organized drainage systems.",
        choices: [
            {
                text: "Next",
                effects: {},
                next: 2
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "🪙",
        title: "❓ Quiz:",
        text: "Which feature is especially associated with Harappan urban planning?",
        choices: [
            {
                text: "A. Sophisticated drainage systems",
                isCorrect: true,
                effects: {},
                next: 3
            },
            {
                text: "B. Giant stone pyramids",
                isCorrect: false,
                effects: {},
                next: 3
            },
            {
                text: "C. Roman-style amphitheaters",
                isCorrect: false,
                effects: {},
                next: 3
            },
            {
                text: "D. Medieval castles",
                isCorrect: false,
                effects: {},
                next: 3
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "📜",
        title: "📜Fact:🚿 The Great Bath",
        text: "The Great Bath at Mohenjo-daro is a large, carefully constructed brick-lined structure. Its exact purpose is unknown, but it may have had ritual or ceremonial significance.",
        choices: [
            {
                text: "NEXT",
                effects: {},
                next: 4
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓",
        title: "The Quiz",
        text: "Where is the famous Great Bath located?",
        choices: [
            {
                text: "A. Harappa",
                isCorrect: false,
                effects: {},
                next: 5
            },
            {
                text: "B. Mohenjo-daro",
                isCorrect: true,
                effects: {},
                next: 5
            },
            {
                text: "C. Lothal",
                isCorrect: false,
                effects: {},
                next: 5
            },
            {
                text: "D. Rakhigarhi",
                isCorrect: false,
                effects: {},
                next: 5
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: " 📜",
        title: "The Mysterious Script 📜",
        text: "Harappan people used symbols that appear on seals, pottery, tablets, and other objects. Despite decades of research, the Harappan script has not been conclusively deciphered.",
        choices: [
            {
                text: "NEXT",
                effects: { nature: 10, integrity: 10 },
                next: 6
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "📜 ",
        title: "❓ Quiz:",
        text: "What is the current status of the Harappan script?",
        choices: [
            {
                text: "• A. Completely deciphered",
                isCorrect: false,
                effects: { prosperity: 20, integrity: -15 },
                next: 7
            },
            {
                text: "• B. Partially translated into Greek",
                isCorrect: false,
                effects: { integrity: 15 },
                next: 7
            },
            {
                text: "• C. Still undeciphered",
                isCorrect: true,
                effects: { integrity: 20, knowledge: 5 },
                next: 7
            },
            {
                text: "• D. Written entirely in Sanskrit",
                isCorrect: false,
                effects: { integrity: 20, knowledge: 5 },
                next: 7
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "🐂",
        title: "📜 Fact:",
        text: "Harappan seals are often made from steatite and feature animals and short inscriptions. One of the most famous motifs is a mysterious one-horned animal often called the “unicorn.”",
        choices: [
            {
                text: "NEXT",
                effects: {},
                next: 8
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "💧 ",
        title: "❓ Quiz:",
        text: "Which Harappan site is particularly famous for its water-management system?",
        choices: [
            {
                text: "• A. Dholavira",
                isCorrect: true,
                effects: {},
                next: 9
            },
            {
                text: "• B. Taxila",
                isCorrect: false,
                effects: { nature: 20 },
                next: 9
            },
            {
                text: "• C. Sarnath",
                isCorrect: false,
                effects: { nature: 15, knowledge: 10 },
                next: 9
            },
            {
                text: "• D. Pataliputra",
                isCorrect: false,
                effects: { nature: 15, knowledge: 10 },
                next: 9
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Harappan sites have yielded sets of carefully standardized weights. Such standardization would have helped with trade and measuring goods.",
        choices: [
            {
                text: "NEXT",
                next: 10
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Why were standardized weights useful?",
        choices: [
            {
                text: "A. For measuring goods during exchange",
                isCorrect: true,
                next: 11
            },
            {
                text: "B. For building temples",
                isCorrect: false,
                next: 11
            },
            {
                text: "C. For predicting eclipses",
                isCorrect: false,
                next: 11
            },
            {
                text: "D. For writing inscriptions",
                isCorrect: false,
                next: 11
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "🚢 ",
        title: "📜 Fact:",
        text: "Harappan communities participated in trade networks extending beyond their immediate region. Archaeological evidence shows connections with areas to the west, including Mesopotamia.",
        choices: [
            {
                text: "NEXT",
                next: 12
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which ancient region had trade connections with the Harappan world?",
        choices: [
            {
                text: "A. Mesopotamia",
                isCorrect: true,
                next: 13
            },
            {
                text: "B. Scandinavia",
                isCorrect: false,
                next: 13
            },
            {
                text: "C. Mesoamerica",
                isCorrect: false,
                next: 13
            },
            {
                text: "D. Japan",
                isCorrect: false,
                next: 13
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "💎 ",
        title: "📜 Fact:",
        text: "Harappan craftspeople produced beautiful beads from materials such as carnelian, along with pottery, metal objects, ornaments, and faience.",
        choices: [
            {
                text: "NEXT",
                next: 14
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which material was important in Harappan bead-making?",
        choices: [
            {
                text: "A. Carnelian",
                isCorrect: true,
                next: 15
            },
            {
                text: "B. Porcelain",
                isCorrect: false,
                next: 15
            },
            {
                text: "C. Aluminum",
                isCorrect: false,
                next: 15
            },
            {
                text: "D. Platinum",
                isCorrect: false,
                next: 15
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "🌾 ",
        title: "📜 Fact:",
        text: "Agriculture was fundamental to Harappan society. Archaeological evidence indicates the cultivation of crops such as wheat and barley, along with other crops in different regions.",
        choices: [
            {
                text: "NEXT",
                next: 16
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which pair of crops is associated with Harappan agriculture?",
        choices: [
            {
                text: "A. Wheat and barley",
                isCorrect: true,
                next: 17
            },
            {
                text: "B. Coffee and cocoa",
                isCorrect: false,
                next: 17
            },
            {
                text: "C. Potatoes and tomatoes",
                isCorrect: false,
                next: 17
            },
            {
                text: "D. Maize and vanilla",
                isCorrect: false,
                next: 17
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "📜 Fact:",
        text: "Unlike ancient Egypt, where we know the names of many pharaohs, the Harappan Civilization has not given us a securely established list of kings. Combined with the undeciphered script, this leaves many questions about its political organization.",
        choices: [
            {
                text: "NEXT",
                next: 18
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Why is it difficult to identify individual Harappan rulers?",
        choices: [
            {
                text: "A. There is limited direct evidence for named rulers",
                isCorrect: true,
                next: 19
            },
            {
                text: "B. Harappans left thousands of royal biographies",
                isCorrect: false,
                next: 19
            },
            {
                text: "C. Their kings were all Roman governors",
                isCorrect: false,
                next: 19
            },
            {
                text: "D. Their rulers are listed in medieval Persian chronicles",
                isCorrect: false,
                next: 19
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "🐂 ",
        title: "📜 Fact:",
        text: "Harappan seals are often made from steatite and feature animals and short inscriptions. One of the most famous motifs is a mysterious one-horned animal often called the “unicorn.",
        choices: [
            {
                text: "NEXT",
                next: 20
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which material was commonly used to make Harappan seals?",
        choices: [
            {
                text: "A. Steatite",
                isCorrect: true,
                next: 21
            },
            {
                text: "B. Glass",
                isCorrect: false,
                next: 21
            },
            {
                text: "C. Marble",
                isCorrect: false,
                next: 21
            },
            {
                text: "D. Iron",
                isCorrect: false,
                next: 21
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "📜 ",
        title: "📜 Fact:",
        text: "The Vedas are among the oldest sacred texts of Indian tradition. The Rigveda is the oldest of the four Vedas and contains hymns dedicated to various deities.",
        choices: [
            {
                text: "NEXT",
                next: 22
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which is considered the oldest of the four Vedas?",
        choices: [
            {
                text: "A. Rigveda",
                isCorrect: true,
                next: 23
            },
            {
                text: "B. Samaveda",
                isCorrect: false,
                next: 23
            },
            {
                text: "C. Yajurveda",
                isCorrect: false,
                next: 23
            },
            {
                text: "D. Atharvaveda",
                isCorrect: false,
                next: 23
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "🔥 ",
        title: "📜 Fact:",
        text: "Fire played an important role in Vedic rituals. Agni, the fire deity, was one of the most important gods mentioned in the Rigveda and was associated with carrying offerings to the gods.",
        choices: [
            {
                text: "NEXT",
                next: 24
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which Vedic deity was strongly associated with fire?",
        choices: [
            {
                text: "A. Varuna",
                isCorrect: false,
                next: 26
            },
            {
                text: "B. Agni",
                isCorrect: true,
                next: 26
            },
            {
                text: "C. Indra",
                isCorrect: false,
                next: 26
            },
            {
                text: "D. Surya",
                isCorrect: false,
                next: 26
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "📜 ",
        title: "📜 Fact:",
        text: "Indra is one of the most frequently mentioned deities in the Rigveda. He is associated with storms, warfare, strength, and the defeat of the serpent-like figure Vritra.",
        choices: [
            {
                text: "NEXT",
                next: 27
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which Vedic deity is especially associated with storms and warfare?",
        choices: [
            {
                text: "A. Agni",
                isCorrect: false,
                next: 29
            },
            {
                text: "B. Indra",
                isCorrect: true,
                next: 29
            },
            {
                text: "C. Soma",
                isCorrect: false,
                next: 29
            },
            {
                text: "D. Ushas",
                isCorrect: false,
                next: 29
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "🐄 ",
        title: "📜 Fact:",
        text: "Cattle were extremely important in Early Vedic society. They were a major form of wealth and played an important role in food, agriculture, exchange, and social status.",
        choices: [
            {
                text: "NEXT",
                next: 30
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "What was an important measure of wealth in Early Vedic society?",
        choices: [
            {
                text: "A. Gold coins",
                isCorrect: false,
                next: 31
            },
            {
                text: "B. Silk",
                isCorrect: false,
                next: 31
            },
            {
                text: "C. Cattle",
                isCorrect: true,
                next: 31
            },
            {
                text: "D. Paper currency",
                isCorrect: false,
                next: 31
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: " 🏹",
        title: "📜 Fact:",
        text: "The communities described in the Rigveda lived primarily in northwestern parts of the Indian subcontinent. The region is sometimes called Sapta Sindhu, meaning “land of seven rivers.”",
        choices: [
            {
                text: "NEXT",
                next: 32
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "What does Sapta Sindhu mean?",
        choices: [
            {
                text: "A. Land of seven cities",
                isCorrect: false,
                next: 33
            },
            {
                text: "B. Land of seven mountains",
                isCorrect: false,
                next: 33
            },
            {
                text: "C. Land of seven rivers",
                isCorrect: true,
                next: 33
            },
            {
                text: "D. Land of seven kingdoms",
                isCorrect: false,
                next: 33
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: " 👑 ",
        title: "📜 Fact:",
        text: "Early Vedic society was organized largely around tribes or jana. Their leaders were known as rajan. The rajan was not necessarily an absolute monarch like many later kings.",
        choices: [
            {
                text: "NEXT",
                next: 34
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "What was a rajan in Early Vedic society?",
        choices: [
            {
                text: "A. A type of weapon",
                isCorrect: false,
                next: 35
            },
            {
                text: "B. A priestly text",
                isCorrect: false,
                next: 35
            },
            {
                text: "C. A merchant guild",
                isCorrect: false,
                next: 35
            },
            {
                text: "D. A tribal chief or king",
                isCorrect: true,
                next: 35
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "🏛️ ",
        title: "📜 Fact:",
        text: "Vedic texts mention assemblies called sabha and samiti. Their exact functions are debated, but they appear to have been important institutions within Early Vedic political and social life.",
        choices: [
            {
                text: "NEXT",
                next: 36
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "What were sabha and samiti?",
        choices: [
            {
                text: "A. Agricultural tools",
                isCorrect: false,
                next: 37
            },
            {
                text: "B. Weapons",
                isCorrect: false,
                next: 37
            },
            {
                text: "C. Religious books",
                isCorrect: false,
                next: 37
            },
            {
                text: "D. Assemblies",
                isCorrect: true,
                next: 37
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "🌾 ",
        title: "📜 Fact:",
        text: "During the Later Vedic period, communities expanded farther east into the Ganga-Yamuna region. Agriculture became increasingly important, and larger territorial kingdoms began to emerge.",
        choices: [
            {
                text: "NEXT",
                next: 38
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓",
        title: "❓ Quiz:",
        text: "What major change occurred during the Later Vedic period?",
        choices: [
            {
                text: "A. Urban life completely disappeared",
                isCorrect: false,
                next: 39
            },
            {
                text: "B. Larger territorial kingdoms emerged",
                isCorrect: true,
                next: 39
            },
            {
                text: "C. Writing became universally common",
                isCorrect: false,
                next: 39
            },
            {
                text: "D. The Roman Empire conquered northern India",
                isCorrect: false,
                next: 39
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "🔱 ",
        title: "📜 Fact:",
        text: "Vedic literature contains references to social categories that later developed into the varna system. The four major varnas traditionally became Brahmin, Kshatriya, Vaishya, and Shudra.",
        choices: [
            {
                text: "NEXT",
                next: 40
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which group was traditionally associated with priests and ritual specialists?",
        choices: [
            {
                text: "A. Shudras",
                isCorrect: false,
                next: 41
            },
            {
                text: "B. Kshatriyas",
                isCorrect: false,
                next: 41
            },
            {
                text: "C. Vaishyas",
                isCorrect: false,
                next: 41
            },
            {
                text: "D. Brahmins",
                isCorrect: true,
                next: 41
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "🧘 ",
        title: "📜 Fact:",
        text: "Later Vedic literature gradually expanded beyond ritual instructions. The Upanishads explored philosophical questions about reality, the self (atman), ultimate reality (brahman), and liberation.",
        choices: [
            {
                text: "NEXT",
                next: 42
            }
        ]
    },
    {
        chapter: "CHAPTER II",
        emoji: "❓ ",
        title: "❓ Quiz:",
        text: "Which texts are particularly associated with philosophical inquiry in the later Vedic tradition?",
        choices: [
            {
                text: "A. Arthashastra",
                isCorrect: false,
                next: 43
            },
            {
                text: "B. Upanishads",
                isCorrect: true,
                next: 43
            },
            {
                text: "C. Jataka tales",
                isCorrect: false,
                next: 43
            },
            {
                text: "D. Sangam poems",
                isCorrect: false,
                next: 43
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "🏙️",
        title: "📜 Fact:",
        text: "Magadha's political center later shifted to Pataliputra, located near the Ganges. Its strategic position helped Magadha control important river routes.",
        choices: [
            {
                text: "NEXT",
                next: 44
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "❓",
        title: "❓ Quiz:",
        text: "Which city later became the major capital of Magadha?",
        choices: [
            {
                text: "A. Taxila",
                isCorrect: false,
                next: 45
            },
            {
                text: "B. Pataliputra",
                isCorrect: true,
                next: 45
            },
            {
                text: "C. Varanasi",
                isCorrect: false,
                next: 45
            },
            {
                text: "D. Kausambi",
                isCorrect: false,
                next: 45
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "🗺️ ",
        title: "📜 Fact:",
        text: "Buddhist and Jain texts mention 16 Mahajanapadas. They included powerful states such as Magadha, Kosala, Vatsa and Avanti.",
        choices: [
            {
                text: "NEXT",
                next: 46
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "How many Mahajanapadas are traditionally identified in early Buddhist sources?",
        choices: [
            {
                text: "A. 12",
                isCorrect: false,
                next: 47
            },
            {
                text: "B. 16",
                isCorrect: true,
                next: 47
            },
            {
                text: "C. 20",
                isCorrect: false,
                next: 47
            },
            {
                text: "D. 24",
                isCorrect: false,
                next: 47
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Magadha was located roughly in present-day Bihar and eventually became the most powerful state in northern India. Its rise laid the foundation for the later Nanda and Mauryan empires.",
        choices: [
            {
                text: "NEXT",
                next: 48
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which Mahajanapada eventually became the foundation of major empires such as the Nanda and Maurya?",
        choices: [
            {
                text: "A. Magadha",
                isCorrect: true,
                next: 49
            },
            {
                text: "B. Gandhara",
                isCorrect: false,
                next: 49
            },
            {
                text: "C. Kuru",
                isCorrect: false,
                next: 49
            },
            {
                text: "D. Matsya",
                isCorrect: false,
                next: 49
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Rajagriha (Rajgir) was an early capital of Magadha. The city was surrounded by hills, providing natural defensive advantages.",
        choices: [
            {
                text: "NEXT",
                next: 50
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which city served as an early capital of Magadha?",
        choices: [
            {
                text: "A. Ujjain",
                isCorrect: false,
                next: 51
            },
            {
                text: "B. Rajagriha",
                isCorrect: true,
                next: 51
            },
            {
                text: "C. Taxila",
                isCorrect: false,
                next: 51
            },
            {
                text: "D. Mathura",
                isCorrect: false,
                next: 51
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Bimbisara was an important early ruler of Magadha. He strengthened the kingdom through military expansion and diplomatic alliances, including marriage alliances.",
        choices: [
            {
                text: "NEXT",
                next: 52
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which ruler is associated with the early expansion of Magadha?",
        choices: [
            {
                text: "A. Samudragupta",
                isCorrect: false,
                next: 53
            },
            {
                text: "B. Ashoka",
                isCorrect: false,
                next: 53
            },
            {
                text: "C. Chandragupta Maurya",
                isCorrect: false,
                next: 53
            },
            {
                text: "D. Bimbisara",
                isCorrect: true,
                next: 53
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Ajatashatru, traditionally described as Bimbisara's son, expanded Magadha and fought major conflicts with neighboring states, including Kosala and the Vajji confederacy.",
        choices: [
            {
                text: "NEXT",
                next: 54
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Who succeeded Bimbisara and became an important expansionist ruler of Magadha?",
        choices: [
            {
                text: "A. Bindusara",
                isCorrect: false,
                next: 55
            },
            {
                text: "B. Mahapadma Nanda",
                isCorrect: false,
                next: 55
            },
            {
                text: "C. Ajatashatru",
                isCorrect: true,
                next: 55
            },
            {
                text: "D. Pushyamitra Shunga",
                isCorrect: false,
                next: 55
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "The Mahajanapada period overlaps with the lifetime and teachings of Gautama Buddha. Buddhism emerged in a world of competing kingdoms, cities, merchants and religious movements.",
        choices: [
            {
                text: "NEXT",
                next: 56
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which major religious teacher lived during the Mahajanapada period?",
        choices: [
            {
                text: "A. Gautama Buddha",
                isCorrect: true,
                next: 57
            },
            {
                text: "B. Shankaracharya",
                isCorrect: false,
                next: 57
            },
            {
                text: "C. Kabir",
                isCorrect: false,
                next: 57
            },
            {
                text: "D. Guru Nanak",
                isCorrect: false,
                next: 57
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Mahavira, the 24th Tirthankara of Jain tradition, was another major religious figure of this period. Jainism and Buddhism both developed within the wider intellectual and religious environment of ancient northern India.",
        choices: [
            {
                text: "NEXT",
                next: 58
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Mahavira is traditionally regarded as the 24th what in Jainism?",
        choices: [
            {
                text: "A. Chakravartin",
                isCorrect: false,
                next: 59
            },
            {
                text: "B. Tirthankara",
                isCorrect: true,
                next: 59
            },
            {
                text: "C. Rajan",
                isCorrect: false,
                next: 59
            },
            {
                text: "D. Senapati",
                isCorrect: false,
                next: 59
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Not all Mahajanapadas were ruled by kings. Some, such as the Vajji confederacy, had oligarchic or republican-style political institutions in which assemblies played an important role.",
        choices: [
            {
                text: "NEXT",
                next: 60
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which Mahajanapada was associated with a confederacy rather than a conventional hereditary monarchy?",
        choices: [
            {
                text: "A. Kosala",
                isCorrect: false,
                next: 61
            },
            {
                text: "B. Magadha",
                isCorrect: false,
                next: 61
            },
            {
                text: "C. Vajji",
                isCorrect: true,
                next: 61
            },
            {
                text: "D. Vatsa",
                isCorrect: false,
                next: 61
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Magadha had several advantages: fertile agricultural land, access to important rivers, nearby mineral resources, and strategically located settlements. These helped it eventually dominate much of northern India.",
        choices: [
            {
                text: "NEXT",
                next: 62
            }
        ]
    },
    {
        chapter: "CHAPTER III",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which factor helped Magadha become particularly powerful?",
        choices: [
            {
                text: "A. Fertile land and strategic geography",
                isCorrect: true,
                next: 63
            },
            {
                text: "B. Its location on the Mediterranean Sea",
                isCorrect: false,
                next: 63
            },
            {
                text: "C. Control of the Roman Empire",
                isCorrect: false,
                next: 63
            },
            {
                text: "D. Access to Atlantic colonies",
                isCorrect: false,
                next: 63
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "What unusual activity is Samudragupta shown performing on some coins?",
        choices: [
            {
                text: "A. Sailing a ship",
                isCorrect: false,
                next: 64
            },
            {
                text: "B. Building a temple",
                isCorrect: false,
                next: 64
            },
            {
                text: "C. Playing a musical instrument",
                isCorrect: true,
                next: 64
            },
            {
                text: "D. Writing a law code",
                isCorrect: false,
                next: 64
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "The Gupta period is traditionally associated with Kalidasa, one of the greatest Sanskrit poets and playwrights. His works include Abhijnanashakuntalam and Meghaduta.",
        choices: [
            {
                text: "NEXT",
                next: 65
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which famous Sanskrit poet and playwright is traditionally associated with the Gupta period?",
        choices: [
            {
                text: "A. Kalidasa",
                isCorrect: true,
                next: 66
            },
            {
                text: "B. Banabhatta",
                isCorrect: false,
                next: 66
            },
            {
                text: "C. Tulsidas",
                isCorrect: false,
                next: 66
            },
            {
                text: "D. Kabir",
                isCorrect: false,
                next: 66
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "The Gupta-era intellectual tradition contributed to the development of Indian mathematics and astronomy. Aryabhata, who lived around the late 5th and early 6th centuries CE, wrote the Aryabhatiya.",
        choices: [
            {
                text: "NEXT",
                next: 67
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Who wrote the Aryabhatiya?",
        choices: [
            {
                text: "A. Aryabhata",
                isCorrect: true,
                next: 68
            },
            {
                text: "B. Varahamihira",
                isCorrect: false,
                next: 68
            },
            {
                text: "C. Brahmagupta",
                isCorrect: false,
                next: 68
            },
            {
                text: "D. Charaka",
                isCorrect: false,
                next: 68
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Aryabhata proposed that the apparent daily movement of the stars could be explained by Earth's rotation. He also made important mathematical and astronomical calculations.",
        choices: [
            {
                text: "NEXT",
                next: 69
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which idea is associated with Aryabhata?",
        choices: [
            {
                text: "A. Earth rotates on its axis",
                isCorrect: true,
                next: 70
            },
            {
                text: "B. Earth is a flat disk",
                isCorrect: false,
                next: 70
            },
            {
                text: "C. The Sun revolves around Earth every hour",
                isCorrect: false,
                next: 70
            },
            {
                text: "D. Stars are fixed lamps attached to mountains",
                isCorrect: false,
                next: 70
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Gupta rulers issued impressive gold coins, often showing the ruler performing different activities such as warfare, hunting, or music. These coins are valuable evidence of Gupta royal imagery and economy.",
        choices: [
            {
                text: "NEXT",
                next: 71
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "What precious metal was prominently used for Gupta imperial coinage?",
        choices: [
            {
                text: "A. Aluminum",
                isCorrect: false,
                next: 72
            },
            {
                text: "B. Gold",
                isCorrect: true,
                next: 72
            },
            {
                text: "C. Platinum",
                isCorrect: false,
                next: 72
            },
            {
                text: "D. Nickel",
                isCorrect: false,
                next: 72
            }
        ]
    },
    {
        chapter: "CHAPTER IV",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Gupta-period art helped establish artistic traditions that influenced later Indian sculpture and temple architecture. The Dashavatara Temple at Deogarh is an important surviving example of early Hindu temple architecture.",
        choices: [
            {
                text: "NEXT",
                next: 73
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which site is associated with an important Gupta-period Hindu temple?",
        choices: [
            {
                text: "A. Qutb Minar",
                isCorrect: false,
                next: 74
            },
            {
                text: "B. Fatehpur Sikri",
                isCorrect: false,
                next: 74
            },
            {
                text: "C. Konark",
                isCorrect: false,
                next: 74
            },
            {
                text: "D. Deogarh",
                isCorrect: true,
                next: 74
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "📜",
        title: "Fact:",
        text: "The Cholas were an ancient Tamil dynasty whose history stretches back much earlier than their medieval imperial period. Their major imperial revival began under Vijayalaya Chola in the 9th century CE.",
        choices: [
            {
                text: "NEXT",
                next: 75
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which ruler is credited with establishing the medieval imperial Chola line?",
        choices: [
            {
                text: "A. Rajendra Chola I",
                isCorrect: false,
                next: 76
            },
            {
                text: "B. Vijayalaya Chola",
                isCorrect: true,
                next: 76
            },
            {
                text: "C. Rajaraja Chola I",
                isCorrect: false,
                next: 76
            },
            {
                text: "D. Kulothunga Chola I",
                isCorrect: false,
                next: 76
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Rajaraja Chola I transformed the Chola kingdom into a major South Indian empire. He expanded Chola territory and commissioned the magnificent Brihadisvara Temple at Thanjavur.",
        choices: [
            {
                text: "NEXT",
                next: 77
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which Chola ruler built the famous Brihadisvara Temple at Thanjavur?",
        choices: [
            {
                text: "A. Rajadhiraja Chola I",
                isCorrect: false,
                next: 78
            },
            {
                text: "B. Rajendra Chola I",
                isCorrect: false,
                next: 78
            },
            {
                text: "C. Vijayalaya Chola",
                isCorrect: false,
                next: 78
            },
            {
                text: "D. Rajaraja Chola I",
                isCorrect: true,
                next: 78
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "Fact:",
        text: "The Brihadisvara Temple was completed around 1010 CE. Its enormous stone tower, called a vimana, is one of the masterpieces of South Indian temple architecture.",
        choices: [
            {
                text: "NEXT",
                next: 79
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Where is the Brihadisvara Temple located?",
        choices: [
            {
                text: "A. Kanchipuram",
                isCorrect: false,
                next: 80
            },
            {
                text: "B. Thanjavur",
                isCorrect: true,
                next: 80
            },
            {
                text: "C. Madurai",
                isCorrect: false,
                next: 80
            },
            {
                text: "D. Mahabalipuram",
                isCorrect: false,
                next: 80
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "Fact:",
        text: "Rajendra Chola I, son of Rajaraja I, continued Chola expansion. His campaigns reached northern India, and Chola naval expeditions crossed the Bay of Bengal toward Southeast Asia.",
        choices: [
            {
                text: "NEXT",
                next: 81
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Who succeeded Rajaraja Chola I as the most prominent imperial Chola ruler?",
        choices: [
            {
                text: "A. Kulothunga Chola III",
                isCorrect: false,
                next: 82
            },
            {
                text: "B. Vijayalaya Chola",
                isCorrect: false,
                next: 82
            },
            {
                text: "C. Rajendra Chola I",
                isCorrect: true,
                next: 82
            },
            {
                text: "D. Rajaraja II",
                isCorrect: false,
                next: 82
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "Fact:",
        text: "The Cholas developed significant maritime capabilities. Their naval expeditions helped them project power across the Bay of Bengal, particularly toward Southeast Asian trading centers.",
        choices: [
            {
                text: "NEXT",
                next: 83
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which body of water was especially important to Chola maritime expansion?",
        choices: [
            {
                text: "A. Mediterranean Sea",
                isCorrect: false,
                next: 84
            },
            {
                text: "B. Bay of Bengal",
                isCorrect: true,
                next: 84
            },
            {
                text: "C. Black Sea",
                isCorrect: false,
                next: 84
            },
            {
                text: "D. Red Sea",
                isCorrect: false,
                next: 84
            }
        ]
    },
    {
        chapter: "CHAPTER V",
        emoji: "🏝️ ",
        title: "📜 Fact:",
        text: "The Cholas conquered large parts of Sri Lanka at different points during their imperial period. Rajaraja I began major campaigns there, and Rajendra I continued Chola control.",
        choices: [
            {
                text: "NEXT",
                next: 86
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which island was invaded and partly controlled by the Cholas?",
        choices: [
            {
                text: "A. Java",
                isCorrect: false,
                next: 87
            },
            {
                text: "B. Madagascar",
                isCorrect: false,
                next: 87
            },
            {
                text: "C. Sicily",
                isCorrect: false,
                next: 87
            },
            {
                text: "D. Sri Lanka",
                isCorrect: true,
                next: 87
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "The Cholas developed sophisticated systems of local administration. Villages had assemblies that handled matters such as irrigation, land management and local affairs.",
        choices: [
            {
                text: "NEXT",
                next: 88
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "What was an important feature of Chola administration?",
        choices: [
            {
                text: "A. Village assemblies",
                isCorrect: true,
                next: 89
            },
            {
                text: "B. Roman senates",
                isCorrect: false,
                next: 89
            },
            {
                text: "C. Feudal castles",
                isCorrect: false,
                next: 89
            },
            {
                text: "D. Nomadic councils",
                isCorrect: false,
                next: 89
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Agriculture was the foundation of Chola wealth. The rulers invested in irrigation systems, reservoirs and canals, particularly in the fertile Kaveri delta.",
        choices: [
            {
                text: "NEXT",
                next: 90
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which river's fertile delta was central to Chola agriculture?",
        choices: [
            {
                text: "A. Kaveri",
                isCorrect: true,
                next: 91
            },
            {
                text: "B. Indus",
                isCorrect: false,
                next: 92
            },
            {
                text: "C. Narmada",
                isCorrect: false,
                next: 93
            },
            {
                text: "D. Yamuna",
                isCorrect: false,
                next: 93
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "Chola artists became famous for exquisite bronze sculptures, especially images of Shiva as Nataraja, the cosmic dancer.",
        choices: [
            {
                text: "NEXT",
                next: 92
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "Which deity is famously represented as Nataraja in Chola bronze sculpture?",
        choices: [
            {
                text: "A. Indra",
                isCorrect: false,
                next: 93
            },
            {
                text: "B. Vishnu",
                isCorrect: false,
                next: 93
            },
            {
                text: "C. Brahma",
                isCorrect: false,
                next: 93
            },
            {
                text: "D. Shiva",
                isCorrect: true,
                next: 93
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "📜 Fact:",
        text: "The Chola-period Nataraja represents Shiva performing the cosmic dance. The surrounding ring of flames symbolizes the cosmic cycle, while the figure beneath his foot represents ignorance in traditional interpretation.",
        choices: [
            {
                text: "NEXT",
                next: 94
            }
        ]
    },
    {
        chapter: "CHAPTER I",
        emoji: "⚖️ ",
        title: "❓ Quiz:",
        text: "What does Nataraja traditionally represent?",
        choices: [
            {
                text: "A. Shiva's cosmic dance",
                isCorrect: true,
                next: 95
            },
            {
                text: "B. Vishnu's ocean journey",
                isCorrect: false,
                next: 95
            },
            {
                text: "C. Indra's thunderbolt",
                isCorrect: false,
                next: 95
            },
            {
                text: "D. Brahma's creation of the Vedas",
                isCorrect: false,
                next: 95
            }
        ]
    }
];

function showScene() {
    const scene = scenes[currentScene];

    if (scene.background) {
        document.body.style.background = scene.background;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    } else {
        document.body.style.background = "radial-gradient(circle at center, #f8efd9, #d9c39b)";
    }

    document.getElementById("chapter").textContent = scene.chapter;
    document.getElementById("sceneEmoji").textContent = scene.emoji;
    document.getElementById("title").textContent = scene.title;
    document.getElementById("storytext").textContent = scene.text;

    const choices = document.getElementById("choices");
    choices.innerHTML = "";

    scene.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => makeChoice(index, button);
        choices.appendChild(button);
    });

    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.style.display = history.length > 0 ? "inline-block" : "none";
    }

    updateStats();
    updateHearts();
}

function makeChoice(index, clickedButton) {
    const choice = scenes[currentScene].choices[index];

    const allButtons = document.querySelectorAll("#choices button");
    allButtons.forEach(btn => btn.disabled = true);

    history.push({
        scene: currentScene,
        stats: { ...stats },
        lives: lives,
        score: score,
        streak: streak
    });

    if (choice.isCorrect !== undefined) {
        if (choice.isCorrect) {
            clickedButton.classList.add("choice-correct");
            streak++;
            const multiplier = streak >= 3 ? 2 : streak === 2 ? 1.5 : 1;
            score += Math.round(100 * multiplier);

            correctSound.currentTime = 0;
            correctSound.play().catch(() => { });

            lives = Math.min(maxLives, lives + 0.5);
            updateHearts("heart-pop");
        } else {
            clickedButton.classList.add("choice-wrong");
            streak = 0;

            wrongSound.currentTime = 0;
            wrongSound.play().catch(() => { });

            lives = Math.max(0, lives - 1);
            updateHearts("heart-shake");
        }
        updateScoreUI();
    }

    for (let stat in choice.effects) {
        stats[stat] += choice.effects[stat];
    }
    for (let stat in stats) {
        stats[stat] = Math.max(0, Math.min(100, stats[stat]));
    }

    currentScene = choice.next;
    const delay = choice.isCorrect !== undefined ? 700 : 0;

    setTimeout(() => {
        if (lives <= 0) {
            showGameOver();
        } else if (currentScene >= scenes.length) {
            showEnding();
        } else {
            showScene();
        }
    }, delay);
}

function updateStats() {
    const fields = ["integrity", "knowledge", "culture", "nature", "prosperity"];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.textContent = stats[f];
    });
}

function showEnding() {
    let values = Object.values(stats);
    let average = values.reduce((a, b) => a + b, 0) / values.length;
    let title;
    let text;

    const heartBonus = Math.round(lives * 200);
    const finalScore = score + heartBonus;

    let rankTitle = "Wandering Traveler";
    if (finalScore >= 2500) rankTitle = "👑 Royal Court Historian";
    else if (finalScore >= 1800) rankTitle = "📜 Senior Archaeologist";
    else if (finalScore >= 1000) rankTitle = "🏺 City Scribe";

    if (average >= 70) {
        title = "🌟 THE BALANCED LEGACY";
        text = `You discovered that civilization is not built by one person or one idea.\n\nProsperity, knowledge, culture, integrity and nature must grow together.\n\nYour journey has created a balanced legacy.`;
    } else if (stats.knowledge >= 70) {
        title = "📚 THE AGE OF KNOWLEDGE";
        text = `You chose learning and discovery.\n\nYour greatest legacy is knowledge passed from one generation to another.`;
    } else if (stats.culture >= 70) {
        title = "🪷 THE GUARDIAN OF HERITAGE";
        text = `You protected culture, craftsmanship and traditions.\n\nYour legacy lives through the people and their heritage.`;
    } else {
        title = "💎 Harappan Craftsmanship";
        text = `You focused on prosperity and the growth of your kingdom.\n\nYour legacy is one of progress and opportunity.`;
    }

    document.getElementById("chapter").textContent = "YOUR LEGACY";
    document.getElementById("sceneEmoji").textContent = "💎";
    document.getElementById("title").textContent = rankTitle + " - " + title;
    document.getElementById("storytext").textContent = `Final Score: ${finalScore} points (including +${heartBonus} heart bonus)!\n\n` + text;
    document.getElementById("choices").innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:12px;">
        <input id="playerName" type="text" value="${escapeHtml(playerName)}" placeholder="Enter your name" style="padding:10px; font-size:16px; border-radius:4px; border:1px solid #2b1b10;" />
        <button id="submitScoreBtn" type="button">Save to Leaderboard</button>
    </div>
    <button onclick="location.reload()">Begin Again</button>
`;

    document.getElementById("submitScoreBtn").onclick = () => {
        const nameInput = document.getElementById("playerName").value.trim() || playerName;
        submitScore(nameInput, finalScore, rankTitle);
    };
    updateStats();
}

function showGameOver() {
    document.getElementById("chapter").textContent = "DEFEAT";
    document.getElementById("sceneEmoji").textContent = "💀";
    document.getElementById("title").textContent = "Journey Ended";
    document.getElementById("storytext").textContent = "You ran out of lives! The mysteries of the past remain unsolved.";
    document.getElementById("choices").innerHTML = `
        <button onclick="startGameAt(currentScene)">🔄 Retry This Scene</button>
        <button onclick="returnToMainMenu()">🏛️ Choose Another Era</button>
    `;
}

/*
    AUDIO CONTROLLER
*/
let musicWanted = true;
const bgmAudio = document.getElementById("bgmAudio");

function updateMusicUI(isPlaying) {
    const btn = document.getElementById("bgmToggle");
    if (!btn) return;
    btn.textContent = isPlaying ? "🔊 Music: On" : "🔇 Music: Off";
    btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
}

if (bgmAudio) {
    bgmAudio.volume = 0.3;
    bgmAudio.addEventListener("play", () => updateMusicUI(true));
    bgmAudio.addEventListener("pause", () => updateMusicUI(false));
}

function playAudio() {
    if (!bgmAudio) return;
    bgmAudio.play().catch(() => {
        updateMusicUI(false);
    });
}

function toggleAudioFile() {
    if (!bgmAudio) return;

    if (bgmAudio.paused) {
        musicWanted = true;
        playAudio();
    } else {
        musicWanted = false;
        bgmAudio.pause();
    }
}

// Initial Autoplay attempt
playAudio();

// Unlock on first user gesture if browser prevented autoplay
window.addEventListener("click", () => {
    if (bgmAudio && bgmAudio.paused && musicWanted) {
        playAudio();
    }
}, { once: true });

function goBack() {
    if (history.length === 0) return;

    const previousState = history.pop();
    currentScene = previousState.scene;
    stats = { ...previousState.stats };
    lives = previousState.lives;
    score = previousState.score;
    streak = previousState.streak;

    updateScoreUI();
    showScene();
}

function updateScoreUI() {
    const scoreElem = document.getElementById("scoreValue");
    if (scoreElem) scoreElem.textContent = score;
}

function startGameAt(startingIndex) {
    currentScene = startingIndex;
    history = [];
    lives = 3.0;

    // Hide all overlay screens
    const screens = ["landingScreen", "nameScreen", "startScreen"];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    if (musicWanted && bgmAudio && bgmAudio.paused) {
        playAudio();
    }

    showScene();
}

function returnToMainMenu() {
    const startScreen = document.getElementById("startScreen");
    if (startScreen) {
        startScreen.style.display = "flex";
    }
}

showScene();
async function submitScore(playerName, finalScore, rankTitle) {
    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: playerName, score: finalScore, rankTitle })
        });
        const data = await response.json();
        alert('Score saved to leaderboard!');
    } catch (err) {
        console.error('Failed to submit score:', err);
    }
}
async function openLeaderboard() {
    const modal = document.getElementById("leaderboardModal");
    const tbody = document.getElementById("leaderboardBody");
    if (!modal || !tbody) return;

    modal.style.display = "flex";
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Fetching records...</td></tr>`;

    try {
        const res = await fetch("/api/leaderboard");
        const scores = await res.json();

        if (!scores || scores.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No records yet. Be the first!</td></tr>`;
            return;
        }

        tbody.innerHTML = scores.map((entry, index) => {
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`;
            return `
                <tr>
                    <td><strong>${medal}</strong></td>
                    <td>${escapeHtml(entry.name)}</td>
                    <td><small>${escapeHtml(entry.rankTitle || 'Scholar')}</small></td>
                    <td><strong>${entry.score}</strong></td>
                </tr>
            `;
        }).join("");
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Failed to load leaderboard.</td></tr>`;
    }
}

function closeLeaderboard() {
    const modal = document.getElementById("leaderboardModal");
    if (modal) modal.style.display = "none";
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
} let playerName = "Traveler";

function goToNameScreen() {
    const landing = document.getElementById("landingScreen");
    const nameScreen = document.getElementById("nameScreen");

    if (landing) landing.style.display = "none";
    if (nameScreen) {
        nameScreen.style.display = "flex";
        const input = document.getElementById("travelerNameInput");
        if (input) input.focus();
    }
}

function saveNameAndShowTimeline(e) {
    if (e) e.preventDefault();

    const input = document.getElementById("travelerNameInput");
    const val = input ? input.value.trim() : "";
    if (val) {
        playerName = val;
    }

    const nameScreen = document.getElementById("nameScreen");
    const timelineScreen = document.getElementById("startScreen");
    const welcomeUser = document.getElementById("welcomeUserText");

    if (welcomeUser) {
        welcomeUser.textContent = `Welcome, ${playerName}! Choose an era to begin your journey:`;
    }

    if (nameScreen) nameScreen.style.display = "none";
    if (timelineScreen) timelineScreen.style.display = "flex";
}
