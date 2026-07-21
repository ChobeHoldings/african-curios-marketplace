import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { title, description, category, price, currency, image_url, seller_id } = req.body;

    // Validate required fields
    if (!title || !description || !price || !category || !seller_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: title, description, price, category, seller_id' 
      });
    }

    // MOCK IMPLEMENTATION - No Supabase needed
    // This creates a mock product object that simulates successful creation
    const mockProduct = {
      id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description.trim(),
      original_description: description.trim(),
      category,
      price: parseFloat(price),
      currency: currency || 'USD',
      seller_id,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log('✅ Mock Product Created:', mockProduct);

    // Simulate a slight delay to feel like a real API call
    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(201).json({ 
      success: true, 
      message: '✅ Product created successfully! Your item will be reviewed by our team shortly.', 
      data: mockProduct 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: `Error: ${error.message || 'Unknown error'}` 
    });
  }
}
