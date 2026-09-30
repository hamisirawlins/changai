export const navLinks = [
  { id: 'home', label: 'HOME' },
  { id: 'gallery', label: 'PROJECT AMENITIES' },
  { id: 'offers', label: 'OFFERS' },
  { id: 'location', label: 'LOCATION' },
  { id: 'contact', label: 'CONTACT' }
]

export const amenities = [
  { title: 'Conference centre', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85' },
  { title: 'ICT hub', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85' },
  { title: 'Education centres', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85' },
  { title: 'Hospitals', image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=85' }
]

export const parcels = [
  { title: 'Residential', description: 'Quarter acre plots for a first or second home in a beautiful, thoughtfully planned community.', phases: ['Changai Valley (Phase 1)', 'Changai Ridge', 'Changai Gardens'] },
  { title: 'Agricultural', description: 'Room for a farmhouse and subsistence farming.' },
  { title: 'Light Industrial', description: 'Purposeful space for enterprise and industry.' },
  { title: 'Commercial', description: 'Well-positioned space for retail, offices and everyday services.' },
  { title: 'Hospitality', description: 'Room for hotels, lodges and destination experiences.' },
  { title: 'Educational', description: 'Dedicated space for schools and learning institutions.' }
]

export const offers = [
  {
    title: 'Residential',
    size: '1/4-acre · Changai Valley',
    price: 'From KES 4.5M',
    bullets: ['Ideal for a first or second home', 'Gated community', 'Graded roads & street lighting', 'Power and water nearby', 'Clean title']
  },
  {
    title: 'Residential',
    size: '1/2-acre · Changai Valley',
    price: 'From KES 8.5M',
    bullets: ['Ideal for a first or second home', 'Gated community', 'Graded roads & street lighting', 'Power and water nearby', 'Clean title']
  },
  {
    title: 'Light industrial',
    size: '1/4-acre',
    price: 'From KES 6M',
    bullets: ['Multiple access routes', 'Controlled scheme', 'Graded roads & street lighting', 'Power and water nearby', 'Clean title']
  },
  {
    title: 'Agricultural',
    size: '2.5-acre',
    price: 'From KES 8.5M',
    priceNote: 'per acre',
    bullets: ['Ideal for a farmhouse & subsistence farming', 'Gated community', 'Graded roads & street lighting', 'Power and water nearby', 'Clean title']
  }
]

export const contactDetails = {
  company: 'Changai Garden City Ltd',
  phone: '+254 717 183 057',
  email: 'sales@changaigardencity.com',
  address: ['Off Njathaini Road', 'Nairobi County']
}

export const changaiCenter: [number, number] = [37.18652, -0.90058]

export type OpenRole = {
  title: string
  department: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  location: string
  summary: string
}

/** Roles listed on /careers. Leave empty to show "No Current Roles". */
export const openRoles: OpenRole[] = []

/** Where CVs and applications from /careers are sent. */
export const careersEmail = contactDetails.email
