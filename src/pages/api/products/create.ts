import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error: Missing Supabase credentials' 
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Insert product
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          original_description: description.trim(),
          category,
          price: parseFloat(price),
          currency: currency || 'USD',
          seller_id,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(400).json({ 
        success: false, 
        message: `Database error: ${error.message}` 
      });
    }

    if (!data || data.length === 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Product was not created' 
      });
    }

    // Insert product image if provided
    if (image_url && data[0]) {
      const { error: imageError } = await supabaseAdmin
        .from('product_images')
        .insert([
          {
            product_id: data[0].id,
            image_url,
            is_primary: true,
          },
        ]);

      if (imageError) {
        console.error('Image insert error:', imageError);
      }
    }

    res.status(201).json({ 
      success: true, 
      message: 'Product created successfully! It will be reviewed by our team.', 
      data: data[0] 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: `Server error: ${error.message || 'Unknown error'}` 
    });
  }
}
