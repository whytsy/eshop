import request from 'supertest';
import express from 'express';
import type { Request, Response } from "express";
import { deviceValidation, idParamValidation, userAuthValidation, validate } from '../../../validation/validation';

const createTestApp = (validators: any[], handler?: any) => {
  const app = express();
  app.use(express.json());
  
  const routeHandler = handler || ((req: Request, res: Response) => {
    res.status(200).json({ success: true, data: req.body });
  });
  
  app.use('/test', validators, validate, routeHandler);
  return app;
};

describe("Validation", () => {
    describe('Auth validation', () => {
        const app = createTestApp(userAuthValidation);

        test('POST /auth/register - valid data - pass', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    email: 'user@example.com',
                    password: 'Password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        test('POST /auth/register - invalid email - error', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    email: 'invalid-email',
                    password: 'Password123'
                });

            expect(response.status).toBe(422);
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                expect.objectContaining({
                    msg: 'Invalid email address'
                })
                ])
            );
        });

        test('POST /auth/register - weak password - error', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    email: 'user@example.com',
                    password: 'weak'
                });

            expect(response.status).toBe(422);
            const errorMessages = response.body.errors.map((e: any) => e.msg);

            expect(errorMessages).toContain('Password must be at least 8 characters long');
            expect(errorMessages).toContain('Password must contain at least one uppercase letter');
            expect(errorMessages).toContain('Password must contain at least one number');
        });

        test('POST /auth/register - return all errors for wrong password', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    email: 'user@example.com',
                    password: ''
                });

            expect(response.status).toBe(422);
            expect(response.body.errors).toHaveLength(4);
        });
    });

    describe('Device validation', () => {
        const app = createTestApp(deviceValidation);

        test('POST /devices - valid data - pass', async () => {
            const response = await request(app)
            .post('/test')
            .send({
                name: 'iPhone 15 Pro',
                price: 1299,
                info: JSON.stringify([{ title: 'Memory', description: '256GB' }]),
                typeId: 1,
                brandId: 1,
                quantityInStock: 50
            });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        test('POST /devices - negative price - error', async () => {
            const response = await request(app)
            .post('/test')
            .send({
                name: 'iPhone 15 Pro',
                price: -100,
                info: 'Some info',
                typeId: 1,
                brandId: 1,
                quantityInStock: 10
            });

            expect(response.status).toBe(422);
            expect(response.body.errors[0].msg).toBe('Price should be a positive number');
        });

        test('POST /devices - missing required fields - error', async () => {
            const response = await request(app)
            .post('/test')
            .send({
                price: 999,
                typeId: 1,
                brandId: 1,
                quantityInStock: 10
            });

            expect(response.status).toBe(422);
            const errorMessages = response.body.errors.map((e: any) => e.msg);
            
            expect(errorMessages).toContain("Name shouln't be empty");
            expect(errorMessages).toContain("info shouldn't be empty");
        });
    });

    describe('URL Parameters Validators', () => {
        const app = express();
        app.use(express.json());
        app.get('/devices/:id', idParamValidation(), validate, (req: Request, res: Response) => {
            res.status(200).json({ 
                success: true, 
                id: req.params.id 
            });
        });

        test('GET /devices/:id - accept numeric ID - pass', async () => {
            const response = await request(app).get('/devices/123');
            
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(123);
        });

        test('GET /devices/:id - non-numeric ID - error', async () => {
            const response = await request(app).get('/devices/abc');
            
            expect(response.status).toBe(422);
            expect(response.body.errors[0].msg).toBe('id should be a positive number');
        });

        test('GET /devices/:id - zero ID - error', async () => {
            const response = await request(app).get('/devices/0');
            
            expect(response.status).toBe(422);
            expect(response.body.errors[0].msg).toBe('id should be a positive number');
        });
    });
})

