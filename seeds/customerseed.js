const bcrypt = require("bcryptjs")

const seed = [
  {
    nama: "Idaz Anggara",
    alamat: "jl. Hacktiv no.8",
    telepon: "0812345678",
    password: "rahasia",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nama: "Laurentius Edrick",
    alamat: "jl. Hacktiv no.8",
    telepon: "0823456789",
    password: "rahasia",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

seed.map(el=>el.password = bcrypt.hashSync(el.password,bcrypt.genSaltSync(5)))

module.exports = seed