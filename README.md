# tukangcukur-server

routes:

        https://tukangcukur.herokuapp.com/customer/ (GET)
        https://tukangcukur.herokuapp.com/customer/:id (GET)
        https://tukangcukur.herokuapp.com/customer/ (POST)
        https://tukangcukur.herokuapp.com/customer/:id (PUT)
        https://tukangcukur.herokuapp.com/customer/:id (DELETE)

        https://tukangcukur.herokuapp.com/tukangcukur/ (GET)
        https://tukangcukur.herokuapp.com/tukangcukur/:id (GET)
        https://tukangcukur.herokuapp.com/tukangcukur/ (POST)
        https://tukangcukur.herokuapp.com/tukangcukur/:id (PUT)
        https://tukangcukur.herokuapp.com/tukangcukur/:id (PATCH)
        https://tukangcukur.herokuapp.com/tukangcukur/:id (DELETE)

        https://tukangcukur.herokuapp.com/verify (GET)

        https://tukangcukur.herokuapp.com/login (POST)

        https://tukangcukur.herokuapp.com/transaksi/ (GET)
        https://tukangcukur.herokuapp.com/transaksi/:id (GET)
        https://tukangcukur.herokuapp.com/transaksi/ (POST)
        https://tukangcukur.herokuapp.com/transaksi/:id (PATCH)

        https://tukangcukur.herokuapp.com/varian (GET)

--
## POST login:
login yang bisa digunakan untuk baik customer maupun kangCukur

* URL:

        /login

* Method:

        POST

* URL Params:

        None

* Data Params:

        Required:

        telepon=[string]
        password=[string]

* Success Response:

        Code: 200 OK
        Content: {
        "access_token": "eyJhbAKDFasJDFAI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSfyjkfstssgsgfWRyaWNrIiwiZW1haWwiOiJsYXVyZW50aXVzZWRyaWNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMDUkVWFoS0RqZlZTSTViSktHUE1YOHovZUdXY1oxNmZPeWlpasdasdnEiLCJvcmdhbml6YXRpb24iOiJIYWNrdGl2OCIsInVwZGF0ZWRBdxcvbnxvbnyDg6NTY6NTEuOTQzWiIsImNyZWF0ZWRBdCI6IjIwMjAtMDgtMTRUMDg6NTY6NTEuOTQzWiIsImlhdCI6MTU5NzM5NTQxMn0.Yzf7ASzXCr4i56hZXxtFA1aE95guf5dXXtYuDcBJAZM"
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { message : "Validation error" }
        
        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## GET verify:
untuk cek token dan redirect sesuai role yg ada di access_token

* URL:

        /verify

* Method:

        GET

* URL Params:

        None

* Data Params:

        Required:
        Headers:
        access_token=string

* Success Response:

        Code: 200 OK
        Content: {
        "role": "customer"
        }

* Error Response:

        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## GET varian:
untuk mendapatkan menu yang hanya bisa diakses bila ada access_token

* URL:

        /varian

* Method:

        GET

* URL Params:

        None

* Data Params:

        Required:
        Headers:
        access_token=string

* Success Response:

        Code: 200 OK
        Content: [
          {
            jenisCukur: 'Potong rambut pria',
            hargaCukur: 60000,
          },
          {
            jenisCukur: 'Potong rambut anak',
            hargaCukur: 30000,
          },
          {
            jenisCukur: 'Potong jenggot dan kumis',
            hargaCukur: 25000,
          },
          {
            jenisCukur: 'Creambath pria',
            hargaCukur: 50000,
          },
          {
            jenisCukur: 'Gentleman massage',
            hargaCukur: 70000,
          },
          {
            jenisCukur: 'Gentleman full package',
            hargaCukur: 200000,
          }
        ]

* Error Response:

        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## GET transaksi:
mendapatkan keseluruhan transaksi sesuai dgn kepemilikan access_token (customer maupun kangCukur)

* URL:

        /transaksi

* Method:

        GET

* URL Params:

        None

* Data Params:

        Required:
        Headers:
        access_token=string

* Success Response:

        Code: 200 OK
        Content: [{
          id: 519,
          CustomerId: 308,
          TukangCukurId: 5,
          status: 'ongoing',
          Customer: {
            id: 308,
            nama: 'nama customer',
            alamat: 'jl. Hacktiv no.8',
            telepon: '0812345678',
            password: '$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee',
          },
          TukangCukur: {
              nama: "tukang cukur jakarta",
              telepon: "+62812345678",
              urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
              password: "$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee",
              latitude: -6.175110,
              longitude: 106.865036,
            }
          TransactionDetails: [
            {
              id: 1585,
              TransactionId: 519,
              VarianId: 1,
              hargaKetikaOrder: 60000
              jumlah: 2,
              Varian: [{jenisCukur: "Potong rambut pria", hargaCukur: 60000}]
            },
            {
              id: 1586,
              TransactionId: 519,
              VarianId: 6,
              hargaKetikaOrder: 200000
              jumlah: 5,
              Varian: [{jenisCukur: "Gentleman full package", hargaCukur: 200000}]
            }
          ]
        },{
          id: 519,
          CustomerId: 308,
          TukangCukurId: 5,
          status: 'ongoing',
          Customer: {
            id: 308,
            nama: 'nama customer',
            alamat: 'jl. Hacktiv no.8',
            telepon: '0812345678',
            password: '$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee',
          },
          TukangCukur: {
              nama: "tukang cukur jakarta",
              telepon: "+62812345678",
              urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
              password: "$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee",
              latitude: -6.175110,
              longitude: 106.865036,
            }
          TransactionDetails: [
            {
              id: 1585,
              TransactionId: 519,
              VarianId: 1,
              hargaKetikaOrder: 60000
              jumlah: 2,
              Varian: [{jenisCukur: "Potong rambut pria", hargaCukur: 60000}]
            },
            {
              id: 1586,
              TransactionId: 519,
              VarianId: 6,
              hargaKetikaOrder: 200000
              jumlah: 5,
              Varian: [{jenisCukur: "Gentleman full package", hargaCukur: 200000}]
            }
          ]
        }
      ]

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid Token" }

        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }

