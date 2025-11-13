export const BAN_LIST = ["캄보디아", "프놈펜", "불법체류", "텔레그램"] as const;

export const BAN_REGEX = new RegExp(BAN_LIST.join("|"), "g");
