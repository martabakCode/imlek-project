# 🐴🔥 Imlek Greeting Generator

A beautiful web application to create animated Imlek (Chinese New Year) greeting cards with the theme of **Fire Horse Year 2026**. Features stunning fire animations, interactive horse elements, and shareable digital cards.

![Fire Horse Year](https://img.shields.io/badge/Year-Fire%20Horse%202026-red)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

## ✨ Features

### 🎨 Six Stunning Templates

| Template | Preview | Description |
|----------|---------|-------------|
| **Blazing Stallion** 🔥 | Black + Fire | Wild horse running with blazing fire effects |
| **Phoenix Horse** ✨ | Purple + Gold | Winged horse with mystical purple aura |
| **Emperor's Steed** 👑 | Red + Gold | Regal armored horse with imperial decorations |
| **Celestial Horse** 🌟 | Navy + Blue | Heavenly horse galloping among stars |
| **Golden Lotus** 🪷 | Teal + Gold | Elegant horse with lotus flowers and water |
| **Dragon Horse** 🐉 | Red + Amber | Mythical Long Ma with dragon scales |

#### 1. Blazing Stallion 🔥
- Deep black background with gradient fire
- Running horse silhouette with fire from hooves
- 3D gold embossed frame
- Intense fire particles

#### 2. Phoenix Horse ✨
- Purple to magenta gradient background
- Pegasus with flapping wings animation
- Floating lanterns with swing animation
- Ethereal glow effects

#### 3. Emperor's Steed 👑
- Traditional red with cloud patterns
- Armored horse with shine animation
- Rotating ancient gold coins
- Imperial seal and calligraphy

#### 4. Celestial Horse 🌟
- Deep navy with starry night background
- Shooting stars and constellation effects
- Moon glow with dreamy ambiance
- Twinkling star particles

#### 5. Golden Lotus 🪷
- Teal to emerald water theme
- Animated lotus flowers and koi fish
- Water ripple effects
- Serene and elegant atmosphere

#### 6. Dragon Horse 🐉
- Dragon scales pattern background
- Animated flame breath effect
- Dragon pearl with glowing aura
- Powerful red and gold theme

### 🔥 Animation Features

- **Fire Particle System** - 10-30 customizable fire particles rising with random paths
- **3D Tilt Effect** - Cards respond to mouse movement with perspective tilt
- **Gallop Animation** - Click the card to trigger horse gallop with screen shake
- **Magnetic Buttons** - Share buttons follow cursor with spring physics
- **Staggered Page Load** - Elements animate in sequence for dramatic effect
- **Ambient Animations** - Breathing, glowing, and floating effects

### 📱 Mobile Optimized

- Responsive grid layouts (2 columns on mobile, 3 on desktop)
- Touch-friendly tap targets (min 44px)
- Reduced particle count on mobile for better performance
- Optimized font sizes and spacing
- Template preview modal for better UX
- Swipe-friendly interactions

### 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: Framer Motion + CSS @keyframes
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Fonts**: Ma Shan Zheng (Calligraphy), Noto Serif SC, Inter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (for database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/martabakcode/imlek-greeting.git
cd imlek-greeting
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Firebase credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Copy your configuration to `.env.local`
4. Set up Firestore security rules (see below)

## 🔒 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /greetings/{greetingId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['senderName', 'receiverName', 'template', 'fireIntensity'])
        && request.resource.data.senderName is string
        && request.resource.data.receiverName is string
        && request.resource.data.template in ['blazing-stallion', 'phoenix-horse', 'emperor-steed']
        && request.resource.data.fireIntensity in ['low', 'medium', 'high']
        && request.resource.data.senderName.size() > 0
        && request.resource.data.senderName.size() <= 50
        && request.resource.data.receiverName.size() > 0
        && request.resource.data.receiverName.size() <= 50;
      allow update: if false; // Prevent updates after creation
      allow delete: if false;
    }
  }
}
```

## 📁 Project Structure

```
imlek-greeting/
├── app/
│   ├── api/
│   │   └── greeting/
│   │       └── route.ts          # API endpoint for creating greetings
│   ├── greeting/
│   │   └── [id]/
│   │       ├── page.tsx          # Greeting display page
│   │       ├── layout.tsx        # Metadata for SEO
│   │       └── opengraph-image.tsx # Dynamic OG image generation
│   ├── globals.css               # Global styles + animations
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Landing page with form
├── components/
│   ├── animations/
│   │   ├── AncientCoin.tsx       # 3D rotating coin
│   │   ├── FireParticles.tsx     # Fire particle system
│   │   ├── FlameBorder.tsx       # Animated gradient border
│   │   ├── FloatingLanterns.tsx  # Swing animation lanterns
│   │   └── HorseSilhouette.tsx   # SVG horses with animations
│   ├── templates/                # 6 template kartu
│   │   ├── BlazingStallion.tsx   # Template 1 - Fire theme
│   │   ├── PhoenixHorse.tsx      # Template 2 - Purple mystical
│   │   ├── EmperorSteed.tsx      # Template 3 - Imperial red
│   │   ├── CelestialHorse.tsx    # Template 4 - Starry night
│   │   ├── GoldenLotus.tsx       # Template 5 - Water lotus
│   │   └── DragonHorse.tsx       # Template 6 - Dragon fire
│   ├── GreetingCard.tsx          # Template switcher
│   ├── GreetingForm.tsx          # Creation form
│   ├── ShareButtons.tsx          # Social sharing with magnetic effect
│   └── TemplatePreview.tsx       # Template grid with preview modal
├── hooks/
│   └── useMousePosition.ts       # Mouse tracking for tilt/magnetic effects
├── lib/
│   └── firebase.ts               # Firebase configuration
├── types/
│   └── greeting.ts               # TypeScript types
├── public/                       # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Fire Red**: `#dc2626`
- **Fire Orange**: `#f97316`
- **Gold**: `#fbbf24`
- **Deep Black**: `#0a0a0a`
- **Imperial Red**: `#7f1d1d`
- **Purple Mystic**: `#4c1d95`

### Typography
- **Calligraphy**: Ma Shan Zheng - Chinese titles
- **Serif**: Noto Serif SC - Body text
- **Sans**: Inter - UI elements

### Animations
- Page load: Staggered entrance (0.15s delay)
- Hover: Scale 1.02 with enhanced glow
- Particles: 3-6s rise with random horizontal sway
- Gallop: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)

## ♿ Accessibility

- Respects `prefers-reduced-motion`
- Minimum touch target: 44px
- High contrast text
- Focus visible indicators
- Semantic HTML structure

## 📱 Mobile Optimization

- Reduced particle count (10-15 on mobile)
- Simplified blur effects on low-end devices
- Touch-friendly tap targets
- Responsive layouts

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

MIT License - feel free to use for personal or commercial projects!

## 🙏 Credits

- Chinese calligraphy font: Ma Shan Zheng (Google Fonts)
- Icons: Lucide React
- Animations: Framer Motion

---

Made with 🔥 by **MartabakCode** for the Year of the Fire Horse 2026

---

<div align="center">
  <p>🥞 Crafted with love by MartabakCode 🥞</p>
  <p>
    <a href="https://github.com/martabakcode">GitHub</a> • 
    <a href="https://instagram.com/martabakcode">Instagram</a>
  </p>
</div>
