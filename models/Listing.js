import mongoose from "mongoose"
const { Schema } = mongoose

const ListingSchema = new Schema({
  street: {
    type: "String",
    required: true
  },
  rent: {
    type: "Number",
    required: true
  },
  city: {
    type: "String",
    required: true
  },
  duration: {
    type: "String",
    required: true
  },
  contract_type: {
    type: "String",
    required: true
  },
  gender: {
    type: "String",
    required: false
  },
  lat: {
    type: "Number",
    required: true
  },
  lng: {
    type: "Number",
    required: true
  }
})

const listingModel = mongoose.model("Listings", ListingSchema)

export default listingModel