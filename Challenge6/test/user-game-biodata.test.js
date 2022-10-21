const userGameBiodata = require('../controllers/user-game-biodata');
const mockRequest = (body = {}) => ({
    body
})
const paramsMockRequest = (params = {}) => ({
    params
})
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

const {id, name, region, email, oldEmail, newEmail, confirmEmail} = process.env;

//GETALL
describe('user-game-biodata.getAll function', () => {
    // case success
    test('res.json status: true, give data all users', async () => {
        const res = await mockResponse();
        userGameBiodata.getAll(res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: "get data successful!",
            data: allUsers
        })
    })
})

// GETDETAIL
describe('user-game-biodata.detail function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await paramsMockRequest({
            id : id
        });
        const res = await mockResponse();
        userGameBiodata.detailBio(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: "get data successful!",
            data: findUser,
        })
    })
})

// CREATE
describe('user-game-biodata.create bio function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await mockRequest({
            name: name,
            email: email,
            region: region
        });
        const res = await mockResponse();
        userGameBiodata.createBio(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: {
                name: req.body.name,
                email: req.body.email,
                region: req.body.region
            }
        })
    })
})

// UPDATE
describe('user-game-biodata.update bio function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await mockRequest({
            oldEmail: oldEmail,
            newEmail: newEmail,
            confirmEmail: confirmEmail
        });
        const res = await mockResponse();
        userGameBiodata.updateEmail(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: updatedBio
        })
    })
})

// DELETE
describe('user-game-biodata.delete bio function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await paramsMockRequest({
            id : id
        });
        const res = await mockResponse();
        userGameBiodata.deleteBio(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success: bio deleted',
            data: deletedBio
        })
    })
})