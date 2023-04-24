import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { utils } from "robonomics-interface";

export const isValidAddress = (address) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
};

export const findIdTwins = async (robonomics, address) => {
  const ids = [];
  const total = await robonomics.twin.getTotal();
  for (let id = 0; id < total; id++) {
    const owner = await robonomics.twin.getOwner(id);
    if (owner === address) {
      ids.push(id);
    }
  }
  return ids;
};

export const findVideoCid = async (robonomics, id) => {
  try {
    const twin = await robonomics.twin.getTwin(id);
    if (twin) {
      const hexVideo = Object.keys(twin).find(
        (key) =>
          twin[key] === "4CC7GkKuJJzFzswqz39m5qWbgXaQks9f36jCgsadpN2c1hnh"
      );
      if (hexVideo) {
        return utils.hexToCid(hexVideo);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return;
};
