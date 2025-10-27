/**
 * Safely get item from localStorage
 */
export const getStorageItem = (key: string, defaultValue: string | null = null): string | null => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : defaultValue;
  } catch (error) {
    console.error('Storage Utils', `Failed to get ${key}`, error);
    return defaultValue;
  }
};

/**
 * Safely set item to localStorage
 */
export const setStorageItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Storage Utils', `Failed to set ${key}`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 */
export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage Utils', `Failed to remove ${key}`, error);
    return false;
  }
};

/**
 * Get parsed JSON from localStorage
 */
export const getStorageJSON = <T>(key: string, defaultValue: T): T => {
  try {
    const item = getStorageItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Storage Utils', `Failed to parse JSON for ${key}`, error);
    return defaultValue;
  }
};

/**
 * Set JSON object to localStorage
 */
export const setStorageJSON = <T>(key: string, value: T): boolean => {
  try {
    return setStorageItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage Utils', `Failed to stringify JSON for ${key}`, error);
    return false;
  }
};

