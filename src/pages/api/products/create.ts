import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, description, price, category, seller_id, image_url } = req.body;

    if (!title || !description || !price || !category || !seller_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create product
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .insert({
        title,
        description,
        original_description: description,
        price,
        category,
        seller_id,
        status: 'pending',
      })
      .select()
      .single();

    if (productError) {
      throw productError;
    }

    // Upload image if provided
    if (image_url && product) {
      const { error: imageError } = await supabaseAdmin
        .from('product_images')
        .insert({
          product_id: product.id,
          image_url,
          is_primary: true,
        });

      if (imageError) {
        console.error('Image upload error:', imageError);
      }
    }

    return res.status(201).json({ product });
  } catch (error) {
    console.error('Product creation error:', error);
    return res.status(500).json({ error: 'Failed to create product' });
  }
}
