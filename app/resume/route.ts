import path from 'path'
import { promises as fs } from 'fs'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf')
    const file = await fs.readFile(filePath)

    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="John_Bogart_Resume.pdf"',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    return new Response('Resume not found', { status: 404 })
  }
}

