const request = require('supertest');
const express = require('express');
const app = require('../server'); 

describe('History API', () => {

  // GET all history
  it('should fetch all history data', async () => {
    const res = await request(app).get('/history');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST new history entry
  it('should add a new history entry', async () => {
    const res = await request(app).post('/history').send({
      description: 'Testing expense',
      amount: 500,
      type: 'expense',
      date: '2024-04-14'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Expense added successfully");
  });

  // PUT update a history entry
  it('should update a history entry', async () => {
    const addRes = await request(app).post('/history').send({
      description: 'To Update',
      amount: 100,
      type: 'income',
      date: '2024-04-14'
    });
    const fetchRes = await request(app).get('/history');
    const lastEntry = fetchRes.body[fetchRes.body.length - 1];

    const updateRes = await request(app).put(`/history/${lastEntry.id}`).send({
      description: 'Updated Description',
      amount: 200,
      type: 'expense',
      date: '2024-04-14'
    });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.message).toBe("Expense updated successfully");
  });

  // DELETE a history entry
  it('should delete a history entry', async () => {
    const fetchRes = await request(app).get('/history');
    const lastEntry = fetchRes.body[fetchRes.body.length - 1];

    const deleteRes = await request(app).delete(`/history/${lastEntry.id}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe("Expense deleted successfully");
  });

  // POST search
  it('should search history by description or type', async () => {
    const res = await request(app).post('/history/search').send({ searchTerm: 'Test' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST sort
  it('should return sorted history', async () => {
    const res = await request(app).post('/history/sort').send({
      sortBy: 'amount',
      order: 'asc'
    });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  afterAll((done) => {
    const db = require('../config/db');
    db.end(() => done());
});
});
