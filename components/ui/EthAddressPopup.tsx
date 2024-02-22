import { Addreth, AddrethConfig } from "addreth";

export function EthAddressPopup({ address }: { address: string }) {
  return (
    <AddrethConfig>
      <Addreth
        ens={false}
        // @ts-ignore: It's already 0x-prefixed
        address={`${address}`}
      />
    </AddrethConfig>
  );
}
