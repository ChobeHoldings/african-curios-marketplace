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

    // Initialize Supabase with fresh client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      console.error('SUPABASE_URL:', supabaseUrl ? 'set' : 'NOT SET');
      console.error('SERVICE_ROLE_KEY:', supabaseKey ? 'set' : 'NOT SET');
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error' 
      });
    }

    console.log('Connecting to Supabase:', supabaseUrl);

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    console.log('Attempting to insert product:', { title, category, price });

    // Insert product
    const { data, error } = await supabase
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

    console.log('Insert response - Error:', error);
    console.log('Insert response - Data:', data);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(400).json({ 
        success: false, 
        message: `Error: ${error.message || 'Failed to insert product'}` 
      });
    }

    if (!data || data.length === 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Product was not created' 
      });
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
      message: `Error: ${error.message || 'Unknown error'}` 
    });
  }
}
