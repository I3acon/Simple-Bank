import {
  Card,
  Text,
  Input,
  Button,
  Spacer,
  Grid,
  Loading,
} from "@nextui-org/react";

import Head from "next/head";
import Navbar from "../components/Navbar";
import useAccounts from "../hooks/useAccounts";
import { ethers } from "ethers";
import useDaiBalance from "../hooks/useDaiBalance";
import useTVD from "../hooks/useTVD";
import useBalance from "../hooks/useBalance";
import useApprove from "../hooks/useApprove";
import useDeposit from "../hooks/useDeposit";
import Address from "../constants/Address.json";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { address } = useAccounts();
  const { DAIBalance } = useDaiBalance();
  const { TVD } = useTVD();
  const { Balance } = useBalance();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(DAIBalance);

  const { data: approve, write: sendApprove } = useApprove(
    Address.contracts.bank.address,
    amount == 0
      ? ethers.utils.parseEther("1")
      : ethers.utils.parseEther(amount.toString())
  );

  const { data: deposit, write: sendDeposit } = useDeposit(
    amount == 0
      ? ethers.utils.parseEther("1")
      : ethers.utils.parseEther(amount.toString())
  );
  const handleApprove = async () => {
    setLoading(true);
    sendApprove();
  };

  useEffect(() => {
    approve?.wait().then((resp) => {
      sendDeposit();
    });
  }, [approve]);

  useEffect(() => {
    deposit?.wait().then((resp) => {
      toast.success("Deposit Successful");
      setLoading(false);
      setAmount(0);
    });
  }, [deposit]);
  return (
    <>
      <Head>
        <title>Simple Bank</title>
      </Head>
      <Navbar />
      <Spacer y={0.5} />
      <Grid.Container gap={2}>
        <Grid xs={12} justify="center">
          <Card bordered shadow css={{ mw: "450px" }}>
            <Text h3>Deposit</Text>
            <Spacer y={0.5} />
            <Input
              label={`Wallet Balance: ${parseFloat(DAIBalance / 1e18).toFixed(
                2
              )} DAI`}
              type="number"
              bordered
              placeholder="0.00"
              value={amount == 0 ? "" : amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Spacer y={0.5} />
            <Button
              shadow
              color="primary"
              auto
              onClick={handleApprove}
              disabled={loading}
            >
              {loading ? (
                <Loading type="points" color={"primary"} />
              ) : (
                "Deposit"
              )}
            </Button>
            <Spacer y={0.1} />
            <Card.Footer>Address : {address}</Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} justify="center">
          <Text h3>
            Bank balance : {parseFloat(Balance / 1e18).toFixed(2)} DAI
            <br />
            Bank Total Value Deposit : {parseFloat(TVD / 1e18).toFixed(2)} DAI
          </Text>
        </Grid>
      </Grid.Container>
      <ToastContainer />
    </>
  );
}