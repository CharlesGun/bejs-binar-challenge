const userGame = require('../controllers/user-game')
const mockRequest = (body = {}) => ({
    body
})
const paramsMockRequest = (params = {}) => ({
    params
})
const userMockRequest = (user = {}) => ({
    user
})
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

const {id, user, oldPass, newPass, confirmPass} = process.env;

//GETALL
describe('user-game.getAll function', () => {
    // case success
    test('res.json status: true, give data all users', async () => {
        const res = await mockResponse();
        userGame.getAll(res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: "get data successful!",
            data: allUsers
        })
    })
})

// GETDETAIL
describe('user-game.detail function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await paramsMockRequest({
            id : id
        });
        const res = await mockResponse();
        userGame.detailUser(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: "get data successful!",
            data: findUser
        })
    })
})

// CREATE
describe('user-game.whoami function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await userMockRequest({
            user : user
        });
        const res = await mockResponse();
        userGame.whoami(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            statu: true,
            message: 'success',
            data: me
        })
    })
})

// UPDATE
describe('user-game.update bio function', () => {
    // case success
    test('res.json status: true, give success message', async () => {
        const req = await mockRequest({
            oldPass: oldPass,
            newPass: newPass,
            confirmPass: confirmPass
        });
        const res = await mockResponse();
        userGame.changePass(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success'
        })
    })
})

// DELETE
describe('user-game.delete bio function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await [paramsMockRequest({
            id : id
        }), userMockRequest({
            user: user
        })]
        const res = await mockResponse();
        userGame.deleteUser(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success: user deleted',
            data: deletedUser
        })
    })
})