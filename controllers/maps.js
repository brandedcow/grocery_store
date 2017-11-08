var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCdR2CTnqWIErp_admq0FTsFskKeTdJZn8',
  Promise: Promise
})

var Address = require('../models/Address')
var CustomerAddress = require('../models/CustomerAddress')

exports.getAutoComplete = function (req, res, next) {
  let query = req.query.input.replace(new RegExp('_','g'),' ')
  googleMapsClient.placesAutoComplete({
    input: query
  }).asPromise()
    .then(function(response) {
      res.status(200).send(response)
    })
    .catch(function(err) {
      res.status(400).send(err)
    })
}

exports.getPlace = function(req, res, next) {
  var query = req.query.input.replace(new RegExp('_','g'),' ')
  googleMapsClient.places({
    query: query
  }).asPromise()
    .then(function(response) {
      res.status(200).send(response.json)
    })
    .catch(function(err) {
      res.status(400).send(err)
    })
}

exports.addressPost = function (req, res, next) {
  var place = googleMapsClient.place({ placeid: req.body.addressID })
    .asPromise()
    .then(function(response) {
      var temp = response.json.result.address_components
      var info = {
        street_line: response.json.result.name,
        city: null,
        state: null,
        zip: null,
        country: null
      }
      var count = 0;

      temp.forEach(function(component) {
        if (component.types.includes('locality')) {
          info.city = component.long_name
        }
        if (component.types.includes('administrative_area_level_1')) {
          info.state = component.long_name
        }
        if (component.types.includes('postal_code')) {
          info.zip = component.long_name
        }
        if (component.types.includes('country')) {
          info.country = component.long_name
        }
      })
      return new Address(info).save()

    })
    .catch(function(err) {
      res.status(400).send(err)
    })

  var address = place.then(function(response) {
      new CustomerAddress({
        customer_id: req.body.cust,
        address_id: response.id
      }).save()
      return res.status(200).send({addressID:response.id})
    })
    .catch(function(response) {
      return res.status(400).send(response)
    })
}

exports.test = function(req, res, next) {
  googleMapsClient.place({
    placeid: req.query.input
  }).asPromise()
    .then(function(response) {
      res.status(200).send(response)
    })
    .catch(function(err) {
      res.status(400).send(err)
    })
}
