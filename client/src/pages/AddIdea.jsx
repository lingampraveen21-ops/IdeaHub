import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/addIdea.css";
import { toast } from "react-toastify";

function AddIdea() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitIdea = async () => {
    if (!form.title || !form.description) {
      return toast.error("Title and Description are required");
    }

    try {
      await api.post("/ideas/create", {
        title: form.title,
        description: form.description,
        tags: form.tags ? form.tags.split(",") : [],
        category: form.category,
      });

      toast.success("Idea created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error creating idea!");
    }
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h2 className="add-title">Add New Idea</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            name="tags"
            placeholder="comma,separated,tags"
            value={form.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn" onClick={submitIdea}>
          Create Idea
        </button>
      </div>
    </div>
  );
}

export default AddIdea;
