import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    message: string;
    category: string;
    datePosted: string;
    status: "active";
  }) => void;
}

const AddAnnouncementModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddAnnouncementModalProps) => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "General",
    datePosted: new Date().toISOString().split("T")[0],
    status: "active" as const,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Announcement</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Announcement Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Textarea
            placeholder="Announcement Message"
            value={form.message}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: { target: { value: any; }; }) => setForm({ ...form, message: e.target.value })}
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="General">General</option>
            <option value="System Update">System Update</option>
          </select>

          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;
