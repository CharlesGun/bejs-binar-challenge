const request = require('supertest');
const app = require('../app');
const {
    user_game_history
} = require('../models');

const {
    playerOneId_test,
    playerOneScore_test,
    playerTwoId_test,
    playerTwoScore_test,
} = process.env;

var id_test;
//CREATERECORD
describe('history.create function', () => {
    // case success
    test('res.json status: true, give data history', async () => {
        try {
            let totalRounds_test = await playerOneScore_test + playerTwoScore_test
            const res = await request(app)
                .post('/history/create')
                .send({
                    playerOneId: playerOneId_test,
                    playerOneScore: playerOneScore_test,
                    playerTwoId: playerTwoId_test,
                    playerTwoScore: playerTwoScore_test,
                    totalRounds: totalRounds_test
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    playerOneId: expect.any(Number),
                    playerOneScore: expect.any(Number),
                    playerTwoId: expect.any(Number),
                    playerTwoScore: expect.any(Number),
                    totalRounds: expect.any(Number),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String)
                })
            );
            id_test = res.body.data.id;
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

// GETALL
describe('user-game-history.getAll function', () => {
    // case success
    test('res.json status: true, give data all history', async () => {
        try {
            const res = await request(app)
                .get('/history/all')
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
                        playerOneId: expect.any(Number),
                        playerOneScore: expect.any(Number),
                        playerTwoId: expect.any(Number),
                        playerTwoScore: expect.any(Number),
                        totalRounds: expect.any(Number),
                        updatedAt: expect.any(String),
                        createdAt: expect.any(String)
                    })
                ])
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

//GETDETAIL
describe('user-game-history.getDetail function', () => {
    // case success
    test('res.json status: true, give detail data record', async () => {
        try {
            const res = await request(app)
                .get(`/history/detail/${id_test}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('get data successful!');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: id_test,
                    playerOneId: expect.any(Number),
                    playerOneScore: expect.any(Number),
                    playerTwoId: expect.any(Number),
                    playerTwoScore: expect.any(Number),
                    totalRounds: expect.any(Number),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String)
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

//UPDATERECORD
describe('user-game-history.update record function', () => {
    // case success
    test('update history berhasil', async () => {
        try {
            const res = await request(app)
                .patch(`/history/changehistory/${id_test}`)
                .send({
                    playerOneScore: +playerOneScore_test+1,
                    playerTwoScore: +playerTwoScore_test+1
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: id_test,
                    playerOneId: expect.any(Number),
                    playerOneScore: expect.any(Number),
                    playerTwoId: expect.any(Number),
                    playerTwoScore: expect.any(Number),
                    totalRounds: expect.any(Number),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String)
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

// DELETE RECORD
describe('user-game-bio.deleteBio function', () => {
    // case success
    test('deleteBio berhasil', async () => {
        try {
            const res = await request(app)
                .delete(`/history/delete/${id_test}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success: record deleted');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})