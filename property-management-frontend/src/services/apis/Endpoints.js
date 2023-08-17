const baseApi = process.env.REACT_APP_LOCALHOST_BASE_API;

const mockBaseApi = process.env.REACT_APP_MOCK_BASE_API;

const ownerApi = `${mockBaseApi}/owners`;

export const propertiesApi = `${baseApi}/property`;

export const ownerPropertiesApi = `${baseApi}/owner/property`;

export const mockPropertiesApi = `${mockBaseApi}/properties`;

export const loginApi = `${baseApi}/login`;

export const signupApi = `${baseApi}/login/signup`;

export const usersApi = `${baseApi}/users`;

export const adminApi = `${baseApi}/admin`;

export const getOwners = ownerApi;

export const getProperties = propertiesApi;

export const userDetailApi = `${baseApi}/users/userDetails`;

export const customerApplicationApi = `${baseApi}/application`;

export const customerFavoriteApi = `${baseApi}/favorite`;

export const getPropertiesOffers = `${baseApi}/owner/application`;

export const updatePropertyApplicationStatus = (offerId, action) =>
  `${baseApi}/application/${offerId}?action=${action}`;

export const deletePropertyById = (propertyId) =>
  `${propertiesApi}/${propertyId}`;

export const getPropertyById = (propertyId) => `${propertiesApi}/${propertyId}`;

export const updatePropertyStatusApi = (propertyId, action) =>
  `${propertiesApi}/${propertyId}?action=${action}`;

export const changeToContingentApi = (propertyId) =>
  `${propertiesApi}/${propertyId}/contingent`;

export const adminDashboardApi = `${baseApi}/dashboard/admin`;

export const ownerDashboardApi = `${baseApi}/dashboard/owner`;

export const uploadPropertyImageApi = `${propertiesApi}/propertyFile`;
export const passwordResetLink = (username) =>
  `${baseApi}/login/forgotPassword?userName=${username}`;

export const resetPassword = (token) =>
  `${baseApi}/login/resetPassword/${token}`;

export const revokeContingentApi = (propertyId) =>
  `${propertiesApi}/${propertyId}/cancelContingent`;
