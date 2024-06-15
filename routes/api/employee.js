const express = require('express');
const router = express.Router();
const info = {};
info.employee = require('../../public/json/employee.json');

router.route('/')
.get((req, res) => {
  res.json(info.employee)
})

.post((req, res) => {
  res.json({
    "id":req.body.id,
    "passport": req.body.passport,
    "name": req.body.name,
    "surname": req.body.surname
  })
})

.put((req, res) => {
  res.json(
    {
    "id":req.body.id,
    "passport": req.body.passport,
    "name": req.body.name,
    "surname": req.body.surname
    }
  )
})

.delete((req, res) => {
  res.json({"id": req.body.id});
})

router.route('/:id')
.get((req, res) => {
  res.json({
    "id": req.params.id
  })
})











module.exports = router;


























/* router.route('/')
.get((req, res) => {
  res.json(data.employees)
})

// In post request, data is sent through the http body and not in the url unlike get method 
.post((req, res) => {
  res.json(
    {
      "firstname": req.body.firstname, // extracting firstname using req.body.firstname and setting it to the json data "firstname"
      "lastname": req.body.lastname,
    }
  )
})

.put((req, res) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
  })
})

.delete((req, res) => {
  res.json({"id": req.body.id})
})

// creating a get request that has a parameter inside the url
router.route('/:id')

.get((req, res) => {
  res.json({
    "id": req.params.id,
  })
}) */




