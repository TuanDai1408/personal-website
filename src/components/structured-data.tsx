import Script from "next/script";

export function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Tran Tuan Dai",
        url: "https://personal.daidataly.online",
        image: "https://personal.daidataly.online/og-image.jpg",
        jobTitle: "Data Engineer & AI Automation Specialist",
        worksFor: {
            "@type": "Organization",
            name: "Freelance",
        },
        description: "Expert Data Engineer, Marketing Analyst, and AI Automator specializing in Python, Dagster ETL, and business intelligence.",
        knowsAbout: [
            "Data Engineering",
            "AI Automation",
            "Python Programming",
            "Dagster ETL",
            "Business Intelligence",
            "Marketing Analytics",
            "Data Analytics",
        ],
        sameAs: [
            "https://www.linkedin.com/in/tran-tuan-dai", // Replace with your actual LinkedIn
            "https://github.com/TuanDai1408", // Your GitHub
            // Add other social profiles here
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Tran Tuan Dai Portfolio",
        url: "https://personal.daidataly.online",
        description: "Portfolio of Tran Tuan Dai - Data Engineer & AI Automation Specialist",
        author: {
            "@type": "Person",
            name: "Tran Tuan Dai",
        },
        inLanguage: "en-US",
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Tran Tuan Dai - Data Engineering Services",
        description: "Professional data engineering, AI automation, and marketing analytics services",
        url: "https://personal.daidataly.online",
        priceRange: "$$",
        areaServed: {
            "@type": "Country",
            name: "Vietnam",
        },
        serviceType: [
            "Data Engineering",
            "AI Automation",
            "Marketing Analytics",
            "ETL Development",
            "Business Intelligence",
        ],
    };

    return (
        <>
            <Script
                id="person-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personSchema),
                }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <Script
                id="professional-service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(professionalServiceSchema),
                }}
            />
        </>
    );
}
