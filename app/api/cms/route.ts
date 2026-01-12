import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'cms-data.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to load CMS data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    return new Response(
      JSON.stringify({ message: 'Data saved successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to save CMS data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
