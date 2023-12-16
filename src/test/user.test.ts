import supertest from 'supertest'
import { createTestUser, removeTestUser } from './test-util';
import { web } from 'application/web';

describe('POST /api/users', () => {

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should can register new user', async () => {
        const result = await supertest(web).post('/api/users/register').send({
            email: 'tester@gmail.com',
            password: 'password123;',
            name: 'User Test'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe('tester@gmail.com');
        expect(result.body.data.name).toBe('User Test');
        expect(result.body.data.password).toBe(undefined);
    });

    it('Should reject if email is invalid', async () => {
        const result = await supertest(web).post('/api/users/register').send({
            email: 'itisnotemail',
            password: 'password123;',
            name: 'User Test'
        });



        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
        const result = await supertest(web).post('/api/users/register').send({
            email: '',
            password: '',
            name: ''
        });



        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });

    it('Should reject if email already registered', async () => {
        await createTestUser();

        const result = await supertest(web).post('/api/users/register').send({
            email: 'tester@gmail.com',
            password: 'password123;',
            name: 'User Test'
        });



        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();
    });
});

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should can login', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            email: 'tester@gmail.com',
            password: 'password123;'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
    });

    it('Should reject if email is invalid', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            email: 'onlystring',
            password: 'password123;'
        });



        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();
        expect(result.body.data?.token).toBe(undefined);
    });

    it('Should reject if request is invalid', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            email: '',
            password: ''
        });

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });

    it('Should reject if email is wrong', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            email: 'wrong@email.com',
            password: 'password123;'
        });

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
        expect(result.body.data?.token).toBe(undefined);
    });

    it('Should reject if password is wrong', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            email: 'tester@gmail.com',
            password: 'wrongpassword'
        });

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
        expect(result.body.data?.token).toBe(undefined);
    });

    it('Should reject if request is adding additional data', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: 'tester@gmail.com',
                password: 'password123;',
                unknown: 'data'
            });

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });


});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should return current user', async () => {
    });

    it('Should reject if no token provided', async () => {
        const result = await supertest(web)
            .get('/api/users/current');

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();
        expect(result.body.error).toBe('Unauthorized');
    });
})
