import { useState, useEffect } from 'react';

export interface Notebook {
  id: string;
  name: string;
  content: string; // TipTap HTML content
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'focusforge_notebooks';

const getStored = (): Notebook[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStored = (notebooks: Notebook[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notebooks));
};

export const useNotebooks = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>(getStored);

  useEffect(() => {
    saveStored(notebooks);
  }, [notebooks]);

  const createNotebook = (name: string): Notebook => {
    const nb: Notebook = {
      id: Date.now().toString(),
      name,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotebooks(prev => [...prev, nb]);
    return nb;
  };

  const updateContent = (id: string, content: string) => {
    setNotebooks(prev =>
      prev.map(nb => nb.id === id ? { ...nb, content, updatedAt: new Date().toISOString() } : nb)
    );
  };

  const renameNotebook = (id: string, name: string) => {
    setNotebooks(prev =>
      prev.map(nb => nb.id === id ? { ...nb, name, updatedAt: new Date().toISOString() } : nb)
    );
  };

  const deleteNotebook = (id: string) => {
    setNotebooks(prev => prev.filter(nb => nb.id !== id));
  };

  return { notebooks, createNotebook, updateContent, renameNotebook, deleteNotebook };
};
