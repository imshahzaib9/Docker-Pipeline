const request = require('supertest');
const app = require('./src/app');

// Hold reference to the server so we can close it after tests
let server;

beforeAll((done) => {
  server = app.listen(0, done); // port 0 = random available port
});

afterAll((done) => {
  server.close(done); // cleanly shut down — lets Jest exit normally
});

describe('API Endpoints', () => {
  test('GET / returns welcome message', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Welcome');
  });

  test('GET /health returns healthy status', async () => {
    const res = await request(server).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/info returns app info', async () => {
    const res = await request(server).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('app');
  });
});
