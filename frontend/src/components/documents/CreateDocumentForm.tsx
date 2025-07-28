import { useState } from "react";
import { toast } from "react-toastify";

interface CreateDocumentFormProps {
  onCreate: (data: { title: string; content: string }) => void;
}

export const CreateDocumentForm = ({ onCreate }: CreateDocumentFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content required");
      return;
    }
    onCreate({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="mb-6 p-4 bg-gray-700 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Create Document</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 rounded text-black"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-2 p-2 rounded text-black"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Create
      </button>
    </div>
  );
};
