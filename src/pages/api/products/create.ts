import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Allow all HTTP methods during development
  // In production, restrict to specific methods

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

    if (!title || !description || !price || !category || !seller_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          title,
          description,
          original_description: description,
          category,
          price,
          currency: currency || 'USD',
          seller_id,
          status: 'pending',
        },
      ])
      .select();

    if (error) throw error;

    // Insert product image
    if (image_url && data && data[0]) {
      await supabaseAdmin
        .from('product_images')
        .insert([
          {
            product_id: data[0].id,
            image_url,
            is_primary: true,
          },
        ]);
    }

    res.status(201).json({ success: true, message: 'Product created', data: data?.[0] });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
