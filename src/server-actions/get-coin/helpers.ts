import { escape } from 'validator'

type Args = {
  coinId: string
}

export const sanitizeArgs = (args: Args) => {
  return {
    coinId: escape(args.coinId),
  }
}
