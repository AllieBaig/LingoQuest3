import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, User, Crown, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RewardData {
  type: "boxOffice" | "directors" | "heroes";
  data: any;
}

interface HollyBollyRewardProps {
  reward: RewardData | null;
  isOpen: boolean;
  onClose: () => void;
  consecutiveCorrect: number;
}

export default function HollyBollyReward({ reward, isOpen, onClose, consecutiveCorrect }: HollyBollyRewardProps) {
  if (!reward) return null;

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "boxOffice":
        return <DollarSign className="h-8 w-8 text-green-600" />;
      case "directors":
        return <User className="h-8 w-8 text-blue-600" />;
      case "heroes":
        return <Crown className="h-8 w-8 text-yellow-600" />;
      default:
        return <Trophy className="h-8 w-8 text-purple-600" />;
    }
  };

  const getRewardTitle = (type: string) => {
    switch (type) {
      case "boxOffice":
        return "Box Office Earnings Revealed!";
      case "directors":
        return "Directors' Net Worth Revealed!";
      case "heroes":
        return "Heroes' Net Worth Revealed!";
      default:
        return "Reward Unlocked!";
    }
  };

  const renderBoxOfficeData = (data: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
        <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center">
          🎬 Hollywood
        </h4>
        <div className="space-y-2">
          <p className="text-lg"><strong>Budget:</strong> {data.hollywood.budget}</p>
          <p className="text-lg"><strong>Worldwide:</strong> {data.hollywood.worldwide}</p>
        </div>
      </div>
      <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
        <h4 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
          🎭 Bollywood
        </h4>
        <div className="space-y-2">
          <p className="text-lg"><strong>Budget:</strong> {data.bollywood.budget}</p>
          <p className="text-lg"><strong>Worldwide:</strong> {data.bollywood.worldwide}</p>
        </div>
      </div>
    </div>
  );

  const renderDirectorsData = (data: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
        <h4 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
          🎬 Hollywood Director
        </h4>
        <div className="space-y-2">
          <p className="text-lg"><strong>Name:</strong> {data.hollywood.name}</p>
          <p className="text-lg"><strong>Net Worth:</strong> {data.hollywood.netWorth}</p>
          <p className="text-sm text-gray-600">As of {data.hollywood.year}</p>
        </div>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
        <h4 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
          🎭 Bollywood Director
        </h4>
        <div className="space-y-2">
          <p className="text-lg"><strong>Name:</strong> {data.bollywood.name}</p>
          <p className="text-lg"><strong>Net Worth:</strong> {data.bollywood.netWorth}</p>
          <p className="text-sm text-gray-600">As of {data.bollywood.year}</p>
        </div>
      </div>
    </div>
  );

  const renderHeroesData = (data: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
        <h4 className="text-xl font-bold text-yellow-700 mb-4 flex items-center">
          ⭐ Hollywood Hero
        </h4>
        <div className="space-y-2">
          <p className="text-lg"><strong>Name:</strong> {data.hollywood.name}</p>
          <p className="text-lg"><strong>Net Worth:</strong> {data.hollywood.netWorth}</p>
          <p className="text-sm text-gray-600">As of {data.hollywood.year}</p>
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
        <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center">
          ⭐ Bollywood Hero
        </h4>
        <div className="space-y-2">
          <p className="text-lg"><strong>Name:</strong> {data.bollywood.name}</p>
          <p className="text-lg"><strong>Net Worth:</strong> {data.bollywood.netWorth}</p>
          <p className="text-sm text-gray-600">As of {data.bollywood.year}</p>
        </div>
      </div>
    </div>
  );

  const renderRewardContent = () => {
    switch (reward.type) {
      case "boxOffice":
        return renderBoxOfficeData(reward.data);
      case "directors":
        return renderDirectorsData(reward.data);
      case "heroes":
        return renderHeroesData(reward.data);
      default:
        return <p>Unknown reward type</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center justify-center">
            {getRewardIcon(reward.type)}
            <span className="ml-3">{getRewardTitle(reward.type)}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-yellow-300">
            <p className="text-xl font-bold text-yellow-800">
              🔥 {consecutiveCorrect} Correct Answers in a Row! 🔥
            </p>
          </div>
          
          {renderRewardContent()}
          
          <div className="text-center text-lg text-gray-600">
            <p>Keep answering correctly to unlock more rewards!</p>
            <p className="text-sm mt-2">
              1 correct = Box Office • 2 correct = Directors • 3+ correct = Heroes
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}