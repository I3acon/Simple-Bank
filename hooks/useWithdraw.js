import { useContractWrite } from "wagmi";
import Bank_ABI from "../constants/Bank.json";
import Address from "../constants/Address.json";

const useWithdraw = (amount) => {
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.contracts.bank.address,
      contractInterface: Bank_ABI,
    },
    "withdraw",
    {
      args: [amount],
    }
  );

  return { data, isError, isLoading, write };
};

export default useWithdraw;
