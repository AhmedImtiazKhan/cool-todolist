import React, { useState, useEffect } from 'react';

interface AISuggestionsProps {
  todos: string[];
  onSuggestionClick: (suggestion: string) => void;
}

interface Suggestion {
  text: string;
  category: string;
  priority: number;
}

const CATEGORIES = {
  WORK: '💼 Work',
  PERSONAL: '👤 Personal',
  SHOPPING: '🛒 Shopping',
  HEALTH: '🏥 Health',
  HOME: '🏠 Home',
  OTHER: '📝 Other'
};

const TIME_PATTERNS = {
  MORNING: ['morning', 'breakfast', 'wake up', 'early'],
  AFTERNOON: ['afternoon', 'lunch', 'noon'],
  EVENING: ['evening', 'dinner', 'night', 'late']
};

export default function AISuggestions({ todos, onSuggestionClick }: AISuggestionsProps): React.ReactElement | null {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (todos.length === 0) return;

    const patterns = analyzePatterns(todos);
    const newSuggestions = generateSuggestions(patterns, todos);
    const filteredSuggestions = newSuggestions.filter(suggestion => !usedSuggestions.has(suggestion.text));
    setSuggestions(filteredSuggestions);
  }, [todos, usedSuggestions]);

  const analyzePatterns = (todos: string[]): string[] => {
    const words = todos.join(' ').toLowerCase().split(/\s+/);
    const wordFrequency = new Map<string, number>();
    const bigrams = new Map<string, number>();
    
    // Analyze single words
    words.forEach(word => {
      if (word.length > 3) {
        wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
      }
    });

    // Analyze word pairs (bigrams)
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].length > 3 && words[i + 1].length > 3) {
        const bigram = `${words[i]} ${words[i + 1]}`;
        bigrams.set(bigram, (bigrams.get(bigram) || 0) + 1);
      }
    }

    // Combine and sort patterns
    const patterns = [
      ...Array.from(wordFrequency.entries()),
      ...Array.from(bigrams.entries())
    ].sort((a, b) => b[1] - a[1])
     .slice(0, 8)
     .map(([pattern]) => pattern);

    return patterns;
  };

  const categorizeTodo = (todo: string): string => {
    const lowerTodo = todo.toLowerCase();
    
    if (lowerTodo.match(/\b(meeting|project|work|office|deadline|report)\b/)) return CATEGORIES.WORK;
    if (lowerTodo.match(/\b(buy|shop|store|market|groceries)\b/)) return CATEGORIES.SHOPPING;
    if (lowerTodo.match(/\b(exercise|workout|gym|health|doctor|medicine)\b/)) return CATEGORIES.HEALTH;
    if (lowerTodo.match(/\b(clean|house|home|room|laundry|dishes)\b/)) return CATEGORIES.HOME;
    if (lowerTodo.match(/\b(family|friend|social|party|event)\b/)) return CATEGORIES.PERSONAL;
    
    return CATEGORIES.OTHER;
  };

  const getTimeBasedSuggestion = (todo: string): string | null => {
    const lowerTodo = todo.toLowerCase();
    const currentHour = new Date().getHours();
    
    if (currentHour < 12 && !lowerTodo.match(/\b(morning|breakfast)\b/)) {
      return `Schedule ${todo} for morning`;
    } else if (currentHour < 17 && !lowerTodo.match(/\b(afternoon|lunch)\b/)) {
      return `Plan ${todo} for afternoon`;
    } else if (!lowerTodo.match(/\b(evening|dinner|night)\b/)) {
      return `Set ${todo} for evening`;
    }
    
    return null;
  };

  const generateSuggestions = (patterns: string[], todos: string[]): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    
    patterns.forEach(pattern => {
      const relatedTodos = todos.filter(todo => 
        todo.toLowerCase().includes(pattern.toLowerCase())
      );
      
      relatedTodos.forEach(todo => {
        const category = categorizeTodo(todo);
        const timeSuggestion = getTimeBasedSuggestion(todo);
        
        if (timeSuggestion && !usedSuggestions.has(timeSuggestion)) {
          suggestions.push({
            text: timeSuggestion,
            category,
            priority: 2
          });
        }

        const words = todo.split(' ');
        if (words.length > 2) {
          const newSuggestion = `Complete ${words.slice(1).join(' ')}`;
          if (!usedSuggestions.has(newSuggestion)) {
            suggestions.push({
              text: newSuggestion,
              category,
              priority: 1
            });
          }
        }
      });
    });

    return suggestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setUsedSuggestions(prev => new Set([...prev, suggestion.text]));
    onSuggestionClick(suggestion.text);
  };

  const filteredSuggestions = selectedCategory
    ? suggestions.filter(s => s.category === selectedCategory)
    : suggestions;

  if (filteredSuggestions.length === 0) return null;

  return (
    <div className="ai-suggestions">
      <h3>AI Suggestions</h3>
      <div className="category-filters" onClick={(e) => e.stopPropagation()}>
        <button 
          className={!selectedCategory ? 'active' : ''} 
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {Object.values(CATEGORIES).map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="suggestions-container">
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} className={`suggestion-item ${suggestion.category.toLowerCase()}`}>
              <span className="category-icon">{suggestion.category.split(' ')[0]}</span>
              <button onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 