export interface PortfolioItem {
  title: string
  category: string
  thumbnail: string
  videoUrl: string
}

/**
 * Fetches portfolio items from a public Google Sheet.
 * 
 * HOW TO SET UP YOUR GOOGLE SHEET:
 * 1. Create a Google Sheet with these column headers in Row 1:
 *    A: title | B: category | C: thumbnail | D: videoUrl
 * 2. Add your portfolio items starting from Row 2
 * 3. File > Share > "Anyone with the link can view"
 * 4. Get your Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/SHEET_ID/edit
 * 5. Add GOOGLE_SHEET_ID=your_sheet_id to your .env.local file
 * 
 * THUMBNAIL: Use direct image URLs (e.g. from Cloudinary, Imgur, etc.)
 * VIDEO URL: Use YouTube embed URLs like https://www.youtube.com/embed/VIDEO_ID
 *            or Vimeo embed URLs like https://player.vimeo.com/video/VIDEO_ID
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID || 'YOUR_GOOGLE_SHEET_ID'
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1'

console.log("Sheet ID is",SHEET_ID)

// This URL uses Google Sheets' public CSV export — no API key needed!
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`

function parseCSV(csvText: string): string[][] {
  const rows: string[][] = []
  let current = ''
  let inQuotes = false
  let row: string[] = []

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i]
    const next = csvText[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim())
      current = ''
    } else if ((char === '\n' || (char === '\r' && next === '\n')) && !inQuotes) {
      row.push(current.trim())
      rows.push(row)
      row = []
      current = ''
      if (char === '\r') i++
    } else {
      current += char
    }
  }

  if (current || row.length > 0) {
    row.push(current.trim())
    rows.push(row)
  }

  return rows
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    console.log("SHEET_ID:", SHEET_ID)
    // If no Sheet ID is configured, return demo data
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
      return getDemoData()
    }

    const response = await fetch(SHEET_CSV_URL, {
      // Revalidate every 5 minutes on Vercel (ISR)
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error('Failed to fetch Google Sheet:', response.statusText)
      return getDemoData()
    }

    const csvText = await response.text()
    const rows = parseCSV(csvText)

    // Skip header row (index 0)
    const dataRows = rows.slice(1)

    const items: PortfolioItem[] = dataRows
      .filter(row => row.length >= 4 && row[0]) // skip empty rows
      .map(row => ({
        title: row[0] || '',
        category: row[1] || 'Uncategorized',
        thumbnail: row[2] || '',
        videoUrl: row[3] || '',
      }))
      .filter(item => item.title && item.thumbnail) // must have title + thumbnail

    if (items.length === 0) {
      return getDemoData()
    }

    return items
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return getDemoData()
  }
}

// Demo data shown when Google Sheet is not configured
function getDemoData(): PortfolioItem[] {
  return [
    {
      title: 'Neon Horizon — Brand Film',
      category: 'Commercial',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'The Journey Within',
      category: 'Short Film',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'APEX — Fitness Reel',
      category: 'Short Form',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Conversations Ep. 12',
      category: 'Podcast',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Urban Stories — Doc',
      category: 'YouTube',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Velocity — Car Ad',
      category: 'Commercial',
      thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ]
}