## GET transaksi by id:
mendapatkan transaksi by id namun tetap sesuai dgn kepemilikan access_token (customer maupun kangCukur)

* URL:

        /transaksi/:id

* Method:

        GET

* URL Params:

        id=integer

* Data Params:

        Required:
        Headers:
        access_token=string

* Success Response:

        Code: 200 OK
        Content: {
          id: 519,
          CustomerId: 308,
          TukangCukurId: 5,
          status: 'ongoing',
          Customer: {
            id: 308,
            nama: 'nama customer',
            alamat: 'jl. Hacktiv no.8',
            telepon: '0812345678',
            password: '$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee',
          },
          TukangCukur: {
              nama: "tukang cukur jakarta",
              telepon: "+62812345678",
              urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
              password: "$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee",
              latitude: -6.175110,
              longitude: 106.865036,
            }
          TransactionDetails: [
            {
              id: 1585,
              TransactionId: 519,
              VarianId: 1,
              hargaKetikaOrder: 60000
              jumlah: 2,
              Varian: [{jenisCukur: "Potong rambut pria", hargaCukur: 60000}]
            },
            {
              id: 1586,
              TransactionId: 519,
              VarianId: 6,
              hargaKetikaOrder: 200000
              jumlah: 5,
              Varian: [{jenisCukur: "Gentleman full package", hargaCukur: 200000}]
            }
          ]
        }

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid Token" }

        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## POST transaksi:
membuat transaksi dengan customer dan kangCukur terdekat dan dilengkapi dgn kepemilikan access_token

* URL:

        /transaksi

* Method:

        POST

* URL Params:

        None

* Data Params:

        Required/subtitutable:
        Body:
        customerLatitude=double
        customerLongitude=double
        ==========OR============
        TukangCukurId=integer

        Required:
        Body:
        servis=[
          {
            jenisCukur=string
            hargaCukur=integer
            jumlah=integer
          }
        ]

        Headers:
        access_token=string



* Success Response:

        Code: 200 OK
        Content: {
          id: 519,
          CustomerId: 308,
          TukangCukurId: 5,
          status: 'ongoing',
          Customer: {
            id: 308,
            nama: 'nama customer',
            alamat: 'jl. Hacktiv no.8',
            telepon: '0812345678',
            password: '$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee',
          },
          TukangCukur: {
              nama: "tukang cukur jakarta",
              telepon: "+62812345678",
              urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
              password: "$2a$05$pJKaQf21ba88qHStVJCZyOb47f4QyU01GAgxw6FGhXBErOp1H.Wee",
              latitude: -6.175110,
              longitude: 106.865036,
            }
          TransactionDetails: [
            {
              id: 1585,
              TransactionId: 519,
              VarianId: 1,
              hargaKetikaOrder: 60000
              jumlah: 2,
              Varian: [{jenisCukur: "Potong rambut pria", hargaCukur: 60000}]
            },
            {
              id: 1586,
              TransactionId: 519,
              VarianId: 6,
              hargaKetikaOrder: 200000
              jumlah: 5,
              Varian: [{jenisCukur: "Gentleman full package", hargaCukur: 200000}]
            }
          ]
        }

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid Token" }

        Code: 400 BAD REQUEST
        Content: { message : "Invalid Data" }

        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## PATCH transaksi:
update status transaksi baik dari sisi customer atau kangCukur menjadi 'cancelled'/'completed' dilengkapi dgn kepemilikan access_token (customer atau kangCukur)

* URL:

        /transaksi/:id

* Method:

        PATCH

* URL Params:

        id=integer

* Data Params:

        Required:
        Body:
        status=string (HARUS 'cancelled'/'completed')

        Headers:
        access_token=string


* Success Response:

        Code: 200 OK
        Content: {
          id: 519,
          CustomerId: 308,
          TukangCukurId: 5,
          status: 'completed',
        }

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid Token" }

        Code: 400 BAD REQUEST
        Content: { message : "Invalid Data" }

        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## BASIC customer Query:

* available route:
        customer/ (GET)
        customer/:id (GET)
        customer/ (POST)
        customer/:id (PUT)
        customer/:id (DELETE)

* Data Params:

        Body:
        nama=string
        alamat=string
        telepon=string
        password=string


## BASIC tukangCukur Query:

* available route:
        / (GET)
        /:id (GET)
        / (POST)
        /:id (PUT)
        /:id (PATCH) (SENDING ONLY STATUS AS BOOLEAN)
        /:id (DELETE)

* Data Params:

        Body:
        nama=string
        telepon=string
        urlPhoto=string
        password=string
        latitude=double
        longitude=double
        rating=integer
        status=boolean
