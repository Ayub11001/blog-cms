import { atomWithStorage } from "jotai/utils"

export const authAtom = atomWithStorage<boolean>("auth", false, undefined, {
  getOnInit: true,
})
