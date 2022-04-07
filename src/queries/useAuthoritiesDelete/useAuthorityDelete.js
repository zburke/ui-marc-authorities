import { useMutation } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';


const useAuthorityDeleteMutation = ({ onError, onSuccess, ...restOptions }) => {
  const ky = useOkapiKy();

  const customOptions = {
    onError: () => {
      return onError();
    },

    onSuccess: () => {
      return onSuccess();
    },
  };

  const { mutateAsync } = useMutation(
    (id) => ky.delete(`records-editors/records/${id}`),
    { ...customOptions, ...restOptions },
  );

  return {
    deleteItem: mutateAsync,
  };
};

export default useAuthorityDeleteMutation;
