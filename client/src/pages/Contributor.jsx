import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/dashboard.css";

function Contributor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/ideas");
        const all = res.data.ideas || [];
        const userIdeas = all.filter((i) => i.user && i.user._id === id);
        setIdeas(userIdeas);
        if (userIdeas.length > 0) setUser(userIdeas[0].user);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  return (
    <div className="dashboard-container">
      <div style={{ padding: 20 }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <h1>{user ? (user.name || user.email) : "Contributor"}</h1>
        <h3>Ideas ({ideas.length})</h3>

        {ideas.map((idea) => (
          <div key={idea._id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
          </div>
        ))}

        {ideas.length === 0 && (
          <div>
            <p>No ideas from this contributor yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contributor;
