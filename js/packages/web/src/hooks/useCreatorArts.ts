import { useMeta } from '../contexts';
import { StringPublicKey } from '@oyster/common';
import { themd } from './../contexts/meta/metadata.json';

export const useCreatorArts = (id?: StringPublicKey) => {
  const metadata = JSON.parse(JSON.stringify(themd))   

  const filtered = metadata.filter(m =>
    m.info.data.creators?.some(c => c.address === id),
  );

  return filtered;
};
