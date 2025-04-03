import User from "../model/user.js";

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, // Case-insensitive search
        { ubid: { $regex: query, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
