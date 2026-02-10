import { useState, useEffect } from 'react';
import { Type } from 'lucide-react';
import './FontSelect.css';

type FontType = 'sans' | 'serif' | 'mono';

const FONTS: { id: FontType; label: string; font: string }[] = [
    { id: 'sans', label: 'Sans', font: 'Inter, sans-serif' },
    { id: 'serif', label: 'Serif', font: 'Lora, serif' },
    { id: 'mono', label: 'Mono', font: 'Space Mono, monospace' },
];

const FontSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFont, setActiveFont] = useState<FontType>(() => {
        return (localStorage.getItem('font') as FontType) || 'sans';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-font', activeFont);
        localStorage.setItem('font', activeFont);
    }, [activeFont]);

    return (
        <div className="font-select-container">
            <button
                className="font-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change font"
            >
                <Type size={20} />
            </button>

            {isOpen && (
                <>
                    <div className="font-menu-overlay" onClick={() => setIsOpen(false)} />
                    <div className="font-menu">
                        {FONTS.map((font) => (
                            <button
                                key={font.id}
                                className={`font-option ${activeFont === font.id ? 'active' : ''}`}
                                style={{ fontFamily: font.font }}
                                onClick={() => {
                                    setActiveFont(font.id);
                                    setIsOpen(false);
                                }}
                            >
                                {font.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FontSelect;
