import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/dashboard.css";
import { toast } from "react-toastify";

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState(""); // COMMENT TEXT
  const [activeCommentBox, setActiveCommentBox] = useState(null); // WHICH IDEA COMMENT BOX IS OPEN
  const navigate = useNavigate();

  const loadIdeas = async () => {
    setLoading(true);
    try {
      const res = await api.get("/ideas");
      setIdeas(res.data.ideas || []);
    } catch (err) {
      console.error(err);
      toast.error("Error loading ideas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  // Compute contributors
  const contributorsMap = {};
  ideas.forEach((i) => {
    if (i.user && i.user._id) {
      const id = i.user._id;
      if (!contributorsMap[id]) contributorsMap[id] = { user: i.user, count: 0 };
      contributorsMap[id].count += 1;
    }
  });
  const contributors = Object.values(contributorsMap).sort((a, b) => b.count - a.count);

  // Like Idea
  const likeIdea = async (id) => {
    try {
      await api.post(`/ideas/like/${id}`);
      loadIdeas();
    } catch (err) {
      console.error(err);
      toast.error("Error liking idea");
    }
  };

  // Delete Idea
  const deleteIdea = async (id) => {
    if (!window.confirm("Are you sure you want to delete this idea?")) return;

    try {
      await api.delete(`/ideas/${id}`);
      toast.success("Idea deleted successfully");
      loadIdeas();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting idea");
    }
  };

  // COMMENT SUBMIT
  const submitComment = async (ideaId) => {
    if (!commentText.trim()) return;

    try {
      await api.post(`/ideas/comment/${ideaId}`, { text: commentText });
      setCommentText("");
      setActiveCommentBox(null);
      loadIdeas();
      toast.success("Comment added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error adding comment");
    }
  };

  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-list">
          <li onClick={() => loadIdeas()}>All Ideas</li>
          <li onClick={() => navigate("/dashboard?mine=true")}>My Ideas</li>
          <li onClick={() => navigate("/add-idea")}>Add New</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN FEED */}
      <div className="feed">
        <h1 className="feed-title">All Ideas</h1>

        {loading ? (
          <div style={{ padding: 20 }}>
            <h3>Loading ideas...</h3>
          </div>
        ) : ideas.length === 0 ? (
          <div style={{ padding: 20 }}>
            <h3>No ideas yet. Be the first one to add!</h3>
          </div>
        ) : (
          ideas.map((idea) => (
            <div className="idea-card" key={idea._id}>
              <h3 className="idea-user">
                {idea.user?.name || idea.user?.email || "Unknown User"}
              </h3>
              <h2 className="idea-title">{idea.title}</h2>

              <p className="idea-description">{idea.description}</p>

              {/* TAGS */}
              <div className="idea-tags">
                {idea.tags?.map((tag, i) => (
                  <span className="tag" key={i}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* ACTION BUTTONS */}
              <div className="idea-actions">
                <button className="like-btn" onClick={() => likeIdea(idea._id)}>
                  Like ({idea.likes?.length || 0})
                </button>

                <button
                  className="comment-btn"
                  onClick={() =>
                    setActiveCommentBox(
                      activeCommentBox === idea._id ? null : idea._id
                    )
                  }
                >
                  Comment ({idea.comments?.length || 0})
                </button>

                {currentUser && currentUser.id === idea.user?._id && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-idea/${idea._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteIdea(idea._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>

              {/* COMMENT INPUT BOX */}
              {activeCommentBox === idea._id && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{
                      padding: "10px",
                      width: "75%",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={() => submitComment(idea._id)}
                    style={{
                      marginLeft: "10px",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#2563EB",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Post
                  </button>
                </div>
              )}

              {/* SHOW COMMENTS */}
              <div style={{ marginTop: "10px" }}>
                {idea.comments?.map((c, i) => (
                  <p
                    key={i}
                    style={{
                      background: "#f3f4f6",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>{c.user?.name || "User"}:</strong> {c.text}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="trending">
        <h2>Trending Ideas</h2>
        <ul>
          {ideas.slice(0, 3).map((it) => (
            <li key={it._id}>{it.title}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: "30px" }}>Top Contributors</h2>
        <ul>
          {contributors.length === 0 && <li>No contributors yet</li>}
          {contributors.map((c) => (
            <li
              key={c.user._id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/contributors/${c.user._id}`)}
            >
              {c.user.name || c.user.email} ({c.count})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
