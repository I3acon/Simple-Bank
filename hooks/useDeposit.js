import { useContractWrite } from "wagmi";
import Bank_ABI from "../constants/Bank.json";
import Address from "../constants/Address.json";

const useDeposit = (amount) => {
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.contracts.bank.address,
      contractInterface: Bank_ABI,
    },
    "deposit",
    {
      args: [amount],
    }
  );

  return { data, isError, isLoading, write };
};

export default useDeposit;
