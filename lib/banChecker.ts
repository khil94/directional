import { BAN_REGEX } from "@/constants/ban";

export function BanWordChecker(target: string) {
  return BAN_REGEX.test(target);
}
