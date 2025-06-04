// HollyBolly game mode data - Hollywood inspired Bollywood movies
export interface HollyBollyMovie {
  id: string;
  hollywoodTitle: string;
  bollywoodTitle: string;
  place: string;
  animal: string;
  thing: string;
  boxOffice: {
    hollywood: {
      budget: string;
      worldwide: string;
    };
    bollywood: {
      budget: string;
      worldwide: string;
    };
  };
  directors: {
    hollywood: {
      name: string;
      netWorth: string;
      year: number;
    };
    bollywood: {
      name: string;
      netWorth: string;
      year: number;
    };
  };
  heroes: {
    hollywood: {
      name: string;
      netWorth: string;
      year: number;
    };
    bollywood: {
      name: string;
      netWorth: string;
      year: number;
    };
  };
}

export const hollyBollyMovies: HollyBollyMovie[] = [
  {
    id: "lion_king_jungle",
    hollywoodTitle: "The Lion King",
    bollywoodTitle: "The Jungle Book",
    place: "African Savanna",
    animal: "Lion",
    thing: "Crown",
    boxOffice: {
      hollywood: {
        budget: "$45 million",
        worldwide: "$968.5 million"
      },
      bollywood: {
        budget: "₹52 crores",
        worldwide: "₹340 crores"
      }
    },
    directors: {
      hollywood: {
        name: "Roger Allers & Rob Minkoff",
        netWorth: "$50 million",
        year: 2019
      },
      bollywood: {
        name: "Jon Favreau",
        netWorth: "$100 million",
        year: 2019
      }
    },
    heroes: {
      hollywood: {
        name: "Matthew Broderick (Voice)",
        netWorth: "$45 million",
        year: 2020
      },
      bollywood: {
        name: "Neel Sethi",
        netWorth: "$2 million",
        year: 2020
      }
    }
  },
  {
    id: "titanic_dilwale",
    hollywoodTitle: "Titanic",
    bollywoodTitle: "Dilwale Dulhania Le Jayenge",
    place: "Ship Deck",
    animal: "Horse",
    thing: "Heart Necklace",
    boxOffice: {
      hollywood: {
        budget: "$200 million",
        worldwide: "$2.2 billion"
      },
      bollywood: {
        budget: "₹4 crores",
        worldwide: "₹100 crores"
      }
    },
    directors: {
      hollywood: {
        name: "James Cameron",
        netWorth: "$700 million",
        year: 2020
      },
      bollywood: {
        name: "Aditya Chopra",
        netWorth: "$50 million",
        year: 2020
      }
    },
    heroes: {
      hollywood: {
        name: "Leonardo DiCaprio",
        netWorth: "$260 million",
        year: 2020
      },
      bollywood: {
        name: "Shah Rukh Khan",
        netWorth: "$600 million",
        year: 2020
      }
    }
  },
  {
    id: "avatar_baahubali",
    hollywoodTitle: "Avatar",
    bollywoodTitle: "Baahubali",
    place: "Waterfall",
    animal: "Elephant",
    thing: "Magical Tree",
    boxOffice: {
      hollywood: {
        budget: "$237 million",
        worldwide: "$2.9 billion"
      },
      bollywood: {
        budget: "₹180 crores",
        worldwide: "₹650 crores"
      }
    },
    directors: {
      hollywood: {
        name: "James Cameron",
        netWorth: "$700 million",
        year: 2020
      },
      bollywood: {
        name: "S.S. Rajamouli",
        netWorth: "$25 million",
        year: 2020
      }
    },
    heroes: {
      hollywood: {
        name: "Sam Worthington",
        netWorth: "$8 million",
        year: 2020
      },
      bollywood: {
        name: "Prabhas",
        netWorth: "$30 million",
        year: 2020
      }
    }
  },
  {
    id: "batman_krrish",
    hollywoodTitle: "Batman Begins",
    bollywoodTitle: "Krrish",
    place: "Gotham City",
    animal: "Bat",
    thing: "Black Cape",
    boxOffice: {
      hollywood: {
        budget: "$150 million",
        worldwide: "$375 million"
      },
      bollywood: {
        budget: "₹40 crores",
        worldwide: "₹125 crores"
      }
    },
    directors: {
      hollywood: {
        name: "Christopher Nolan",
        netWorth: "$250 million",
        year: 2020
      },
      bollywood: {
        name: "Rakesh Roshan",
        netWorth: "$15 million",
        year: 2020
      }
    },
    heroes: {
      hollywood: {
        name: "Christian Bale",
        netWorth: "$120 million",
        year: 2020
      },
      bollywood: {
        name: "Hrithik Roshan",
        netWorth: "$45 million",
        year: 2020
      }
    }
  },
  {
    id: "matrix_ra_one",
    hollywoodTitle: "The Matrix",
    bollywoodTitle: "Ra.One",
    place: "Virtual World",
    animal: "Octopus",
    thing: "Red Pill",
    boxOffice: {
      hollywood: {
        budget: "$63 million",
        worldwide: "$467 million"
      },
      bollywood: {
        budget: "₹150 crores",
        worldwide: "₹240 crores"
      }
    },
    directors: {
      hollywood: {
        name: "The Wachowskis",
        netWorth: "$250 million",
        year: 2019
      },
      bollywood: {
        name: "Anubhav Sinha",
        netWorth: "$8 million",
        year: 2019
      }
    },
    heroes: {
      hollywood: {
        name: "Keanu Reeves",
        netWorth: "$380 million",
        year: 2020
      },
      bollywood: {
        name: "Shah Rukh Khan",
        netWorth: "$600 million",
        year: 2020
      }
    }
  },
  {
    id: "spiderman_flying_jatt",
    hollywoodTitle: "Spider-Man",
    bollywoodTitle: "A Flying Jatt",
    place: "New York City",
    animal: "Spider",
    thing: "Web Shooter",
    boxOffice: {
      hollywood: {
        budget: "$139 million",
        worldwide: "$825 million"
      },
      bollywood: {
        budget: "₹45 crores",
        worldwide: "₹65 crores"
      }
    },
    directors: {
      hollywood: {
        name: "Sam Raimi",
        netWorth: "$60 million",
        year: 2020
      },
      bollywood: {
        name: "Remo D'Souza",
        netWorth: "$5 million",
        year: 2020
      }
    },
    heroes: {
      hollywood: {
        name: "Tobey Maguire",
        netWorth: "$75 million",
        year: 2020
      },
      bollywood: {
        name: "Tiger Shroff",
        netWorth: "$10 million",
        year: 2020
      }
    }
  },
  {
    id: "gladiator_lagaan",
    hollywoodTitle: "Gladiator",
    bollywoodTitle: "Lagaan",
    place: "Colosseum",
    animal: "Tiger",
    thing: "Sword",
    boxOffice: {
      hollywood: {
        budget: "$103 million",
        worldwide: "$460 million"
      },
      bollywood: {
        budget: "₹25 crores",
        worldwide: "₹65 crores"
      }
    },
    directors: {
      hollywood: {
        name: "Ridley Scott",
        netWorth: "$400 million",
        year: 2020
      },
      bollywood: {
        name: "Ashutosh Gowariker",
        netWorth: "$12 million",
        year: 2020
      }
    },
    heroes: {
      hollywood: {
        name: "Russell Crowe",
        netWorth: "$100 million",
        year: 2020
      },
      bollywood: {
        name: "Aamir Khan",
        netWorth: "$225 million",
        year: 2020
      }
    }
  },
  {
    id: "finding_nemo_taare",
    hollywoodTitle: "Finding Nemo",
    bollywoodTitle: "Taare Zameen Par",
    place: "Ocean",
    animal: "Fish",
    thing: "School Bag",
    boxOffice: {
      hollywood: {
        budget: "$94 million",
        worldwide: "$940 million"
      },
      bollywood: {
        budget: "₹12 crores",
        worldwide: "₹85 crores"
      }
    },
    directors: {
      hollywood: {
        name: "Andrew Stanton",
        netWorth: "$40 million",
        year: 2020
      },
      bollywood: {
        name: "Aamir Khan",
        netWorth: "$225 million",
        year: 2020
      }
    },
    heroes: {
      hollywood: {
        name: "Albert Brooks (Voice)",
        netWorth: "$30 million",
        year: 2020
      },
      bollywood: {
        name: "Darsheel Safary",
        netWorth: "$2 million",
        year: 2020
      }
    }
  }
];

