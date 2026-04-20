import { useState, useCallback } from 'react';
import './BlockNavigator.css';

export const BlockNavigator = ({ 
  blocks, 
  initialIndex = 0, 
  onBlockChange 
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleDirectSwitch = useCallback((index) => {
    if (index < 0 || index >= blocks.length) return;
    setActiveIndex(index);
    onBlockChange?.(index, blocks[index]);
  }, [blocks, onBlockChange]);

  const handlePrev = useCallback(() => {
    handleDirectSwitch(activeIndex - 1);
  }, [activeIndex, handleDirectSwitch]);

  const handleNext = useCallback(() => {
    handleDirectSwitch(activeIndex + 1);
  }, [activeIndex, handleDirectSwitch]);

  return (
    <div className="block-navigator">
      <nav className="block-nav" role="tablist" aria-label="Навигация по блокам">
        {blocks.map((block, index) => (
          <button
            key={block.id || index}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`panel-${block.id || index}`}
            id={`tab-${block.id || index}`}
            className={`block-nav__btn ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleDirectSwitch(index)}
          >
            {block.title}
          </button>
        ))}
      </nav>

      <div className="block-content" aria-live="polite">
        {blocks.map((block, index) => (
          <div
            key={block.id || index}
            id={`panel-${block.id || index}`}
            role="tabpanel"
            aria-labelledby={`tab-${block.id || index}`}
            hidden={activeIndex !== index}
            className="block-content__panel"
          >
            {block.content}
          </div>
        ))}
      </div>

      <div className="block-controls">
        <button
          type="button"
          className="btn btn--secondary"
          disabled={activeIndex === 0}
          onClick={handlePrev}
        >
          Назад
        </button>
        <button
          type="button"
          className="btn btn--primary"
          disabled={activeIndex === blocks.length - 1}
          onClick={handleNext}
        >
          Далее
        </button>
      </div>
    </div>
  );
};