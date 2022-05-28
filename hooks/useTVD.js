import { useContractRead } from "wagmi";
import Bank_ABI from "../constants/Bank.json";
import Address from "../constants/Address.json";

const useTVD = () => {
  const {
    data: TVD,
    isError,
    isLoading,
  } = useContractRead(
    {
      addressOrName: Address.contracts.bank.address,
      contractInterface: Bank_ABI,
    },
    "returnTVD"
  );

  return { TVD, isError, isLoading };
};

export default useTVD;