export interface HollyBollyQuestion {
  id: string;
  question: string;
  movieData: HollyBollyMovie;
  type: 'place' | 'animal' | 'thing';
  choices: string[];
  correctAnswer: string;
}

export function generateHollyBollyQuestion(movie: HollyBollyMovie, difficulty: string): HollyBollyQuestion {
  const types: ('place' | 'animal' | 'thing')[] = ['place', 'animal', 'thing'];
  const selectedType = types[Math.floor(Math.random() * types.length)];
  
  let question: string;
  let correctAnswer: string;
  let wrongAnswers: string[];
  
  switch (selectedType) {
    case 'place':
      question = `In which location do both "${movie.hollywoodTitle}" and "${movie.bollywoodTitle}" have significant scenes?`;
      correctAnswer = movie.place;
      wrongAnswers = ['Desert Oasis', 'Mountain Peak', 'City Square', 'Forest Clearing'];
      break;
    case 'animal':
      question = `Which animal is prominently featured in both "${movie.hollywoodTitle}" and "${movie.bollywoodTitle}"?`;
      correctAnswer = movie.animal;
      wrongAnswers = ['Eagle', 'Wolf', 'Bear', 'Dolphin'];
      break;
    case 'thing':
      question = `What important object/thing connects the stories of "${movie.hollywoodTitle}" and "${movie.bollywoodTitle}"?`;
      correctAnswer = movie.thing;
      wrongAnswers = ['Golden Ring', 'Magic Lamp', 'Crystal Ball', 'Silver Coin'];
      break;
  }
  
  // Filter out the correct answer from wrong answers
  wrongAnswers = wrongAnswers.filter(answer => answer !== correctAnswer);
  
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
  const shuffledChoices = allChoices.sort(() => 0.5 - Math.random());
  
  return {
    id: `${movie.id}_${selectedType}`,
    question,
    movieData: movie,
    type: selectedType,
    choices: shuffledChoices,
    correctAnswer
  };
}

export function getRandomHollyBollyMovies(count: number): HollyBollyMovie[] {
  const shuffled = [...hollyBollyMovies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, hollyBollyMovies.length));
}