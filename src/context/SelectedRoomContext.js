import React from 'react';

export const DEFAULT_ROOMS = 'room1'

export const SelectedRoomContext = React.createContext([DEFAULT_ROOMS, [], () => {}]);
