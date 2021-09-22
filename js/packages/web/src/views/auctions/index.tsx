import { Layout, Button } from 'antd';
import React, { useCallback }  from 'react';
import { useConnection, useWalletModal } from '@oyster/common';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { Link } from 'react-router-dom';

import { Provider, Program, web3 } from '@project-serum/anchor';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { MintLayout, Token } from '@solana/spl-token';

const CANDY_MACHINE = 'candy_machine';

const programId = new web3.PublicKey(
  'cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ',
);
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
const TOKEN_PROGRAM_ID = new web3.PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);
const getTokenWallet = async function (wallet: web3.PublicKey, mint: web3.PublicKey) {
  return (
    await web3.PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0];
};

export function createAssociatedTokenAccountInstruction(
  associatedTokenAddress: web3.PublicKey,
  payer: web3.PublicKey,
  walletAddress: web3.PublicKey,
  splTokenMintAddress: web3.PublicKey,
) {
  const keys = [
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: associatedTokenAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: walletAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: splTokenMintAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new web3.TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
  });
}

const getCandyMachine = async (config: web3.PublicKey, uuid: string) => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(CANDY_MACHINE), config.toBuffer(), Buffer.from(uuid)],
    programId,
  );
};

const getMetadata = async (
  mint: web3.PublicKey,
): Promise<web3.PublicKey> => {
  return (
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

const getMasterEdition = async (
  mint: web3.PublicKey,
): Promise<web3.PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('edition'),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

export const AuctionsView = () => {
  const wallet = useWallet();
  const connection = useConnection();

  const { setVisible } = useWalletModal();
  const connect = useCallback(
    () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
    [wallet.wallet, wallet.connect, setVisible],
  );

  // This is from the .cache directory after uploading, copy yours here without "items"
  const cachedContent = {"items":{"0":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"1":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"2":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"3":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"4":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"5":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"6":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"7":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"8":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"9":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"10":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"11":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"12":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"13":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"14":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"15":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"16":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"17":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"18":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"19":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"20":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"21":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"22":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"23":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"24":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"25":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"26":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"27":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"28":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"29":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"30":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"31":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"32":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"33":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"34":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"35":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"36":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"37":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"38":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"39":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"40":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"41":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"42":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"43":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"44":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"45":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"46":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"47":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"48":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"49":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"50":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"51":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"52":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"53":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"54":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"55":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"56":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"57":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"58":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"59":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"60":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"61":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"62":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"63":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"64":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"65":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"66":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"67":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"68":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"69":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"70":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"71":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"72":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"73":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"74":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"75":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"76":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"77":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"78":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"79":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"80":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"81":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"82":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"83":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"84":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"85":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"86":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"87":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"88":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"89":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"90":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"91":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"92":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"93":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"94":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"95":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"96":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"97":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"98":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"99":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"100":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"101":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"102":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"103":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"104":{"onChain":true,"link":"https://arweave.net/4T8BG17y2WxPYMilguQllBA8kUW3g3rB12Y1u560gkQ","name":"Lotto 2.1 WINNERWINNER!"},"105":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"106":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"107":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"108":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"109":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"},"110":{"onChain":true,"link":"https://arweave.net/y9ytiJho5hcOXQanFFCg2Q5j5MI3wazlCpgovN9x640","name":"Lotto 2.1 1"}},"program":{"uuid":"2RsA4j","config":"2RsA4jYT1QSytrgvzgNZaYPEoLv3DrT8VAj4FAqpRhdU"}};
    const mint = async ({wallet, connection}: {wallet: WalletContextState, connection: Connection}) => {
    // Set price here to the same you specified when setting up candy mashine
    const price = 0.3;
    const lamports =  price * LAMPORTS_PER_SOL;

    const mint = web3.Keypair.generate();

    if (wallet && wallet.wallet && wallet.publicKey) {
      const token = await getTokenWallet(wallet.publicKey, mint.publicKey);
      const provider = new Provider(connection, {
        ...wallet.wallet,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
        publicKey: wallet.publicKey
      }, {
        preflightCommitment: 'recent',
      });
      const idl = await Program.fetchIdl(programId, provider);
      const anchorProgram = new Program(idl, programId, provider);
      const config = new web3.PublicKey(cachedContent.program.config);
      const [candyMachine, bump] = await getCandyMachine(
        config,
        cachedContent.program.uuid,
      );

      const candy = await anchorProgram.account.candyMachine.fetch(candyMachine);

      if ((candy as any)?.itemsRedeemed?.toNumber() - (candy as any)?.data?.itemsAvailable?.toNumber() === 0) {
        alert('All NFTs have been sold');
      }

      const metadata = await getMetadata(mint.publicKey);
      const masterEdition = await getMasterEdition(mint.publicKey);
      
const bh = 
                                              await (connection.getRecentBlockhash() )
                

    const tx = await anchorProgram.rpc.mintNft({
    recentBlockhash: bh.blockhash,
    feePayer:wallet.publicKey,
        accounts: {
          config: config,
          candyMachine: candyMachine,
          payer: wallet.publicKey,
          //@ts-ignore
          wallet: candy.wallet,
          mint: mint.publicKey,
          metadata,
          masterEdition,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent:SYSVAR_RENT_PUBKEY,
          clock:SYSVAR_CLOCK_PUBKEY,
        },
        signers: [mint],
        instructions: [
          web3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mint.publicKey,
            space: MintLayout.span,
            lamports: await provider.connection.getMinimumBalanceForRentExemption(
              MintLayout.span,
            ),
            programId: TOKEN_PROGRAM_ID,
          }),
          web3.SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new web3.PublicKey('6a4pXCwU3WHhWWJLSvYzECHoLeNFJirDwywUZVMSQvQz'),
            lamports,
          }),
          Token.createInitMintInstruction(
            TOKEN_PROGRAM_ID,
            mint.publicKey,
            0,
            wallet.publicKey,
            wallet.publicKey,
          ),
          createAssociatedTokenAccountInstruction(
            token,
            wallet.publicKey,
            wallet.publicKey,
            mint.publicKey,
          ),
          Token.createMintToInstruction(
            TOKEN_PROGRAM_ID,
            mint.publicKey,
            token,
            wallet.publicKey,
            [],
            1,
          ),
        ],
      });
    } 
  }

  return (
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      <Button type="primary" className="app-btn" onClick={ () => !wallet.connected  ? connect() : mint({wallet, connection})}>
        {!wallet.connected ? 'Connect' : 'Mint 1 for 0.3 $SOL. Be patient. Check details in link above @ "what is lotto v2.1??" :D!'} 
      </Button>{' '}
    
    </Layout>
  );
};
