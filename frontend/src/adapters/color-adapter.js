import { fetchHandler } from '../utils/fetchingUtils';

export async function getColorName(hex) {
  return await fetchHandler(`https://www.thecolorapi.com/id?hex=${hex}`);
}
