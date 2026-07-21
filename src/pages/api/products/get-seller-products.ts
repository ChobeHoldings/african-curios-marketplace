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
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { seller_id } = req.query;

    if (!seller_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'seller_id is required' 
      });
    }

    // MOCK: Return mock products for testing
    // In production, this would fetch from Supabase
    const mockProducts = [
      {
        id: 'prod_test_1',
        title: 'Sample Product',
        description: 'This is a sample product',
        category: 'textiles',
        price: 50,
        currency: 'USD',
        seller_id,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    ];

    res.status(200).json({ 
      success: true, 
      message: 'Products fetched successfully', 
      data: mockProducts 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: `Error: ${error.message || 'Unknown error'}` 
    });
  }
}
