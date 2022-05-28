import { useContractRead } from "wagmi";
import Address from "../constants/Address.json";
import useAccounts from "./useAccounts";
import ERC20_ABI from "../constants/ERC20.json";

const useDaiBalance = () => {
  const { address: userAddress } = useAccounts();
  const {
    data: DAIBalance,
    isError,
    isLoading,
  } = useContractRead(
    {
      addressOrName: Address.contracts.dai.address,
      contractInterface: ERC20_ABI,
    },
    "balanceOf",
    {
      args: userAddress,
    }
  );

  return { DAIBalance, isError, isLoading };
};

export default useDaiBalance;
