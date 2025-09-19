import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";

export const metadata: Metadata = {
    title: {
        default: "Résidence Cedo - Location Appartements & Voitures Dakar | Service Premium",
        template: "%s | Résidence Cedo"
    },
    description: "🏠 Location d'appartements meublés et voitures premium à Dakar. ⭐ Cité Mixta, Ouest-foire, Cité Kalia. Réservation en ligne 24h/24. Prix transparents, service professionnel.",
    keywords: [
        "Résidence Cedo",
        "location appartement Dakar",
        "location voiture Dakar",
        "appartement meublé Dakar",
        "Cité Mixta appartement",
        "Ouest-foire location",
        "Cité Kalia logement",
        "location courte durée Dakar",
        "voiture de location Sénégal",
        "KIA CARNIVAL location",
        "HYUNDAI STAREX Dakar",
        "réservation en ligne Dakar",
        "hébergement Dakar centre",
        "location saisonnière Sénégal"
    ],
    authors: [{ name: "Résidence Cedo", url: "https://residencecedo.sn" }],
    creator: "Résidence Cedo",
    publisher: "Résidence Cedo",
    category: "Real Estate & Car Rental",
    classification: "Business",
    openGraph: {
        type: "website",
        locale: "fr_SN",
        alternateLocale: ["en_US", "fr_FR"],
        url: "https://residencecedo.sn",
        title: "Résidence Cedo - Location Appartements & Voitures Premium Dakar",
        description: "🏠 Service de location d'appartements meublés et voitures haut de gamme à Dakar. Zones privilégiées : Cité Mixta, Ouest-foire, Cité Kalia. Réservation simple et sécurisée.",
        siteName: "Résidence Cedo",
        images: [
            {
                url: "/assets/logos/logo.jpeg",
                width: 1200,
                height: 630,
                alt: "Résidence Cedo - Location Appartements et Voitures Dakar"
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@residencecedo",
        creator: "@residencecedo",
        title: "Résidence Cedo - Location Appartements & Voitures Dakar",
        description: "🏠 Appartements meublés & voitures premium à Dakar. Réservation en ligne 24h/24. Service professionnel garanti.",
        images: ["/assets/logos/logo.jpeg"]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "https://residencecedo.sn",
        languages: {
            "fr-SN": "https://residencecedo.sn",
            "fr-FR": "https://residencecedo.sn/fr",
            "en-US": "https://residencecedo.sn/en"
        }
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        other: {
            "msvalidate.01": "your-bing-verification-code"
        }
    },
    other: {
        "geo.region": "SN-DK",
        "geo.placename": "Dakar",
        "geo.position": "14.6928;-17.4467",
        "ICBM": "14.6928, -17.4467"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body style={{ margin: 0, padding: 0 }}>
                <ThemeProvider>
                    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <Header />
                        <main style={{ flexGrow: 1 }}>
                            {children}
                        </main>
                        <Footer />
                        <WhatsAppFab />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
