import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/addIdea.css";
import { toast } from "react-toastify";

function EditIdea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
  });

  useEffect(() => {
    async function loadIdea() {
      try {
        const res = await api.get(`/ideas`);
        const idea = res.data.ideas.find((i) => i._id === id);
        if (!idea) return;

        setForm({
          title: idea.title,
          description: idea.description,
          tags: (idea.tags || []).join(","),
          category: idea.category || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Error loading idea");
      }
    }
    loadIdea();
  }, [id]);

  const updateIdea = async () => {
    if (!form.title || !form.description) {
      return toast.error("Title and Description are required");
    }

    try {
      await api.put(`/ideas/${id}`, {
        title: form.title,
        description: form.description,
        tags: form.tags ? form.tags.split(",") : [],
        category: form.category,
      });

      toast.success("Idea updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error updating idea");
    }
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h2 className="add-title">Edit Idea</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <button className="submit-btn" onClick={updateIdea}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditIdea;
