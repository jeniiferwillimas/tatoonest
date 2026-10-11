const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export const urlHelper = {
  auth: {
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
    google: `${BASE_URL}/api/auth/google`,
    forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
    resetPassword: `${BASE_URL}/api/auth/reset-password`,
    logout: `${BASE_URL}/api/auth/logout`,
    me: `${BASE_URL}/api/auth/me`,
  },
  role: {
    roles: `${BASE_URL}/api/role/roles`,
    users: `${BASE_URL}/api/role/users`,
    updateRole: (userId: string) => `${BASE_URL}/api/role/users/${userId}/role`,
  },
  module: {
    authorized: `${BASE_URL}/api/module/authorized`,
    all: `${BASE_URL}/api/module`,
  },
  landing: {
    data: `${BASE_URL}/api/landing`,
  },
  styles: {
    all: `${BASE_URL}/api/styles`,
    bySlug: (slug: string) => `${BASE_URL}/api/styles/${slug}`,
  },
  artists: {
    list: `${BASE_URL}/api/artists`,
    bySlug: (slug: string) => `${BASE_URL}/api/artists/${slug}`,
  },
  artistProfile: {
    get: `${BASE_URL}/api/artist-profile`,
    create: `${BASE_URL}/api/artist-profile`,
    updateDetails: `${BASE_URL}/api/artist-profile/details`,
    updateStep: `${BASE_URL}/api/artist-profile/step`,
    uploadImage: `${BASE_URL}/api/artist-profile/images`,
    deleteImage: (id: number) => `${BASE_URL}/api/artist-profile/images/${id}`,
    submit: `${BASE_URL}/api/artist-profile/submit`,
  },
};

export default urlHelper;
