import CommentBox from "./CommentBox";

function IdeaCard({ idea, refreshIdeas }) {
  return (
    <div className="idea-card">
      <h3 className="idea-user">{idea.user?.name}</h3>
      <h2 className="idea-title">{idea.title}</h2>
      <p className="idea-description">{idea.description}</p>

      <div className="idea-tags">
        {idea.tags?.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="idea-actions">
        <button
          className="like-btn"
          onClick={async () => {
            await fetch(
              `http://localhost:5000/api/ideas/like/${idea._id}`,
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            refreshIdeas();
          }}
        >
          Like ({idea.likes.length})
        </button>

        <button className="comment-btn">Comment</button>
      </div>

      {/* COMMENT BOX */}
      <CommentBox ideaId={idea._id} onCommentAdded={refreshIdeas} />

      {/* DISPLAYING COMMENTS */}
      <div style={{ marginTop: "10px" }}>
        {idea.comments.map((c, i) => (
          <p key={i} style={{ background: "#f3f4f6", padding: "10px", borderRadius: "8px" }}>
            <strong>{c.user?.name || "User"}:</strong> {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default IdeaCard;
