# LingoQuest - Senior-Friendly MCQ Word Game

A Progressive Web App (PWA) designed specifically for seniors, featuring large UI elements, dynamic scaling, and two engaging game modes.

## Features

### Game Modes
- **General Knowledge**: Multilingual MCQ questions about colors, animals, food, nature, and everyday topics
- **HollyBolly**: Hollywood-inspired Bollywood movie questions with authentic historical data and rewards

### Senior-Friendly Design
- Large buttons (minimum 72px touch targets)
- Dynamic font scaling based on screen size
- High contrast mode support
- Keyboard navigation with visible focus indicators
- Reduced motion preferences support
- Clear visual feedback and accessible design

### HollyBolly Reward System
- **1 Correct Answer**: Box office earnings (Hollywood vs Bollywood)
- **2 Correct in a Row**: Directors' net worth comparison
- **3+ Correct in a Row**: Lead actors' net worth comparison

## Game Features
- Three difficulty levels (Easy: 2 choices, Medium: 3 choices, Hard: 4 choices)
- Timer-based rounds (configurable from 2-5 minutes)
- Score tracking and high score leaderboard
- Customizable number of rounds (5-20)
- PWA support for mobile installation

## Technology Stack
- **Frontend**: React 18, TypeScript, TailwindCSS, Wouter (routing)
- **Backend**: Express.js, TypeScript
- **Database**: In-memory storage (easily upgradeable to PostgreSQL)
- **UI Components**: shadcn/ui with senior-friendly customizations
- **State Management**: TanStack React Query
- **Forms**: React Hook Form with Zod validation

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lingoquest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── pages/          # Route components
│   └── public/             # Static assets and PWA files
├── server/                 # Backend Express application
│   ├── hollybolly-data.ts  # Movie data with historical information
│   ├── question-bank.ts    # General knowledge questions
│   ├── routes.ts           # API endpoints
│   └── storage.ts          # Data storage interface
└── shared/                 # Shared types and schemas
    └── schema.ts           # Database schema and validation
```

## HollyBolly Movie Data

The game includes authentic historical data for popular Hollywood-Bollywood movie pairs:
- Titanic vs Dilwale Dulhania Le Jayenge
- Avatar vs Baahubali
- The Lion King vs The Jungle Book
- Batman Begins vs Krrish
- The Matrix vs Ra.One
- And more...

All box office figures, director net worth, and actor net worth data is based on historical records up to 2020.

## Accessibility Features

- WCAG 2.1 AA compliant design
- Screen reader announcements for game events
- Keyboard navigation support
- High contrast mode
- Large touch targets for motor accessibility
- Reduced motion support for vestibular sensitivity

## PWA Features

- Offline capability with service worker
- Mobile app installation
- Responsive design for all screen sizes
- Touch-friendly interface

## API Endpoints

- `POST /api/game/session` - Create new game session
- `GET /api/game/session/:id` - Get game session details
- `GET /api/game/session/:id/question` - Get next question
- `POST /api/game/session/:id/submit` - Submit answer
- `POST /api/game/session/:id/skip` - Skip question
- `GET /api/scores` - Get high scores
- `POST /api/scores` - Save high score

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Movie data sourced from public box office records and industry reports
- UI components built with shadcn/ui
- Icons from Lucide React
- Accessibility guidelines from WCAG 2.1