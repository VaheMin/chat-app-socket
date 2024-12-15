
import request from 'supertest';
import app from '../src/index';

const mainUrl = '/api/v1';
let token: string; 

const userName = 'John';
const userPassword = '12345678';

describe('User Routes', () => {
  it('should login user', async () => {
    const response = await request(app)
      .post(`${mainUrl}/users/login`)
      .send({ name: userName, password: userPassword });
      
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.body).toHaveProperty('token');

    token = response.body.body.token;
  });

  it(`shouldn't login user with invalid creeds`, async () => {
    const response = await request(app)
      .post(`${mainUrl}/users/login`)
      .send({ name: userName, password: '1234' });
      
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('failed');
  });
});

describe('Room Routes', () => {
  it('should get messages by room ID', async () => {
    const response = await request(app)
      .get(`${mainUrl}/rooms/65b61d7a8db4edc72edb9362/messages`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.status).toBe(200);
    expect(response.body.body).toHaveProperty('messages');

    response.body.body.messages.forEach((message: any) => {
      expect(message).toHaveProperty('_id');
      expect(message).toHaveProperty('message');
      expect(message).toHaveProperty('senderID');
      expect(message).toHaveProperty('roomID');
      expect(message).toHaveProperty('date');
    });
    
  });
});
