import { graphql, useStaticQuery } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

/**
 * Translated equivalent to gastby-config siteMetadata.
 */
const useTranslatedConfig = () => {
  const {
    site: {
      siteMetadata: { author, schoolName },
    },
  } = useStaticQuery(graphql`
    query TranslatedConfig {
      site {
        siteMetadata {
          author
          schoolName
        }
      }
    }
  `);
  const { t } = useTranslation();
  return {
    description: t(
      `This website has been created by {{author}} for the {{schoolName}}. ` +
        `Here, students and teachers can share homework, or use other scholar tools.`,
      { author, schoolName }
    ),
    us: t(`English`),
    fr: t(`French`),
    de: t(`German`),
  };
};

export default useTranslatedConfig;
