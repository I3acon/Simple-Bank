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
import useBalance from "../hooks/useBalance";
import useTransfer from "../hooks/useTransfer";
import useTVD from "../hooks/useTVD";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";

export default function App() {
  const { address } = useAccounts();
  const { Balance } = useBalance();
  const { TVD } = useTVD();
  const [to, setTo] = useState("0x0");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: transfer, write: sendTransfer } = useTransfer(
    to,
    amount == 0
      ? ethers.utils.parseEther("1")
      : ethers.utils.parseEther(amount.toString())
  );

  const handleTransfer = async () => {
    setLoading(true);
    sendTransfer();
  };

  const handleChangeTransferAmount = (e) => {
    setAmount(e.target.value);
    if (parseFloat(e.target.value) > parseFloat(Balance / 1e18)) {
      toast.error("You don't have enough Bank Balance");
      setAmount("0");
    }
  };

  const handleSetMax = () => {
    setAmount(Balance / 1e18);
  };

  const isValidAddress = (adr) => {
    try {
      const web3 = new Web3();
      web3.utils.toChecksumAddress(adr);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChangeTo = (e) => {
    setTo(e.target.value);
    if (!isValidAddress(e.target.value)) {
      toast.error("Invalid address");
      setTo("0x0");
    }
  };

  useEffect(() => {
    transfer?.wait().then((resp) => {
      toast.success("Transfer Successful");
      setLoading(false);
      setTo("0x0");
      setAmount(0);
    });
  }, [transfer]);
  return (
    <>
      <Head>
        <title>Simple Bank</title>
      </Head>
      <Navbar />
      <Grid.Container gap={2}>
        <Grid xs={12} justify="center">
          <Card bordered shadow css={{ mw: "450px" }}>
            <Text h3>Transfer</Text>
            <Input
              label="To"
              bordered
              placeholder="0x0"
              value={to == "0x0" ? "" : to}
              onChange={handleChangeTo}
            />
            <Spacer y={0.5} />
            <Input
              label={`Bank Balance: ${parseFloat(Balance / 1e18).toFixed(
                2
              )} DAI`}
              type="number"
              bordered
              placeholder="0.00"
              value={amount == 0 ? "" : amount}
              contentRightStyling={false}
              contentRight={
                <Button
                  flat
                  color="primary"
                  size="xs"
                  auto
                  rounded
                  onClick={handleSetMax}
                >
                  Max
                </Button>
              }
              min={0}
              onChange={handleChangeTransferAmount}
            />
            <Spacer y={0.5} />
            <Button
              shadow
              color="primary"
              auto
              onClick={handleTransfer}
              disabled={loading}
            >
              {loading ? (
                <Loading type="points" color={"primary"} />
              ) : (
                "Transfer"
              )}
            </Button>
            <Spacer y={0.1} />
            <Card.Footer>Address : {address}</Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} justify="center">
          <Text h3>
            Bank Total Value Deposit : {parseFloat(TVD / 1e18).toFixed(2)} DAI
          </Text>
        </Grid>
      </Grid.Container>
      <ToastContainer />
    </>
  );
}
