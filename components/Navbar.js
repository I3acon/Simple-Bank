import {
  Card,
  Text,
  Input,
  Button,
  Spacer,
  Grid,
  Container,
  Divider,
  Row,
} from "@nextui-org/react";
import { BsBank2 } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={8}>
          <Link href="/">
            <Text h3 style={{ cursor: "pointer" }}>
              <BsBank2 style={{ marginRight: 10, marginLeft: 10 }} size={30} />
              Simple Bank
            </Text>
          </Link>
          <Link href="transfer">
            <Text
              h3
              style={{ marginLeft: 25, marginTop: 2, cursor: "pointer" }}
            >
              Transfer
            </Text>
          </Link>
          <Link href="withdraw">
            <Text
              h3
              style={{ marginLeft: 25, marginTop: 2, cursor: "pointer" }}
            >
              Withdraw
            </Text>
          </Link>
        </Grid>
        <Grid xs={4} justify="flex-end">
          <ConnectButton />
        </Grid>
      </Grid.Container>
    </>
  );
};
export default Navbar;
