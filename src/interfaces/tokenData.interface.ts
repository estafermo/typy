interface TokenData {
    token: string;
    expiresIn: number;
  }

  interface DataStoredInToken {
    _id: string;
  }

export default TokenData;