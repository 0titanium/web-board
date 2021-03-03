const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');

const Post = require('../models/post');

let postNum;

Post.count({}, function(err, count) {
  postNum = count+1;
});

let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

var currentDate = year + '.' + month + '.' + date;

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching posts failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ posts: posts.map(post => post.toObject({ getters: true })) });
};

// getPostById
const getPostById = async (req, res, next) => {
  const postId = req.params.pid; // { pid: 'p1' }

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a post.',
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      'Could not find a post for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ post: post.toObject({ getters: true }) });
};

// function getPostById() { ... }
// const getPostById = function() { ... }

// createPost
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, writer, content, password } = req.body;
  const viewNum = 0;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); // 12, hard to reverse, doesn't take hour to generate
  } catch(err){
    const error = new HttpError(
      'Could not create post, please try again.',
      500
    );
    return next(error);
  }

  const createdPost = new Post({
    num: postNum,
    title,
    writer,
    password: hashedPassword,
    content,
    date: currentDate,
    viewNum: viewNum
  });
  console.log(postNum);
  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  postNum++;

  res.status(201).json({ post: createdPost });
};

// updateAuth
const updateAuth = async (req, res, next) => {
  const password = req.body.password;
  const postId = req.params.pid;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  res.json(isValidPassword);
}

// updatePost
const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, content } = req.body;
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  post.title = title;
  post.content = content;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

// updateViewNum
const updateViewNum = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  post.viewNum++;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
}

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete post.',
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError('Could not find post for this id.', 404);
    return next(error);
  }

  try {
    await post.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted post.' });
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updateAuth = updateAuth;
exports.updateViewNum = updateViewNum;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
