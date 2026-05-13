import { NextResponse } from 'next/server';
import { acceptedVideoTypes, maxUploadSizeMb } from '@/lib/constants';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('video');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing video file.' }, { status: 400 });
  }

  if (!acceptedVideoTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Only MP4 and MOV files are supported.' }, { status: 415 });
  }

  if (file.size > maxUploadSizeMb * 1024 * 1024) {
    return NextResponse.json({ error: `Max upload size is ${maxUploadSizeMb}MB.` }, { status: 413 });
  }

  return NextResponse.json({ ok: true, fileName: file.name, size: file.size });
}
