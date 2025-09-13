// components/documents/EditModal.tsx
import { useState, useEffect } from "react";

interface EditDocumentModalProps {
  isOpen: boolean;
  documentId: number;
  initialData: { title: string; content: string };
  onClose: () => void;
  onSave: (id: number, data: { title: string; content: string }) => void;
}

export const EditDocumentModal = ({
  isOpen,
  documentId,
  initialData,
  onClose,
  onSave,
}: EditDocumentModalProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-black">
        <h2 className="text-lg font-bold mb-4">Edit Document</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(documentId, { title, content })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
