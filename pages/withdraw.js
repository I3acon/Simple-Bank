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
import useTVD from "../hooks/useTVD";
import useWithdraw from "../hooks/useWithdraw";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { address } = useAccounts();
  const { Balance } = useBalance();
  const { TVD } = useTVD();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: withdraw, write: sendWithdraw } = useWithdraw(
    amount == 0
      ? ethers.utils.parseEther("1")
      : ethers.utils.parseEther(amount.toString())
  );

  const handleWithdraw = async () => {
    setLoading(true);
    sendWithdraw();
  };

  const handleChangeWithdrawAmount = (e) => {
    setAmount(e.target.value);
    if (parseFloat(e.target.value) > parseFloat(Balance / 1e18)) {
      toast.error("You don't have enough Bank Balance");
      setAmount("0");
    }
  };

  const handleSetMax = () => {
    setAmount(Balance / 1e18);
  };

  useEffect(() => {
    withdraw?.wait().then((resp) => {
      toast.success("Withdraw Successful");
      setLoading(false);
      setAmount(0);
    });
  }, [withdraw]);

  return (
    <>
      <Head>
        <title>Simple Bank</title>
      </Head>
      <Navbar />
      <Grid.Container gap={2}>
        <Grid xs={12} justify="center">
          <Card bordered shadow css={{ mw: "450px" }}>
            <Text h3>Withdraw</Text>
            <Spacer y={0.5} />
            <Input
              label={`Bank Balance: ${parseFloat(Balance / 1e18).toFixed(
                2
              )} DAI`}
              type="number"
              bordered
              placeholder="0.00"
              value={amount == 0 ? "" : amount}
              min={0}
              onChange={handleChangeWithdrawAmount}
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
            />
            <Spacer y={0.5} />
            <Button
              shadow
              color="primary"
              auto
              onClick={handleWithdraw}
              disabled={loading}
            >
              {loading ? (
                <Loading type="points" color={"primary"} />
              ) : (
                "Withdraw"
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
