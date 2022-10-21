const userGameHistory = require('../controllers/user-game-history')
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

const {
    id,
    playerOneId,
    playerOneScore,
    playerTwoId,
    playerTwoScore,
} = process.env;

//GETALL
describe('user-game-history.getAll function', () => {
    // case success
    test('res.json status: true, give data all users', async () => {
        const res = await mockResponse();
        userGameHistory.getAll(res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: "get data successful!",
            data: allRecords
        })
    })
})

// GETDETAIL
describe('user-game-history.detail function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await paramsMockRequest({
            id: id
        });
        const res = await mockResponse();
        userGameHistory.detailRecord(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: "get data successful!",
            data: findRecord
        })
    })
})

// CREATE
describe('user-game-history.create bio function', () => {
    // case success
    test('res.json status: true, give data record', async () => {
        const req = await mockRequest({
            playerOneId: playerOneId,
            playerOneScore: playerOneScore,
            playerTwoId: playerTwoId,
            playerTwoScore: playerTwoScore
        });
        const res = await mockResponse();
        userGameHistory.createRecord(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: record
        })
    })
})

// UPDATE
describe('user-game-history.update record function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await mockRequest({
            oldEmail: oldEmail,
            newEmail: newEmail,
            confirmEmail: confirmEmail
        });
        const res = await mockResponse();
        userGameHistory.updateEmail(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: updatedRecord
        })
    })
})

// DELETE
describe('user-game-history.delete bio function', () => {
    // case success
    test('res.json status: true, give data user', async () => {
        const req = await paramsMockRequest({
            id: id
        });
        const res = await mockResponse();
        userGameHistory.deleteRecord(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success: record deleted',
            data: deletedRecord
        })
    })
})