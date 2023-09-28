import app from "./setup/app";
import supertest from "supertest";
import { setupDB } from "./setup/db";
import { generatePaymentCheckoutLink } from "../services/payment";
import { Types } from "mongoose";

const { ObjectId } = Types;

const request = supertest(app)

setupDB()

let flight;

describe('Flights & Bookings', () => {

  
  it('Get Home page', async() => {
    const res = await request
      .get('/')
      expect(res.statusCode).toEqual(200)
  })

  it('Should fail with 404 because route does not exist', async() => {
    const res = await request
      .get('/flights/')
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(true)

  })

  it('Should get all available flights', async() => {
    const res = await request
      .get('/flights/list')
      flight = res.body.data.docs[0]
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(true)


   })

  it('Should fail because status should be true', async() => {
    const res = await request
      .get('/bookings/list')
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(false)

  })

  it('Should get all available bookings', async() => {
    const res = await request
      .get('/bookings/list')
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(true)

  })

  it('Should get all available bookings for john doe', async() => {
    const res = await request
      .get('/bookings/list?name=John Doe')
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(true)
  })

  it('Should create a booking', async() => {
    let res = await request
    .post('/bookings/create')
        .send({
          "name": "louis lane",
          "phone": "08340001111",
          "email": "louislane@gmail.com",
          "flight": flight._id,
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(true)
  })

  it('Should fail when trying to create a booking, phone field is required', async() => {
    let res = await request
    .post('/bookings/create')
        .send({
          "name": "louis lane",
          "email": "louislane@gmail.com",
          "flight": flight._id,
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual(true)
  })
        
})




