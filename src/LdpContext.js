import React, { useContext } from 'react';

export const LdpContext = React.createContext();

export const useLdp = () => useContext(LdpContext);
