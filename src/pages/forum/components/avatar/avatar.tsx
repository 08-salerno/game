import React, { VFC } from 'react';
import FakeAvatar from '../styled/FakeAvatar';
import Image from '../styled/Image';
import { apiUrl } from '../../../../modules/api/utils';

export type AvatarProps = {
    url: string | null
}

const Avatar: VFC<AvatarProps> = (props) => {
  const { url } = props;

  return (
    <FakeAvatar>
            {url && (<Image src={apiUrl(`/resources${url}`)} alt="avatar" />)}
    </FakeAvatar>
  );
};

export default Avatar;
