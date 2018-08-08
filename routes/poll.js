const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const momgoose = require('mongoose');
const Vote = require('../models/Vote')
var pusher = new Pusher({
    appId: '573221',
    key: 'f67f697d0ed6495d89de',
    secret: 'a31d5c609516b377d12c',
    cluster: 'ap1',
    encrypted: true
  });
  
router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes: votes
    }))
})

router.post('/', (req, res) =>{
    const newVote ={
        os: req.body.os,
        points: 1
    }
    new Vote(newVote).save().then(vote =>{
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os,
          })
    
        return res.json({success: true, message: "thank you for voting"})
    })
})

module.exports = router;