import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BOB - Broke or Billionaire",
  description: "Gamified city-building stock trading app",
  keywords: ["finance", "investing", "stock market", "education", "gamification"],
  authors: [{ name: "BOB Team" }],
  creator: "BOB Team",
  robots: "index, follow",
  metadataBase: new URL('https://bobapp.example.com'), // Change this to your actual domain in production
  openGraph: {
    type: 'website',
    title: 'BOB - Broke or Billionaire',
    description: 'Transform stock investments into a city-building experience',
    siteName: 'BOB App',
    images: [
      {
        url: '/images/bob-open-graph.png', // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'BOB - Broke or Billionaire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOB - Broke or Billionaire',
    description: 'Transform stock investments into a city-building experience',
    images: ['/images/bob-open-graph.png'],
  },
}; 