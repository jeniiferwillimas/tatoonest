const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export const urlHelper = {
  auth: {
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
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
  bookings: {
    list: `${BASE_URL}/api/bookings`,
    artistBookings: `${BASE_URL}/api/bookings/artist`,
    create: `${BASE_URL}/api/bookings`,
    updateStatus: (id: number) => `${BASE_URL}/api/bookings/${id}/status`,
  },
  messages: {
    conversations: `${BASE_URL}/api/messages/conversations`,
    conversation: (id: number) => `${BASE_URL}/api/messages/conversations/${id}`,
    send: (id: number) => `${BASE_URL}/api/messages/conversations/${id}`,
    startConversation: `${BASE_URL}/api/messages/conversations`,
  },
  reviews: {
    artistReviews: (artistId: number) => `${BASE_URL}/api/reviews/artist/${artistId}`,
    myReviews: `${BASE_URL}/api/reviews/my`,
    received: `${BASE_URL}/api/reviews/received`,
    create: `${BASE_URL}/api/reviews`,
    reply: (id: number) => `${BASE_URL}/api/reviews/${id}/reply`,
  },
  saved: {
    list: `${BASE_URL}/api/saved`,
    boards: `${BASE_URL}/api/saved/boards`,
    save: `${BASE_URL}/api/saved`,
    remove: (id: number) => `${BASE_URL}/api/saved/${id}`,
  },
  adminArtists: {
    list: `${BASE_URL}/api/admin/artists`,
    get: (id: number) => `${BASE_URL}/api/admin/artists/${id}`,
    create: `${BASE_URL}/api/admin/artists`,
    update: (id: number) => `${BASE_URL}/api/admin/artists/${id}`,
    delete: (id: number) => `${BASE_URL}/api/admin/artists/${id}`,
    uploadImage: (id: number) => `${BASE_URL}/api/admin/artists/${id}/images`,
    uploadProfileImage: (id: number) => `${BASE_URL}/api/admin/artists/${id}/profile-image`,
    deleteImage: (id: number, imageId: number) => `${BASE_URL}/api/admin/artists/${id}/images/${imageId}`,
  },
  adminMessages: {
    conversations: `${BASE_URL}/api/admin/messages/conversations`,
    conversation: (id: number) => `${BASE_URL}/api/admin/messages/conversations/${id}`,
    deleteConversation: (id: number) => `${BASE_URL}/api/admin/messages/conversations/${id}`,
  },
  payments: {
    walletConfig: `${BASE_URL}/api/payments/wallet-config`,
    cryptoCheckout: `${BASE_URL}/api/payments/crypto/checkout`,
    cardRampUrl: `${BASE_URL}/api/payments/card-ramp-url`,
    bookingCheckout: `${BASE_URL}/api/payments/booking/checkout`,
    bookingStatus: (id: number) => `${BASE_URL}/api/payments/booking/${id}/status`,
    subscriptionStatus: `${BASE_URL}/api/payments/subscription/status`,
    confirm: `${BASE_URL}/api/payments/confirm`,
    plans: `${BASE_URL}/api/payments/plans`,
  },
};

export function imgSrc(url: string) {
  if (!url) return "";
  if (url.startsWith("/uploads/")) return `${BASE_URL}${url}`;
  return url;
}

export default urlHelper;
