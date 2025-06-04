interface CurrentLetterProps {
  letter: string;
}

export default function CurrentLetter({ letter }: CurrentLetterProps) {
  return (
    <div className="senior-card border-2 border-primary mb-8">
      <div className="text-center">
        <p className="text-2xl text-gray-600 mb-4">Current Letter</p>
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold text-white">{letter}</span>
        </div>
        <p className="text-xl text-gray-600">Find words starting with this letter!</p>
      </div>
    </div>
  );
}
