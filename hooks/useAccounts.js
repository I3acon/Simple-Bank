import { useAccount } from "wagmi";

const useAccounts = () => {
  const { data } = useAccount();
  const address = data?.address;

  return { address, data };
};

export default useAccounts;
