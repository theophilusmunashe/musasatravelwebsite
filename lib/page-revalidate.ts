/** ISR on Vercel; fully static when GitHub builds the cPanel HTML export. */
export const pageRevalidate: number | false =
  process.env.CPANEL_STATIC === "1" ? false : 300;

export const legalRevalidate: number | false =
  process.env.CPANEL_STATIC === "1" ? false : 360000;
