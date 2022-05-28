import { useProvider, useContractWrite } from "wagmi";
import useAccounts from "./useAccounts";
import ERC20_ABI from "../constants/ERC20.json";
import Address from "../constants/Address.json";

const useApprove = (spender, amount) => {
  const { address: userAddress } = useAccounts();
  const provider = useProvider();
  // const signer = provider.getSigner(userAddress);

  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.contracts.dai.address,
      contractInterface: ERC20_ABI,
      // signerOrProvider: signer,
    },
    "approve",
    {
      args: [spender, amount],
    }
  );

  return { data, isError, isLoading, write };
};

export default useApprove;
