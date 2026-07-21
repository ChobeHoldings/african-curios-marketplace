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
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*, product_images(*), approvals(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Product fetched', data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
