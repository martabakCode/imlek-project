import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Imlek Greeting - Year of the Fire Horse 2026',
    description: 'A special Imlek greeting for you! Celebrate the Year of the Fire Horse.',
    openGraph: {
      title: 'Imlek Greeting - Year of the Fire Horse 2026',
      description: 'A special Imlek greeting for you! Celebrate the Year of the Fire Horse.',
      images: [`/greeting/${params.id}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Imlek Greeting - Year of the Fire Horse 2026',
      description: 'A special Imlek greeting for you! Celebrate the Year of the Fire Horse.',
      images: [`/greeting/${params.id}/opengraph-image`],
    },
  };
}

export default function GreetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
