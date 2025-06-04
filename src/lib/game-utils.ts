export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getRandomLetter(): string {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

export function validateAnswer(answer: string, letter: string): boolean {
  if (!answer || !letter) return false;
  return answer.toLowerCase().trim().startsWith(letter.toLowerCase());
}

export function calculateScore(answers: Record<string, string>, letter: string): Record<string, number> {
  const scores: Record<string, number> = {};
  
  Object.entries(answers).forEach(([category, answer]) => {
    scores[category] = validateAnswer(answer, letter) ? 10 : 0;
  });
  
  return scores;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getTimeWarningLevel(timeLeft: number): 'normal' | 'warning' | 'critical' {
  if (timeLeft <= 10) return 'critical';
  if (timeLeft <= 30) return 'warning';
  return 'normal';
}

export function getGradeFeedback(score: number, maxScore: number): { grade: string; message: string; color: string } {
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 90) {
    return { grade: "Excellent!", message: "Outstanding performance!", color: "text-green-600" };
  } else if (percentage >= 70) {
    return { grade: "Great!", message: "Well done!", color: "text-blue-600" };
  } else if (percentage >= 50) {
    return { grade: "Good!", message: "Nice effort!", color: "text-yellow-600" };
  } else {
    return { grade: "Keep trying!", message: "Practice makes perfect!", color: "text-orange-600" };
  }
}

// PWA installation helpers
export function isPWAInstallable(): boolean {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
}

export function registerServiceWorker(): Promise<ServiceWorkerRegistration | undefined> {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.register('/sw.js');
  }
  return Promise.resolve(undefined);
}

// Accessibility helpers
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Senior-friendly helpers
export function adjustFontSize(increase: boolean = true): void {
  const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const newSize = increase ? Math.min(currentSize + 2, 24) : Math.max(currentSize - 2, 14);
  document.documentElement.style.fontSize = `${newSize}px`;
}

export function toggleHighContrast(): void {
  document.documentElement.classList.toggle('high-contrast');
}

export function enableLargeButtons(): void {
  document.documentElement.classList.add('large-buttons');
}
