// Question bank for LingoQuest MCQ game
export interface Question {
  id: string;
  category: string;
  question: string;
  correctAnswer: {
    english: string;
    spanish: string;
    french: string;
    german: string;
    italian: string;
    portuguese: string;
  };
  wrongAnswers: {
    english: string[];
    spanish: string[];
    french: string[];
    german: string[];
    italian: string[];
    portuguese: string[];
  };
}

export const questionBank: Question[] = [
  {
    id: "colors_1",
    category: "Colors",
    question: "What color do you get when you mix red and yellow?",
    correctAnswer: {
      english: "Orange",
      spanish: "Naranja",
      french: "Orange",
      german: "Orange",
      italian: "Arancione",
      portuguese: "Laranja"
    },
    wrongAnswers: {
      english: ["Purple", "Green", "Pink"],
      spanish: ["Púrpura", "Verde", "Rosa"],
      french: ["Violet", "Vert", "Rose"],
      german: ["Lila", "Grün", "Rosa"],
      italian: ["Viola", "Verde", "Rosa"],
      portuguese: ["Roxo", "Verde", "Rosa"]
    }
  },
  {
    id: "animals_1",
    category: "Animals",
    question: "Which animal is known as the 'King of the Jungle'?",
    correctAnswer: {
      english: "Lion",
      spanish: "León",
      french: "Lion",
      german: "Löwe",
      italian: "Leone",
      portuguese: "Leão"
    },
    wrongAnswers: {
      english: ["Tiger", "Elephant", "Bear"],
      spanish: ["Tigre", "Elefante", "Oso"],
      french: ["Tigre", "Éléphant", "Ours"],
      german: ["Tiger", "Elefant", "Bär"],
      italian: ["Tigre", "Elefante", "Orso"],
      portuguese: ["Tigre", "Elefante", "Urso"]
    }
  },
  {
    id: "food_1",
    category: "Food",
    question: "What fruit is traditionally used to make wine?",
    correctAnswer: {
      english: "Grapes",
      spanish: "Uvas",
      french: "Raisins",
      german: "Trauben",
      italian: "Uva",
      portuguese: "Uvas"
    },
    wrongAnswers: {
      english: ["Apples", "Oranges", "Bananas"],
      spanish: ["Manzanas", "Naranjas", "Plátanos"],
      french: ["Pommes", "Oranges", "Bananes"],
      german: ["Äpfel", "Orangen", "Bananen"],
      italian: ["Mele", "Arance", "Banane"],
      portuguese: ["Maçãs", "Laranjas", "Bananas"]
    }
  },
  {
    id: "nature_1",
    category: "Nature",
    question: "What do bees collect from flowers?",
    correctAnswer: {
      english: "Nectar",
      spanish: "Néctar",
      french: "Nectar",
      german: "Nektar",
      italian: "Nettare",
      portuguese: "Néctar"
    },
    wrongAnswers: {
      english: ["Pollen", "Water", "Leaves"],
      spanish: ["Polen", "Agua", "Hojas"],
      french: ["Pollen", "Eau", "Feuilles"],
      german: ["Pollen", "Wasser", "Blätter"],
      italian: ["Polline", "Acqua", "Foglie"],
      portuguese: ["Pólen", "Água", "Folhas"]
    }
  },
  {
    id: "body_1",
    category: "Human Body",
    question: "How many bones are in an adult human body?",
    correctAnswer: {
      english: "206",
      spanish: "206",
      french: "206",
      german: "206",
      italian: "206",
      portuguese: "206"
    },
    wrongAnswers: {
      english: ["186", "226", "246"],
      spanish: ["186", "226", "246"],
      french: ["186", "226", "246"],
      german: ["186", "226", "246"],
      italian: ["186", "226", "246"],
      portuguese: ["186", "226", "246"]
    }
  },
  {
    id: "geography_1",
    category: "Geography",
    question: "What is the largest ocean on Earth?",
    correctAnswer: {
      english: "Pacific",
      spanish: "Pacífico",
      french: "Pacifique",
      german: "Pazifik",
      italian: "Pacifico",
      portuguese: "Pacífico"
    },
    wrongAnswers: {
      english: ["Atlantic", "Indian", "Arctic"],
      spanish: ["Atlántico", "Índico", "Ártico"],
      french: ["Atlantique", "Indien", "Arctique"],
      german: ["Atlantik", "Indisch", "Arktis"],
      italian: ["Atlantico", "Indiano", "Artico"],
      portuguese: ["Atlântico", "Índico", "Ártico"]
    }
  },
  {
    id: "seasons_1",
    category: "Seasons",
    question: "Which season comes after winter?",
    correctAnswer: {
      english: "Spring",
      spanish: "Primavera",
      french: "Printemps",
      german: "Frühling",
      italian: "Primavera",
      portuguese: "Primavera"
    },
    wrongAnswers: {
      english: ["Summer", "Autumn", "Fall"],
      spanish: ["Verano", "Otoño", "Caída"],
      french: ["Été", "Automne", "Chute"],
      german: ["Sommer", "Herbst", "Fall"],
      italian: ["Estate", "Autunno", "Caduta"],
      portuguese: ["Verão", "Outono", "Queda"]
    }
  },
  {
    id: "transportation_1",
    category: "Transportation",
    question: "What vehicle travels on tracks?",
    correctAnswer: {
      english: "Train",
      spanish: "Tren",
      french: "Train",
      german: "Zug",
      italian: "Treno",
      portuguese: "Trem"
    },
    wrongAnswers: {
      english: ["Car", "Bus", "Plane"],
      spanish: ["Coche", "Autobús", "Avión"],
      french: ["Voiture", "Bus", "Avion"],
      german: ["Auto", "Bus", "Flugzeug"],
      italian: ["Auto", "Autobus", "Aereo"],
      portuguese: ["Carro", "Ônibus", "Avião"]
    }
  },
  {
    id: "time_1",
    category: "Time",
    question: "How many hours are in a day?",
    correctAnswer: {
      english: "24",
      spanish: "24",
      french: "24",
      german: "24",
      italian: "24",
      portuguese: "24"
    },
    wrongAnswers: {
      english: ["20", "25", "30"],
      spanish: ["20", "25", "30"],
      french: ["20", "25", "30"],
      german: ["20", "25", "30"],
      italian: ["20", "25", "30"],
      portuguese: ["20", "25", "30"]
    }
  },
  {
    id: "weather_1",
    category: "Weather",
    question: "What do you see in the sky during a thunderstorm?",
    correctAnswer: {
      english: "Lightning",
      spanish: "Relámpago",
      french: "Éclair",
      german: "Blitz",
      italian: "Fulmine",
      portuguese: "Relâmpago"
    },
    wrongAnswers: {
      english: ["Rainbow", "Stars", "Airplane"],
      spanish: ["Arcoíris", "Estrellas", "Avión"],
      french: ["Arc-en-ciel", "Étoiles", "Avion"],
      german: ["Regenbogen", "Sterne", "Flugzeug"],
      italian: ["Arcobaleno", "Stelle", "Aereo"],
      portuguese: ["Arco-íris", "Estrelas", "Avião"]
    }
  },
  {
    id: "family_1",
    category: "Family",
    question: "What do you call your mother's sister?",
    correctAnswer: {
      english: "Aunt",
      spanish: "Tía",
      french: "Tante",
      german: "Tante",
      italian: "Zia",
      portuguese: "Tia"
    },
    wrongAnswers: {
      english: ["Uncle", "Cousin", "Sister"],
      spanish: ["Tío", "Prima", "Hermana"],
      french: ["Oncle", "Cousine", "Sœur"],
      german: ["Onkel", "Cousine", "Schwester"],
      italian: ["Zio", "Cugina", "Sorella"],
      portuguese: ["Tio", "Prima", "Irmã"]
    }
  },
  {
    id: "numbers_1",
    category: "Numbers",
    question: "What comes after nine?",
    correctAnswer: {
      english: "Ten",
      spanish: "Diez",
      french: "Dix",
      german: "Zehn",
      italian: "Dieci",
      portuguese: "Dez"
    },
    wrongAnswers: {
      english: ["Eleven", "Eight", "Seven"],
      spanish: ["Once", "Ocho", "Siete"],
      french: ["Onze", "Huit", "Sept"],
      german: ["Elf", "Acht", "Sieben"],
      italian: ["Undici", "Otto", "Sette"],
      portuguese: ["Onze", "Oito", "Sete"]
    }
  },
  {
    id: "sports_1",
    category: "Sports",
    question: "In which sport do you use a racket and a shuttlecock?",
    correctAnswer: {
      english: "Badminton",
      spanish: "Bádminton",
      french: "Badminton",
      german: "Badminton",
      italian: "Badminton",
      portuguese: "Badminton"
    },
    wrongAnswers: {
      english: ["Tennis", "Squash", "Ping Pong"],
      spanish: ["Tenis", "Squash", "Ping Pong"],
      french: ["Tennis", "Squash", "Ping-Pong"],
      german: ["Tennis", "Squash", "Tischtennis"],
      italian: ["Tennis", "Squash", "Ping Pong"],
      portuguese: ["Tênis", "Squash", "Ping Pong"]
    }
  },
  {
    id: "music_1",
    category: "Music",
    question: "How many strings does a standard guitar have?",
    correctAnswer: {
      english: "Six",
      spanish: "Seis",
      french: "Six",
      german: "Sechs",
      italian: "Sei",
      portuguese: "Seis"
    },
    wrongAnswers: {
      english: ["Four", "Five", "Seven"],
      spanish: ["Cuatro", "Cinco", "Siete"],
      french: ["Quatre", "Cinq", "Sept"],
      german: ["Vier", "Fünf", "Sieben"],
      italian: ["Quattro", "Cinque", "Sette"],
      portuguese: ["Quatro", "Cinco", "Sete"]
    }
  },
  {
    id: "household_1",
    category: "Household",
    question: "What appliance keeps food cold?",
    correctAnswer: {
      english: "Refrigerator",
      spanish: "Refrigerador",
      french: "Réfrigérateur",
      german: "Kühlschrank",
      italian: "Frigorifero",
      portuguese: "Geladeira"
    },
    wrongAnswers: {
      english: ["Oven", "Microwave", "Toaster"],
      spanish: ["Horno", "Microondas", "Tostadora"],
      french: ["Four", "Micro-ondes", "Grille-pain"],
      german: ["Ofen", "Mikrowelle", "Toaster"],
      italian: ["Forno", "Microonde", "Tostapane"],
      portuguese: ["Forno", "Microondas", "Torradeira"]
    }
  }
];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questionBank.length));
}

export function generateChoices(question: Question, language: string, difficulty: string): string[] {
  const correctAnswer = question.correctAnswer[language as keyof typeof question.correctAnswer];
  const wrongAnswers = question.wrongAnswers[language as keyof typeof question.wrongAnswers];
  
  let choiceCount: number;
  switch (difficulty) {
    case 'easy':
      choiceCount = 2;
      break;
    case 'medium':
      choiceCount = 3;
      break;
    case 'hard':
      choiceCount = 4;
      break;
    default:
      choiceCount = 3;
  }
  
  const selectedWrongAnswers = wrongAnswers
    .sort(() => 0.5 - Math.random())
    .slice(0, choiceCount - 1);
  
  const allChoices = [correctAnswer, ...selectedWrongAnswers];
  return allChoices.sort(() => 0.5 - Math.random());
}