
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = Deno.env.get('SUPABASE_URL')
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !key) throw new Error('Missing environment variables')
    
    const supabase = createClient(url, key)

    const { qrId, browser, os, device } = await req.json()
    if (!qrId) {
      throw new Error('Missing QR ID')
    }

    // Insert scan record
    const { error: scanError } = await supabase
      .from('qr_scans')
      .insert({
        qr_code_id: qrId,
        browser,
        os,
        device
      })

    if (scanError) throw scanError

    return new Response(
      JSON.stringify({ message: 'Scan registered successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
