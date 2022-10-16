import { Decode } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decode {
  decode (value: string): string {
    const decoded: any = jwt.decode(value, { complete: true })
    return decoded
  }
}
