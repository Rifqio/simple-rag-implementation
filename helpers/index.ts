import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';

function getFolderType(path: string): string {
    return path.split('assets\\')[1]?.split('\\')[0];
}

export async function LoadDocument(): Promise<Document<Record<string, any>>[]> {
    const path = '../assets';
    const loader = new DirectoryLoader(path, {
        '.md': (path) => new TextLoader(path),
    });
    const docs = await loader.load();
    for (const doc of docs) {
        doc.metadata.type = getFolderType(doc.metadata.source);
    }
    return docs;
}

export async function SplitDocsToChunks(
    docs: Document<Record<string, any>>[]
): Promise<Document<Record<string, any>>[]> {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    return splitter.splitDocuments(docs);
}
