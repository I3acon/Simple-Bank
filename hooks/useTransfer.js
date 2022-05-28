import { useContractWrite } from "wagmi";
import Bank_ABI from "../constants/Bank.json";
import Address from "../constants/Address.json";

const useTransfer = (to, amount) => {
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.contracts.bank.address,
      contractInterface: Bank_ABI,
    },
    "transfer",
    {
      args: [to, amount],
    }
  );

  return { data, isError, isLoading, write };
};

export default useTransfer;
