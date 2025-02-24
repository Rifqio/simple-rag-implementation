import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';

const { PINECONE_API_KEY, PINECONE_INDEX } = process.env;
export async function GetDataStore(): Promise<PineconeStore> {
    const embeddings = new HuggingFaceTransformersEmbeddings({
        model: 'Xenova/all-MiniLM-L6-v2',
    });

    const pinecone = new PineconeClient({
        apiKey: PINECONE_API_KEY as string,
    });

    const pineconeIndex = pinecone.Index(PINECONE_INDEX as string);
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: pineconeIndex,
        namespace: 'ns1',
    });

    return vectorStore;
}
