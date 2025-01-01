const express = require("express");
const Task = require("../models/tasks");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// Create a Task
router.post("/task", auth, async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).send({
      error: "Validation Error",
      message: "No userId found",
    });
  }

  const task = new Task({ ...req.body, userId: req.body.userId });

  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.tasks_count.new_task += 1;
    await task.save();
    await user.save();
    res.status(201).send(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation error
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({
        error: "Validation Error",
        message: messages.join(", "),
      });
    }

    // Handle other errors
    res.status(500).send({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
});

// Retrieve All Tasks
// GET /tasks?done=true
// GET /tasks?limit=3&skip=2
router.get("/tasks", auth, async (req, res) => {
  try {
    const sort = {};
    if (req.query.done) {
      obj = { userId: req.user._id, done: req.query.done };
    } else {
      obj = { userId: req.user._id };
    }

    if (req.query.sortBy) {
      const part = req.query.sortBy.split(":");
      sort[part[0]] = part[1] === "desc" ? -1 : 1;
    }

    const tasks = await Task.find(obj)
      .skip(Number(req.query.skip) || 0)
      .limit(Number(req.query.limit) || 0)
      .sort(sort);

    if (tasks.length === 0) {
      return res.status(404).send({ Error: "Task not found" });
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/allData", auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    const users = await User.find();

    res.send({ tasks, users });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Retrieve One Task By Id
router.get("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) return res.status(404).send({ Error: "Task not found" });
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update Task By Id
router.patch("/task/:id", auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { tasks_count: req.body.taskNumber },
      { new: true }
    );

    const updatedTask = await Task.findByIdAndUpdate(
      req.body.data._id,
      {
        active: req.body.data.active,
        new_task: req.body.data.new_task,
        completed: req.body.data.completed,
        failed: req.body.data.failed,
      },
      { new: true }
    );

    res.status(200).send("Tasks Updated");
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Task
router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) return res.status(404).send("No task found");
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
