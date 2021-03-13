import React from 'react';

export const DEFAULT_ROOM_ID = 'YXTaOO4XSMpzcW1OieIx'

export const SelectedRoomContext = React.createContext([DEFAULT_ROOM_ID, [], () => {}]);
