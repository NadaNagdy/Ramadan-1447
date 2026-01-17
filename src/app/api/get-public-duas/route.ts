import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'all';
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get approved duas from storage
    // Note: In production, you'd use a real database
    // For now, we'll simulate with storage API
    
    const approvedDuas = [
      // These will come from your storage/database
      // For demo purposes, here's the structure:
    ];

    return NextResponse.json({
      success: true,
      duas: approvedDuas,
      total: approvedDuas.length
    });

  } catch (error: any) {
    console.error('Error fetching public duas:', error);
    return NextResponse.json(
      { error: 'فشل في تحميل الأدعية' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
