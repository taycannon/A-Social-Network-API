const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select();

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId },
                
                { new: true })

            if (!userData) {
                res.staus(404).json({ message: 'update not sucessful.' })
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    
    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const thought = await Thought.findOneAndUpdate(
                { user: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found',
                });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    // add friend
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })

            if (!userData) {
                res.staus(404).json({ message: 'No user found with this ID.' })
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    //remove friend
    async removeFriend(req, res) {
        try {
          const removeFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No friend found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

};




