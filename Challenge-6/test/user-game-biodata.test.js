const request = require('supertest');
const app = require('../app');
const {
    user_game_biodata
} = require('../models');

const {
    name_test,
    email_test,
    region_test
} = process.env;

//CREATEBIO
describe('bio.create function', () => {
    // case success
    beforeAll(async () => {
        const bio = await user_game_biodata.findOne({
            where: {
                name: name_test
            }
        });
        if (bio) await user_game_biodata.destroy({
            where: {
                name: name_test
            }
        });
    });
    test('res.json status: true, give data username and nickname', async () => {
        try {
            const res = await request(app)
                .post('/bio/create')
                .send({
                    name: name_test,
                    email: email_test,
                    region: region_test
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    name: name_test,
                    email: email_test,
                    region: region_test
                })
            );

        } catch (err) {
            expect(err).toBe('error');
        }

    })
})

// GETALL
describe('user-game-biodata.getAll function', () => {
    // case success
    test('res.json status: true, give data all bio', async () => {
        try {
            const res = await request(app)
                .get('/bio/all')
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('get data successful!');
            expect(res.body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        email: expect.any(String),
                        region: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    })
                ])
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

//GETDETAIL
describe('user-game-biodata.getDetail function', () => {
    // case success
    test('res.json status: true, give detail data bio', async () => {
        try {
            const user = await user_game_biodata.findOne({
                where: {
                    name: name_test
                }
            })
            const res = await request(app)
                .get(`/bio/detail/${user.id}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('get data successful!');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: user.id,
                    name: expect.any(String),
                    email: expect.any(String),
                    region: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

//UPDATEEMAIL
describe('user-game-bio.update email function', () => {
    // case success
    test('update email berhasil', async () => {
        try {
            const res = await request(app)
                .patch('/bio/changeemail')
                .send({
                    oldEmail: email_test,
                    newEmail: email_test + 1,
                    confirmEmail: email_test + 1
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    region: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

// DELETE BIO
describe('user-game-bio.deleteBio function', () => {
    // case success
    test('deleteBio berhasil', async () => {
        try {
            const user = await user_game_biodata.findOne({
                where: {
                    name: name_test
                }
            })
            const res = await request(app)
                .delete(`/bio/delete/${user.id}`)
                .send({
                    confirmEmail: email_test+1
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success: bio deleted');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})