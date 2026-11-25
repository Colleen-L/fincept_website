// ─────────────────────────────────────────────────────────────
//  Site-wide settings. Edit these once and every page updates.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'FINCEPT Purdue',

  // Contact details (placeholders — replace with the real ones)
  email: 'fincept.purdue@gmail.com',
  linkedin: 'https://www.linkedin.com/company/fincept-purdue',
  linkedinHandle: 'linkedin.com/company/fincept-purdue',
  instagram: 'https://www.instagram.com/fincept.purdue',
  instagramHandle: '@fincept.purdue',

  // Where the "Apply" buttons point (Google Form, Airtable, etc.)
  applyUrl: 'https://forms.gle/your-application-form',

  // Contact form delivery.
  //  • Leave '' to fall back to the visitor's email app (mailto:).
  //  • Or paste a Formspree / FormSubmit endpoint to send email directly, e.g.
  //      'https://formspree.io/f/xxxxxxx'
  //      'https://formsubmit.co/ajax/fincept.purdue@gmail.com'
  formEndpoint: '',

  // Application cycle shown on the banner + Membership page (placeholders)
  cycle: {
    term: 'Spring 2027',
    opens: 'Nov 16',
    due: 'Dec 05',
    interviews: 'On a Rolling Basis',
    decisions: 'Dec 07',
  },
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/team', label: 'Our Team' },
  { to: '/membership', label: 'Membership' },
  { to: '/partners', label: 'Partners' },
  { to: '/contact', label: 'Contact' },
];
