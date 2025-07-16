import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ error: '업로드 실패' }, { status: 500 }));
        return;
      }
      const file = files.image;
      if (!file) {
        resolve(NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 }));
        return;
      }
      const fileName = path.basename(file.filepath);
      resolve(NextResponse.json({ url: `/uploads/${fileName}` }));
    });
  });
} 