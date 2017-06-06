import { CURRENT_VIEW_SET } from 'core/constants';


export function setCurrentView({ addonType, isExploring, isHomePage }) {
  return {
    type: CURRENT_VIEW_SET,
    payload: { addonType, isExploring, isHomePage },
  };
}
