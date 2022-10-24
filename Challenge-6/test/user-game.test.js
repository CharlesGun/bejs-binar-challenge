const request = require('supertest');
const app = require('../app');
const {
    user_game
} = require('../models');

const {
    username_test,
    password_test,
    nickname_test
} = process.env;

let token ='';

//REGISTER
describe('auth.register function', () => {
    // case success
    beforeAll(async () => {
        const user = await user_game.findOne({
            where: {
                username: username_test
            }
        });
        if (user) await user_game.destroy(user);
    });
    test('res.json status: true, give data username and nickname', async () => {
        try {
            const res = await request(app)
                .post('/user/register')
                .send({username: username_test, nickname: nickname_test, password: password_test});

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    name: username_test,
                    nickname: nickname_test
                })
            );

        } catch (err) {
            expect(err).toBe('error');
        }

    })
})

//LOGIN
describe('auth.login function', () => {
    // case success
    test('res.json status: true, give data token', async () => {
        try {
            const res = await request(app)
                .post('/user/login')
                .send({username: username_test, password: password_test});

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    token: expect.any(String)
                })
            );
            
            token = res.body.data.token
        } catch (err) {
            expect(err).toBe('error');
        }

    })
})

//GETALL
describe('user-game.getAll function', () => {
    // case success
    test('res.json status: true, give data all users', async () => {
        try {
            const res = await request(app)
                .get('/user/all')
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
                        username: expect.any(String),
                        password: expect.any(String),
                        nickname: expect.any(String),
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
describe('user-game.getDetail function', () => {
    // case success
    test('res.json status: true, give detail data user', async () => {
        try {
            const user = await user_game.findOne({
                where: {
                    username: username_test
                }
            })
            const res = await request(app)
                .get(`/user/detail/${user.id}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('get data successful!');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: user.id,
                    username: expect.any(String),
                    password: expect.any(String),
                    nickname: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

//WHOAMI
describe('user-game.whoami function', () => {
    // case success
    test('whoami berhasil', async () => {
        try {
            const user = await user_game.findOne({
                where: {
                    username: username_test
                }
            })
            const res = await request(app)
                .get('/user/whoami')
                .set('Authorization', token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('statu');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.statu).toBe(true);
            expect(res.body.message).toEqual('success');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    id: user.id,
                    username: user.username,
                    nickname: user.nickname,
                    iat: expect.any(Number)
                })
            );

        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

//CHANGEPASS
describe('user-game.changepass function', () => {
    // case success
    test('changepass berhasil', async () => {
        try {
            const res = await request(app)
                .patch('/user/changepass')
                .set('Authorization', token)
                .send({
                    oldPass: password_test,
                    newPass: password_test+1,
                    confirmPass: password_test+1
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success');
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})

// DELETE USER
describe('user-game.deleteUser function', () => {
    // case success
    test('deleteUser berhasil', async () => {
        try {
            const user = await user_game.findOne({
                where: {
                    username: username_test
                }
            })
            const res = await request(app)
                .delete(`/user/delete/${user.id}`)
                .set('Authorization', token)
                .send({
                    confirmPass: password_test+1
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toEqual('success: user deleted');
            expect(res.body.data).toEqual(
                expect.objectContaining({
                    
                })
            );
        } catch (err) {
            expect(err).toBe('error');
        }
    })
})