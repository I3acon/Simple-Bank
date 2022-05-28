import { useContractRead } from "wagmi";
import Address from "../constants/Address.json";
import useAccounts from "./useAccounts";
import Bank_ABI from "../constants/Bank.json";

const useBalance = () => {
  const { address: userAddress } = useAccounts();
  const {
    data: Balance,
    isError,
    isLoading,
  } = useContractRead(
    {
      addressOrName: Address.contracts.bank.address,
      contractInterface: Bank_ABI,
    },
    "returnBalance",
    {
      args: userAddress,
    }
  );

  return { Balance, isError, isLoading };
};

export default useBalance;
