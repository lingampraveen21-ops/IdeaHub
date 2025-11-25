import { useState } from "react";

function CommentBox({ ideaId, onCommentAdded }) {
  const [text, setText] = useState("");

  const submitComment = async () => {
    if (!text.trim()) return;

    const res = await fetch(`http://localhost:5000/api/ideas/comment/${ideaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (data.success) {
      setText("");
      onCommentAdded(); // refresh ideas list
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          width: "75%",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={submitComment}
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
  );
}

export default CommentBox;
