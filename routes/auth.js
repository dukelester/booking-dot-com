import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h3> Welcome to the Auth endpoint</h3>');
});

export default router;
