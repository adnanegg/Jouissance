import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/config/site";
import type { Locale } from "@/config/site";
import { getContent } from "@/lib/i18n";
import { business } from "@/config/business";
import styles from "./privacy.module.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const isAr = locale === "ar";
  return {
    title: isAr
      ? `سياسة الخصوصية — ${business.fullName}`
      : `Politique de confidentialité — ${business.fullName}`,
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const content = getContent(typedLocale);
  const isAr = typedLocale === "ar";

  return (
    <div className="section" style={{ paddingTop: "calc(var(--header-height) + 3rem)" }}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{content.footer.privacy}</h1>
          <p className={styles.notice}>
            {isAr
              ? "هذه الوثيقة عبارة عن مسودة أولية لسياسة الخصوصية الخاصة بشركة جويسانس للأشغال المتنوعة."
              : "Ce document constitue une ébauche initiale de la politique de confidentialité de Jouissance Travaux Divers."}
          </p>

          <div className={styles.content}>
            <section>
              <h2>{isAr ? "١. جمع البيانات" : "1. Collecte des données"}</h2>
              <p>
                {isAr
                  ? "نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند تعبئة نموذج طلب العرض، بما في ذلك الاسم، رقم الهاتف، المدينة ونوع المشروع."
                  : "Nous collectons les informations que vous nous fournissez directement lorsque vous remplissez le formulaire de demande de devis, notamment votre nom, numéro de téléphone, ville et type de projet."}
              </p>
            </section>

            <section>
              <h2>{isAr ? "٢. استخدام البيانات" : "2. Utilisation des données"}</h2>
              <p>
                {isAr
                  ? "تُستخدم البيانات التي نجمعها حصرياً للتواصل معك بشأن مشروعك ولتقديم عروض الأسعار المناسبة."
                  : "Les données collectées sont utilisées exclusivement pour vous contacter concernant votre projet et vous fournir des devis adaptés."}
              </p>
            </section>

            <section>
              <h2>{isAr ? "٣. حماية البيانات" : "3. Protection des données"}</h2>
              <p>
                {isAr
                  ? "نحن نلتزم بحماية بياناتك الشخصية وعدم مشاركتها مع أي طرف ثالث لأغراض تجارية."
                  : "Nous nous engageons à protéger vos données personnelles et à ne pas les partager avec des tiers à des fins commerciales."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
