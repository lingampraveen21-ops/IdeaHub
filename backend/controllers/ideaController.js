import Idea from "../models/Idea.js";

// CREATE
export const createIdea = async (req, res) => {
  try {
    const idea = new Idea({
      ...req.body,
      user: req.user.id
    });

    await idea.save();
    res.json({ success: true, message: "Idea created!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getIdeas = async (req, res) => {
  try {
    // populate the user with name and email for frontend display
    const ideas = await Idea.find().populate("user", "name email");
    res.json({ success: true, ideas });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// UPDATE
export const updateIdea = async (req, res) => {
  try {
    await Idea.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: "Updated!" });
  } catch {
    res.status(500).json({ success: false });
  }
};

// DELETE
export const deleteIdea = async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted!" });
  } catch {
    res.status(500).json({ success: false });
  }
};

// LIKE
export const likeIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.likes.includes(req.user.id)) {
      idea.likes.pull(req.user.id);
    } else {
      idea.likes.push(req.user.id);
    }

    await idea.save();
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};

// COMMENT
export const commentIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    idea.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await idea.save();
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};
