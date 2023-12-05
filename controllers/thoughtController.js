const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const dbUserData = await User.findOneAndUpdate(
        {  _id: req.body.userId, },
        { $push: { thoughts: thought._id}},
        { new: true }
      )
      if(!dbUserData){
        return res.status(400).json({ message: 'Thought created but no user with this id!'})
      }
      res.json({ thoughtData: thought, message: 'Thought successfully created!'})
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: 'Thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try{
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true}
      );
      if(!dbThoughtData) {
        return res.status(400).json({ message: 'No thought with this id!'})
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err);
    }
  },
  async deleteReaction(req, res) {
    try{
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.params.reactionId }}},
        { runValidators: true, new: true}
      );
      if(!dbThoughtData) {
        return res.status(400).json({ message: 'No thought with this id!'})
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err);
    }
  }
};
