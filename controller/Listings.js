import Listings from "../model/Listings.js"

export const createPost = async (req, res, next) => {
  const listing = new Listings({
    street: req.body.street,
    rent: req.body.rent,
    city: req.body.city,
    duration: req.body.duration,
    contract_type: req.body.contract_type,
    gender: req.body.gender,
    lat: req.body.lat,
    lng: req.body.lng,
  })

  try {
    const listingSave = await listing.save();
    res.json(listingSave)
  } catch (err) {
    console.log(err)
  }
}

// for multiple posts
export const getPosts = async (req, res, next) => {
  Listings.find()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.send("Error", err)
    })
}

// for one post
// add error handling here (returns null now)
export const getPost = async (req, res, next) => {
  Listings.findById(req.params.id)  // getting the param from req
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.send("Error", err)
    })
}

// updating the version "__v" param todo
// https://stackoverflow.com/questions/35288488/easy-way-to-increment-mongoose-document-versions-for-any-update-queries
export const updatePost = async (req, res, next) => {
  Listings.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send("Error", err)
    })
}

export const deletePost = async (req, res, next) => {
  Listings.findByIdAndDelete(req.params.id)
    .then(() => res.send("Success"))
    .catch((err) => {
      res.send("Error", err)
    })
}


/*
req params vs query params:
https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params

Yes, they are standard Express parameters. “req” is for the request object.
This is used in your Express route handler function to get data from
the client (such as a web-browser). For example: username or order number
could be attached to the req object. “res” is for the response object and
you will use this in your Express route handler function to send data back
to the client. For example: a 200 success status code and some data
(often in json format) that your client requested from the server
(such as a weather report). “next” is used to call other “middle-ware”
functions with Express which can handle other things such as logging or
error handling. You can also name them something else such as (request, response)
and sometimes you won’t need to use next so there may only be 2 arguments
(req and res).
*/