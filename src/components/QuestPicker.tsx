import React, { useState } from 'react';
import { Quest, Quester } from '../types';
import { Sword, Users, X } from 'lucide-react';

interface QuestPickerProps {
  quests: Quest[];
  questers: Quester[];
  onCompleteQuest: (questId: string, participants: string[]) => void;
  onClose: () => void;
}

export function QuestPicker({ quests, questers, onCompleteQuest, onClose }: QuestPickerProps) {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const handleCompleteQuest = () => {
    if (selectedQuest && selectedParticipants.length > 0) {
      onCompleteQuest(selectedQuest.id, selectedParticipants);
      onClose();
    }
  };

  if (selectedQuest) {
    return (
      <div className="pixel-panel">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pixel text-xl text-amber-400">Who completed this quest?</h2>
          <button
            onClick={onClose}
            className="p-2 text-amber-400 hover:bg-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4 mb-6">
          {questers.map(quester => (
            <label
              key={quester.id}
              className="flex items-center gap-3 p-3 bg-slate-700 pixel-corners cursor-pointer hover:bg-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedParticipants.includes(quester.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedParticipants([...selectedParticipants, quester.id]);
                  } else {
                    setSelectedParticipants(selectedParticipants.filter(id => id !== quester.id));
                  }
                }}
                className="w-5 h-5 accent-amber-400"
              />
              <span className="text-white">{quester.name} ({quester.nickname})</span>
            </label>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedQuest(null)}
            className="flex-1 pixel-button bg-slate-700 hover:bg-slate-600 text-amber-400"
          >
            Back
          </button>
          <button
            onClick={handleCompleteQuest}
            disabled={selectedParticipants.length === 0}
            className="flex-1 pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Quest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-panel">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Sword className="w-6 h-6 text-amber-400" />
          <h2 className="font-pixel text-xl text-amber-400">Pick a Quest</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-amber-400 hover:bg-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid gap-6">
        {quests.map(quest => (
          <div
            key={quest.id}
            className="quest-card p-4 cursor-pointer"
            onClick={() => setSelectedQuest(quest)}
          >
            <h3 className="font-pixel text-lg text-amber-400 mb-2">{quest.title}</h3>
            <p className="text-slate-300 mb-4">{quest.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-pixel text-amber-400">{quest.points} points</span>
              <button
                className="pixel-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQuest(quest);
                }}
              >
                Start Quest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}