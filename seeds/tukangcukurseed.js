const bcrypt = require("bcryptjs")

const seed = [
  {
    nama: "Dear Kurniawan",
    telepon: "0811111111",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -7.575489,
    longitude: 110.824326,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "Laurentius Edrick",
    telepon: "0822222222",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -7.257472,
    longitude: 112.752090,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "Aris Satya",
    telepon: "0833333333",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -6.175110,
    longitude: 106.865036,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "Ichlasul Amal",
    telepon: "0844444444",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -6.942445,
    longitude: 107.607865,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "KangCukur Stadion Taruna",
    telepon: "0855555555",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -7.432645,
    longitude: 111.024742,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "KangCukur Pilangsari",
    telepon: "0866666666",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -7.412516,
    longitude: 111.047745,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "KangCukur Sidoharjo",
    telepon: "0877777777",
    urlPhoto: "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    password: "rahasia",
    latitude: -7.426134,
    longitude: 110.989723,
    rating: 5,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

seed.map(el=>el.password = bcrypt.hashSync(el.password,bcrypt.genSaltSync(5)))

module.exports = seed