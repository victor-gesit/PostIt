const mockError = {
  ok: true,
  get: jest.genMockFunction(),
  toError: jest.genMockFunction(),
  body: { user: {}, message: {}, success: true }
};
const mockResponse = {
  ok: true,
  get: jest.genMockFunction(),
  toError: jest.genMockFunction(),
  body: { user: {}, message: {}, messages: [], success: true },
  status: 401
};

const Request = {
  post: jest.genMockFunction().mockReturnThis(),
  set: jest.genMockFunction().mockReturnThis(),
  send: jest.genMockFunction().mockReturnThis(),
  get: jest.genMockFunction().mockReturnThis(),
  delete: jest.genMockFunction().mockReturnThis(),
  put: jest.genMockFunction().mockReturnThis(),
  field: jest.genMockFunction().mockReturnThis(),
  attach: jest.genMockFunction().mockReturnThis(),
  end: jest.genMockFunction().mockImplementation((callback) => {
    callback(mockError, mockResponse);
  }),
};

module.exports = Request;
