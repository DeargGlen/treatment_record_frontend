export const individualsIndex = `/individuals.json`;
export const individualShow = (individualId: string) =>
  `/individuals/${individualId}.json`;
export const individualCreate = `/individuals`;
export const treatmentsIndex = `/treatments.json`;
export const treatmentCreate = `/treatments`;
export const treatmentShow = (treatmentId: number) =>
  `/treatments/${treatmentId}.json`;
export const signUpUrl = `/auth`;
export const signInUrl = `/auth/sign_in`;
export const signOutUrl = `/auth/sign_out`;
export const getCurrentUserUrl = `/auth/sessions`;
export const areaIndex = `/areas.json`;
export const areaDestroy = (areaId: number) => `/areas/${areaId}`;
export const areaCreate = `/areas`;
export const barnShow = (barnId: number) => `/barns/${barnId}.json`;
export const barnCreate = `/barns`;
export const barnDestroy = (barnId: number) => `/barns/${barnId}`;
export const blockCreate = `/blocks`;
export const blockDestroy = (blockId: number) => `/blocks/${blockId}`;
export const treatCommentCreate = `/treat_comments`;
