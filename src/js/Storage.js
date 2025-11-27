export default class Storage {
  constructor() {
    this.key = 'pinCards';
  }

  getPinCards() {
    try {
      const stored = localStorage.getItem(this.key);
      if (stored === null) return [];
      
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Ошибка чтения из LocalStorage:', error);
      return [];
    }
  }

  save(data) {
    try {
    
      if (!Array.isArray(data)) {
        throw new Error('Данные должны быть массивом');
      }

      
      data.forEach(card => {
        if (typeof card.text !== 'string') {
          throw new Error('Поле text должно быть строкой');
        }
        
        const trimmedText = card.text.trim();
        if (trimmedText.length === 0) {
          throw new Error('Текст карточки не может быть пустым');
        }
        if (trimmedText.length > 500) {
          throw new Error('Текст карточки слишком длинный (максимум 500 символов)');
        }
      });

 
      const cleanedData = data.map(card => ({
        ...card,
        text: card.text.trim()
      }));

      const jsonString = JSON.stringify(cleanedData);
      const sizeKB = jsonString.length / 1024;
      if (sizeKB > 250) {
        throw new Error(`Превышен лимит размера данных (${sizeKB.toFixed(2)} KB > 250 KB)`);
      }

      localStorage.setItem(this.key, jsonString);
      return true;
    } catch (error) {
      console.error('Ошибка сохранения в LocalStorage:', error);
      return false;
    }
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  hasData() {
    return localStorage.getItem(this.key) !== null;
  }
}
