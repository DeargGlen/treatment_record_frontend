export const individualsIndex = `/individuals.json`;
export const individualShow = (individualId: string) =>
  `/individuals/${individualId}.json`;
export const individualCreate = `/individuals`;
export const treatmentsIndex = `/treatments.json`;
export const treatmentCreate = `/treatments`;
export const signUpUrl = `/auth`;
export const signInUrl = `/auth/sign_in`;
export const signOutUrl = `/auth/sign_out`;
export const getCurrentUserUrl = `/auth/sessions`;
