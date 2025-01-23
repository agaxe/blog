import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const path = '/tags';
  revalidatePath(path);

  return Response.json({
    revalidated: true,
    result: path,
    now: new Date()
  });

  // return Response.json({
  //   revalidated: false,
  //   now: Date.now(),
  //   message: 'Missing path to revalidate'
  // });
}
