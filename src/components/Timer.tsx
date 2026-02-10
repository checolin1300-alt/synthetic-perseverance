import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/time';
import './Timer.css';

type TimerMode = 'pomodoro' | 'short' | 'long';

const MODES: Record<TimerMode, { label: string; time: number; color: string }> = {
    pomodoro: { label: 'Focus', time: 25 * 60, color: 'var(--primary-color)' },
    short: { label: 'Short Break', time: 5 * 60, color: 'var(--secondary-color)' },
    long: { label: 'Long Break', time: 15 * 60, color: 'var(--accent-color)' },
};

const Timer = () => {
    const [mode, setMode] = useState<TimerMode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.time);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: specific end logic
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODES[mode].time);
    };

    const changeMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(MODES[newMode].time);
    };

    const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100;

    return (
        <div className="timer-card" style={{ '--mode-color': MODES[mode].color } as React.CSSProperties}>
            <div className="mode-selector">
                {(Object.keys(MODES) as TimerMode[]).map((m) => (
                    <button
                        key={m}
                        className={`mode-btn ${mode === m ? 'active' : ''}`}
                        onClick={() => changeMode(m)}
                    >
                        {MODES[m].label}
                    </button>
                ))}
            </div>

            <div className="timer-display">
                <div className="timer-circle">
                    <svg className="progress-ring" width="260" height="260">
                        <circle
                            className="progress-ring__circle-bg"
                            stroke="rgba(0,0,0,0.05)"
                            strokeWidth="8"
                            fill="transparent"
                            r="120"
                            cx="130"
                            cy="130"
                        />
                        <circle
                            className="progress-ring__circle"
                            stroke={MODES[mode].color}
                            strokeWidth="8"
                            fill="transparent"
                            r="120"
                            cx="130"
                            cy="130"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 120} ${2 * Math.PI * 120}`,
                                strokeDashoffset: `${2 * Math.PI * 120 * (1 - progress / 100)}`,
                                transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease'
                            }}
                        />
                    </svg>
                    <div className="time-text">{formatTime(timeLeft)}</div>
                </div>
            </div>

            <div className="controls">
                <button className="control-btn main" onClick={toggleTimer}>
                    {isActive ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                </button>
                <button className="control-btn secondary" onClick={resetTimer}>
                    <RotateCcw size={24} />
                </button>
            </div>
        </div>
    );
};

export default Timer;
