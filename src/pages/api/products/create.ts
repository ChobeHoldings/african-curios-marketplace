import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function formatSupabaseError(error: any, fallbackMessage: string): string {
  const parts = [error?.message, error?.details, error?.hint]
    .filter((part) => typeof part === 'string' && part.trim().length > 0)
    .map((part) => part.trim());

  return parts.length > 0 ? parts.join(' | ') : fallbackMessage;
}

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
    if (!title || !description || !price || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: title, description, price, category' 
      });
    }

    const parsedPrice = typeof price === 'number' ? price : parseFloat(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid number greater than 0',
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

    const rawSellerId = typeof seller_id === 'string' ? seller_id.trim() : '';
    const resolvedSellerId = UUID_REGEX.test(rawSellerId) ? rawSellerId : randomUUID();

    const { data: sellerUser, error: sellerLookupError } = await supabase
      .from('users')
      .select('id')
      .eq('id', resolvedSellerId)
      .maybeSingle();

    if (sellerLookupError) {
      return res.status(400).json({
        success: false,
        message: `Error: ${formatSupabaseError(sellerLookupError, 'Unable to validate seller profile')}`,
      });
    }

    if (!sellerUser) {
      const { error: createSellerError } = await supabase.from('users').insert([
        {
          id: resolvedSellerId,
          email: `seller-${resolvedSellerId}@placeholder.local`,
          role: 'seller',
        },
      ]);

      if (createSellerError) {
        return res.status(400).json({
          success: false,
          message: `Error: ${formatSupabaseError(createSellerError, 'Unable to create seller profile')}`,
        });
      }
    }

    console.log('Attempting to insert product:', { title, category, price: parsedPrice });

    // Insert product
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          original_description: description.trim(),
          category,
          price: parsedPrice,
          currency: currency || 'USD',
          seller_id: resolvedSellerId,
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
        message: `Error: ${formatSupabaseError(error, 'Failed to insert product')}` 
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
    const message = formatSupabaseError(error, 'Unknown error');
    res.status(500).json({ 
      success: false, 
      message: `Error: ${message}` 
    });
  }
}
