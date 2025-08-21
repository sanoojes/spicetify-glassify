import appStore from '@app/store/appStore.ts';

function resetTheme() {
  appStore.getState().resetStore();
  location.reload();
}

export default resetTheme;
