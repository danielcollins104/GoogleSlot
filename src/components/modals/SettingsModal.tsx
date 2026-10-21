import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { BatteryCharging, Settings, Sliders, Volume2, X, Zap } from 'lucide-react';

interface SettingsModalProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isTurbo: boolean;
  onToggleTurbo: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isMuted,
  onToggleMute,
  isTurbo,
  onToggleTurbo,
  onClose
}) => {
  const [sfxVol, setSfxVol] = useState(0.8);
  const [musicVol, setMusicVol] = useState(0.5);
  const [batterySaver, setBatterySaver] = useState(false);

  const handleVolumeChange = (sfx: number, music: number) => {
    setSfxVol(sfx);
    setMusicVol(music);
    soundEngine.setVolumes(sfx, music);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
            <Settings className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-amber-100">EXPEDITION SETTINGS</h2>
            <p className="text-xs text-slate-400">Audio, graphics and performance options</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Sound FX slider */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-200 mb-2">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-amber-400" /> Sound Effects (SFX)
              </span>
              <span>{Math.round(sfxVol * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfxVol}
              onChange={(e) => handleVolumeChange(Number(e.target.value), musicVol)}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Music slider */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-200 mb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-teal-400" /> Camp Ambient Music
              </span>
              <span>{Math.round(musicVol * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVol}
              onChange={(e) => handleVolumeChange(sfxVol, Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Turbo Spin Toggle */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">Turbo Spin</div>
                <div className="text-[10px] text-slate-400">Accelerates reel animations by 2x</div>
              </div>
            </div>
            <button
              onClick={onToggleTurbo}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isTurbo ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isTurbo ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Battery Saver */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">Battery Saver Mode</div>
                <div className="text-[10px] text-slate-400">Caps frame rates and reduces particle density</div>
              </div>
            </div>
            <button
              onClick={() => setBatterySaver(!batterySaver)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                batterySaver ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  batterySaver ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
