// Normalize API base URL: remove trailing slashes to avoid double-slash redirects
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://apiportomaharani.pythonanywhere.com';
export const API_URL = rawApiUrl.replace(/\/+$/g, '');

export function resolveUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/api/uploads/')) {
    return `${API_URL}${url}`;
  }
  return url;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  login: (username: string, password: string) =>
    request<{ access_token: string; username: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  verify: () => request<{ username: string }>('/api/auth/verify'),

  // ── Hero ──────────────────────────────────────────────────────────────────
  getHero: () => request('/api/hero'),
  updateHero: (data: unknown) =>
    request('/api/hero', { method: 'PUT', body: JSON.stringify(data) }),

  // ── About ─────────────────────────────────────────────────────────────────
  getAbout: () => request('/api/about'),
  updateAbout: (data: unknown) =>
    request('/api/about', { method: 'PUT', body: JSON.stringify(data) }),

  // ── Experiences ───────────────────────────────────────────────────────────
  getExperiences: () => request('/api/experiences'),
  createExperience: (data: unknown) =>
    request('/api/experiences', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id: number, data: unknown) =>
    request(`/api/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id: number) =>
    request(`/api/experiences/${id}`, { method: 'DELETE' }),

  // ── Skills ────────────────────────────────────────────────────────────────
  getSkills: () => request('/api/skills'),
  createSkill: (data: unknown) =>
    request('/api/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id: number, data: unknown) =>
    request(`/api/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id: number) =>
    request(`/api/skills/${id}`, { method: 'DELETE' }),

  // ── Portfolio ─────────────────────────────────────────────────────────────
  getPortfolio: () => request('/api/portfolio'),
  createPortfolioItem: (data: unknown) =>
    request('/api/portfolio', { method: 'POST', body: JSON.stringify(data) }),
  updatePortfolioItem: (id: number, data: unknown) =>
    request(`/api/portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePortfolioItem: (id: number) =>
    request(`/api/portfolio/${id}`, { method: 'DELETE' }),

  // ── Testimonials ──────────────────────────────────────────────────────────
  getTestimonials: () => request('/api/testimonials'),
  createTestimonial: (data: unknown) =>
    request('/api/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: number, data: unknown) =>
    request(`/api/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: number) =>
    request(`/api/testimonials/${id}`, { method: 'DELETE' }),

  // ── Contact Info ──────────────────────────────────────────────────────────
  getContactInfo: () => request('/api/contact-info'),
  updateContactInfo: (data: unknown) =>
    request('/api/contact-info', { method: 'PUT', body: JSON.stringify(data) }),

  // ── Contact Messages ──────────────────────────────────────────────────────
  sendMessage: (data: unknown) =>
    request('/api/contact', { method: 'POST', body: JSON.stringify(data) }),
  getMessages: () => request('/api/messages'),
  markMessageRead: (id: number) =>
    request(`/api/messages/${id}/read`, { method: 'PUT' }),
  deleteMessage: (id: number) =>
    request(`/api/messages/${id}`, { method: 'DELETE' }),

  // ── File Upload ───────────────────────────────────────────────────────────
  uploadFile: (file: File) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then((r) => r.json()) as Promise<{ url: string; filename: string }>;
  },
};
