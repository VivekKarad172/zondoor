
import React, { createContext, useContext } from "react";
import { MediaContextType } from "./types";
import { useMediaState } from "./useMediaState";
import { useMediaActions } from "./useMediaActions";

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useMediaState();
  const actions = useMediaActions(state);
  
  const contextValue: MediaContextType = {
    ...state,
    ...actions
  };

  return (
    <MediaContext.Provider value={contextValue}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
