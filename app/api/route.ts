
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    
    // Simulate a delay of 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Assuming the request was processed successfully, return a 200 OK response
    return NextResponse.json({
      status: 200,
      message: 'POST request processed successfully',
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    
    return NextResponse.json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}