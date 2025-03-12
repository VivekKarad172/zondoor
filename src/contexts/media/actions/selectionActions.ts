
import { MediaContextInternalState } from "../types";

export const createSelectionActions = (state: MediaContextInternalState) => {
  const { setSelectedFolder, setSelectedItems } = state;

  const selectFolder = (folderId: string | null) => {
    setSelectedFolder(folderId);
    setSelectedItems([]);
  };

  const selectItem = (id: string) => {
    setSelectedItems((prev) => prev.includes(id) ? prev : [...prev, id]);
  };

  const deselectItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return { selectFolder, selectItem, deselectItem, clearSelection };
};
