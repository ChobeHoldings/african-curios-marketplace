import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import axios from 'axios';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { product_id, admin_id, status, admin_notes, description } = req.body;

    // If refining description with AI
    let refined_description = description;
    if (description && process.env.OPENAI_API_KEY) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that improves product descriptions for an African curios marketplace. Make them more compelling and detailed.',
              },
              {
                role: 'user',
                content: `Please improve this product description: ${description}`,
              },
            ],
            max_tokens: 150,
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        refined_description = response.data.choices[0].message.content;
      } catch (aiError) {
        console.error('AI refinement failed:', aiError);
        // Continue without AI refinement
      }
    }

    // Update product status and description
    const { data: productData, error: productError } = await supabaseAdmin
      .from('products')
      .update({
        status,
        description: refined_description || description,
      })
      .eq('id', product_id)
      .select();

    if (productError) throw productError;

    // Create approval record
    const { data: approvalData, error: approvalError } = await supabaseAdmin
      .from('approvals')
      .insert([
        {
          product_id,
          admin_id,
          status,
          admin_notes,
          refined_description: refined_description || description,
          reviewed_at: new Date().toISOString(),
        },
      ])
      .select();

    if (approvalError) throw approvalError;

    res.status(200).json({
      success: true,
      message: 'Product reviewed and updated',
      data: { product: productData?.[0], approval: approvalData?.[0] },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
