import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// POST - Create new application
export async function POST(request) {
  try {
    console.log('=== API Route Called ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { 
      service_type, 
      project_name, 
      budget, 
      deadline, 
      description,
      user_id 
    } = body;

    console.log('Extracted fields:', {
      service_type,
      project_name,
      budget,
      deadline,
      description,
      user_id
    });

    // Validate required fields
    if (!service_type || !project_name || !budget || !deadline || !description || !user_id) {
      console.log('Validation failed - missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('Validation passed, inserting into database...');

    // Insert application into database
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          user_id,
          service_type,
          project_name,
          budget: parseFloat(budget),
          deadline,
          description,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Application submitted successfully!', 
        application: data 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Fetch user's applications
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    
    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }

    return NextResponse.json({ applications: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}