import { useState, useCallback } from 'react';
import { initialDocuments } from '../data';

/**
 * Custom hook for managing document state (CRUD operations).
 */
export default function useDocuments() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [activeDoc, setActiveDoc] = useState(initialDocuments[0] || null);

  const addDocument = useCallback((newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDoc(newDoc);
  }, []);

  const removeDocument = useCallback((id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    setActiveDoc((current) => (current?.id === id ? null : current));
  }, []);

  const selectActiveDoc = useCallback((doc) => {
    setActiveDoc(doc);
  }, []);

  return {
    documents,
    activeDoc,
    addDocument,
    removeDocument,
    selectActiveDoc,
  };
}
