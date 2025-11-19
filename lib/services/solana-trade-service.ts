import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID, 
  getAssociatedTokenAddress, 
  createAssociatedTokenAccountInstruction, 
  createTransferCheckedInstruction 
} from '@solana/spl-token';

const NATIVE_TOKEN_MINT = 'EMyXs726t4oUL7yCH9kkXCpWp3SdpWRopuewaVYhpump';
const TREASURY_WALLET = '7p23oxC288Vt5oiEyoFn11hed8K8pWAFytbse4TjtpeD';

export class SolanaTradeService {
  private connection: Connection;
  
  constructor(rpcEndpoint: string) {
    this.connection = new Connection(rpcEndpoint, 'confirmed');
  }

  async buyAsset(
    walletPublicKey: PublicKey,
    signTransaction: (tx: Transaction) => Promise<Transaction>,
    vantAmount: number // Amount of $VANT tokens to spend
  ): Promise<{ signature: string; success: boolean; error?: string }> {
    try {
      const mintPublicKey = new PublicKey(NATIVE_TOKEN_MINT);
      const treasuryPublicKey = new PublicKey(TREASURY_WALLET);
      
      const mintInfo = await this.connection.getParsedAccountInfo(mintPublicKey);
      // @ts-ignore - safely accessing parsed data
      const decimals = mintInfo.value?.data?.parsed?.info?.decimals ?? 6;

      // Get associated token accounts
      const buyerTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        walletPublicKey
      );
      
      const treasuryTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        treasuryPublicKey
      );

      const transaction = new Transaction();

      const treasuryAccountInfo = await this.connection.getAccountInfo(treasuryTokenAccount);
      if (!treasuryAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            walletPublicKey, // Payer (user pays the tiny rent to ensure tx succeeds)
            treasuryTokenAccount,
            treasuryPublicKey,
            mintPublicKey
          )
        );
      }

      // This validates the mint and decimals, reducing "blind signing" warnings
      const amountInBaseUnits = BigInt(Math.floor(vantAmount * Math.pow(10, decimals)));
      
      console.log('[v0] Constructing REAL on-chain transfer of', vantAmount, '$VANT to treasury');

      transaction.add(
        createTransferCheckedInstruction(
          buyerTokenAccount,
          mintPublicKey,
          treasuryTokenAccount,
          walletPublicKey,
          amountInBaseUnits,
          decimals
        )
      );
      
      // Get recent blockhash
      const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = walletPublicKey;
      
      // Sign and send transaction
      const signedTransaction = await signTransaction(transaction);
      
      const signature = await this.connection.sendRawTransaction(
        signedTransaction.serialize(),
        { skipPreflight: false, preflightCommitment: 'confirmed' }
      );
      
      // Confirm transaction
      const confirmation = await this.connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

      if (confirmation.value.err) {
        throw new Error('Transaction failed to confirm');
      }
      
      return { signature, success: true };
    } catch (error) {
      console.error('[v0] Buy asset error:', error);
      return { 
        signature: '', 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async sellAsset(
    walletPublicKey: PublicKey,
    signTransaction: (tx: Transaction) => Promise<Transaction>,
    vantAmount: number // Amount of $VANT tokens to receive
  ): Promise<{ signature: string; success: boolean; error?: string }> {
    try {
      // For now, this is a placeholder
      // In a real implementation, you'd need treasury to sign and send $VANT back
      // Or use an escrow/smart contract system
      
      return { 
        signature: '', 
        success: false, 
        error: 'Sell functionality requires backend treasury signature' 
      };
    } catch (error) {
      console.error('[v0] Sell asset error:', error);
      return { 
        signature: '', 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getVantBalance(walletPublicKey: PublicKey): Promise<number> {
    try {
      const mintPublicKey = new PublicKey(NATIVE_TOKEN_MINT);
      const tokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        walletPublicKey
      );
      
      try {
        const balance = await this.connection.getTokenAccountBalance(tokenAccount);
        return parseFloat(balance.value.uiAmount?.toString() || '0');
      } catch (e: any) {
        // If account not found, it means balance is 0
        if (e.message?.includes("could not find account") || e.toString().includes("could not find account")) {
          return 0;
        }
        throw e;
      }
    } catch (error) {
      console.error('[v0] Get VANT balance error:', error);
      return 0;
    }
  }
}
