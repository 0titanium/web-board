const express = require('express');
const { check } = require('express-validator');

const postsControllers = require('../controllers/posts-controllers');

const router = express.Router();

router.get('/', postsControllers.getPosts);

router.get('/:pid', postsControllers.getPostById);

router.post(
    '/writing',
    [
      check('writer')
        .not()
        .isEmpty(),
      check('password')
        .not()
        .isEmpty(),
      check('title')
        .not()
        .isEmpty(),
      check('content').isLength({ min: 5 })
    ],
    postsControllers.createPost
);

router.post(
  '/:pid',
  [
    check('password')
      .not()
      .isEmpty()
  ],
  postsControllers.updateAuth
);

router.patch(
  '/:pid',
  [
    check('viewNum')
    .isEmpty()
  ],
  postsControllers.updateViewNum
);
  
router.patch(
    '/:pid/update',
    [
        check('title')
        .not()
        .isEmpty(),
        check('content').isLength({ min: 5 })
    ],
    postsControllers.updatePost
);

router.delete('/:pid', postsControllers.deletePost);

module.exports = router;
