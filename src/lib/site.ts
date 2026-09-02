export const SITE_URL = "https://portfolio-inky-eight-48.vercel.app";
export const CONTACT_EMAIL = "elaidelossantos05@gmail.com";
export const GITHUB_URL = "https://github.com/ElaiElaiElai1113";
export const LINKEDIN_URL = "https://linkedin.com/in/elijahndelosantos";

export type ContactDraft = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function buildCanonicalUrl(pathname = "/") {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function buildPageTitle(title?: string) {
  return title
    ? `${title} | Elijah De Los Santos`
    : "Elijah De Los Santos | Full-Stack Developer";
}

export function buildContactMailtoUrl(draft: ContactDraft) {
  const subject = `Portfolio inquiry: ${draft.subject.trim()}`;
  const body = [
    `Name: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    "",
    draft.message.trim(),
  ].join("\n");

  return `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
