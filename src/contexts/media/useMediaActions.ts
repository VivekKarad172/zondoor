
import { MediaContextActions, MediaContextInternalState } from "./types";
import { createMediaItemActions } from "./actions/mediaItemActions";
import { createSelectionActions } from "./actions/selectionActions";
import { createFolderActions } from "./actions/folderActions";

export const useMediaActions = (state: MediaContextInternalState): MediaContextActions => {
  const mediaItemActions = createMediaItemActions(state);
  const selectionActions = createSelectionActions(state);
  const folderActions = createFolderActions(state);

  return {
    ...mediaItemActions,
    ...selectionActions,
    ...folderActions,
    setSearchQuery: state.setSearchQuery
  };
};
