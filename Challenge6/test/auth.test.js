const auth = require('../controllers/auth')
const mockRequest = (body = {}) => ({
    body
})
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

const {username, password, nickname, token} = process.env;

//REGISTER
describe('auth.register function', () => {
    // case success
    test('res.json status: true, give data username and nickname', async () => {
        const req = await mockRequest({
            username: username,
            password: password,
            nickname: nickname
        });
        const res = await mockResponse();

        auth.register(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: {
                username: req.body.username,
                nickname: req.body.nickname
            }
        })
    })
})

//LOGIN
describe('auth.login function', () => {
    // case success
    test('res.json status: true, give data token', async () => {
        const req = await mockRequest({
            username: username,
            password: password
        });
        const res = await mockResponse();

        auth.register(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
                message: 'success',
                data: {
                    token: token
                }
        })
    })
})