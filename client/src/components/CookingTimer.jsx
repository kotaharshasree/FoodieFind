import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Timer, Bell, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

const playChimeSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Play two cheerful bell chimes
    const playTone = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    playTone(587.33, 0, 0.5); // D5
    playTone(880.00, 0.25, 0.8); // A5
    playTone(1174.66, 0.5, 1.2); // D6
  } catch (e) {
    console.warn('Audio chime playback restricted', e);
  }
};

const CookingTimer = ({ initialMinutes = 5, onComplete }) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playChimeSound();
            toast.success('⏰ Cooking Timer Finished! Time to check your dish!', {
              duration: 6000,
              icon: '🍲',
            });
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, onComplete]);

  const handleStartPause = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(totalSeconds > 0 ? totalSeconds : 300);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleSetTime = (minutes) => {
    const mins = Math.max(1, Number(minutes) || 1);
    setInputMinutes(mins);
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    setIsRunning(false);
  };

  const addMinutes = (mins) => {
    setRemainingSeconds((prev) => prev + mins * 60);
    setTotalSeconds((prev) => prev + mins * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercentage = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#FED7AA] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFE5D0] text-[#EA580C] flex items-center justify-center">
            <Timer size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#292524]">Kitchen Cooking Timer</h4>
            <p className="text-[11px] text-[#78716C]">Set intervals for boiling, simmering or baking</p>
          </div>
        </div>
        <button
          onClick={playChimeSound}
          title="Test Chime Sound"
          className="text-[#78716C] hover:text-[#EA580C] p-1.5 rounded-md hover:bg-orange-50 transition-colors"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Main Countdown Display */}
      <div className="flex flex-col items-center justify-center my-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Circular SVG Ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#FFE5D0]"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#EA580C] transition-all duration-500 ease-linear"
              strokeWidth="6"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercentage) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Time text centered */}
          <div className="absolute text-center">
            <span className="font-mono text-3xl font-extrabold text-[#292524] tracking-tight">
              {formatTime(remainingSeconds)}
            </span>
            <p className="text-[11px] font-semibold text-[#78716C] mt-0.5">
              {isRunning ? 'Cooking in progress...' : remainingSeconds === 0 ? 'Done! 🎉' : 'Ready'}
            </p>
          </div>
        </div>
      </div>

      {/* Presets (+1m, +3m, +5m, +10m) */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {[1, 3, 5, 10].map((mins) => (
          <button
            key={mins}
            onClick={() => handleSetTime(mins)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#FFF8F0] hover:bg-[#FFE5D0] text-[#EA580C] border border-[#FED7AA] transition-colors"
          >
            {mins}m
          </button>
        ))}
        <button
          onClick={() => addMinutes(1)}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-orange-100 hover:bg-orange-200 text-[#EA580C] transition-colors"
        >
          +1m
        </button>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleStartPause}
          className={`btn-primary !py-2 !px-6 text-sm ${
            isRunning ? '!bg-amber-600 hover:!bg-amber-700' : ''
          }`}
        >
          {isRunning ? (
            <>
              <Pause size={16} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Start</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="btn-secondary !py-2 !px-4 text-sm"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default CookingTimer;
