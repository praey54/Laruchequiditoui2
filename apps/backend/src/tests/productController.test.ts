import request from 'supertest';
import express from 'express';
import cors from 'cors';
import productRoutes from '../routes/productRoutes';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product API Endpoints', () => {
  describe('GET /api/products/:id', () => {
    test('should return product data for valid product ID', async () => {
      const productId = '1';
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect('Content-Type', /json/);
      
      console.log('Response status:', response.status);
      console.log('Response body:', response.body);
      
      // Should return 200 OK
      expect(response.status).toBe(200);
      
      // Should have correct product structure
      expect(response.body).toHaveProperty('id', productId);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('images');
      expect(response.body).toHaveProperty('seller');
      expect(response.body).toHaveProperty('category');
      
      // Seller should have required properties
      expect(response.body.seller).toHaveProperty('name');
      expect(response.body.seller).toHaveProperty('location');
      expect(response.body.seller).toHaveProperty('rating');
      expect(response.body.seller).toHaveProperty('reviewCount');
      
      // Images should be an array
      expect(Array.isArray(response.body.images)).toBe(true);
      expect(response.body.images.length).toBeGreaterThan(0);
      
      // Price should be a number
      expect(typeof response.body.price).toBe('number');
      expect(response.body.price).toBeGreaterThan(0);
    });

    test('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/999')
        .expect('Content-Type', /json/);
      
      console.log('404 Response status:', response.status);
      console.log('404 Response body:', response.body);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Product not found');
    });

    test('should return all products when no ID specified', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect('Content-Type', /json/);
      
      console.log('All products Response status:', response.status);
      console.log('All products count:', response.body?.products?.length);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.products)).toBe(true);
      expect(response.body.products.length).toBeGreaterThan(0);
      
      // Verify pagination structure
      expect(response.body.pagination).toHaveProperty('page');
      expect(response.body.pagination).toHaveProperty('limit');
      expect(response.body.pagination).toHaveProperty('totalCount');
      expect(response.body.pagination).toHaveProperty('totalPages');
    });

    test('should handle server errors gracefully', async () => {
      // Test with a potentially problematic ID to trigger any server errors
      const response = await request(app)
        .get('/api/products/test-error')
        .expect('Content-Type', /json/);
      
      console.log('Error handling Response status:', response.status);
      console.log('Error handling Response body:', response.body);
      
      // Should not return 500 - should handle errors gracefully
      if (response.status === 500) {
        console.error('INTERNAL SERVER ERROR DETECTED:', response.body);
        // Fail the test if we get a 500 error
        expect(response.status).not.toBe(500);
      }
    });

    test('should test all mock products (1, 2, 3)', async () => {
      const productIds = ['1', '2', '3'];
      
      for (const id of productIds) {
        console.log(`\nTesting product ID: ${id}`);
        const response = await request(app)
          .get(`/api/products/${id}`)
          .expect('Content-Type', /json/);
        
        console.log(`Product ${id} - Status:`, response.status);
        console.log(`Product ${id} - Title:`, response.body?.title);
        
        if (response.status !== 200) {
          console.error(`Product ${id} failed:`, response.body);
        }
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
      }
    });
  });
});